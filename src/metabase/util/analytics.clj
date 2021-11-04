(ns metabase.util.analytics
  "Functions for sending Snowplow analytics events"
  (:require [clojure.tools.logging :as log]
            [metabase.models.setting :refer [defsetting]]
            [metabase.public-settings :as public-settings]
            [metabase.util.i18n :as i18n :refer [deferred-tru trs]])
  (:import [com.snowplowanalytics.snowplow.tracker Subject$SubjectBuilder Tracker Tracker$TrackerBuilder]
           [com.snowplowanalytics.snowplow.tracker.emitter BatchEmitter BatchEmitter$Builder2 Emitter]
           [com.snowplowanalytics.snowplow.tracker.events Unstructured Unstructured$Builder2]
           [com.snowplowanalytics.snowplow.tracker.http ApacheHttpClientAdapter ApacheHttpClientAdapter$Builder]
           com.snowplowanalytics.snowplow.tracker.payload.SelfDescribingJson
           org.apache.http.client.HttpClient
           [org.apache.http.impl.client CloseableHttpClient HttpClientBuilder HttpClients]
           org.apache.http.impl.conn.PoolingHttpClientConnectionManager))

(defsetting snowplow-url
  (deferred-tru "The URL of the Snowplow collector to send analytics events to")
  :default "http://localhost:9095";"https://sp.metabase.com"
  :visibility :public)

(def ^:private ^Emitter emitter
  "An instance of a Snowplow emitter"
  (delay
   (let [^PoolingHttpClientConnectionManager manager (new PoolingHttpClientConnectionManager)
         ^HttpClientBuilder client-builder (. ^HttpClients HttpClients custom)
         ^HttpClient client (-> client-builder
                                (.setConnectionManager manager)
                                (.build))
         ^ApacheHttpClientAdapter$Builder adapter-builder (-> (. ^ApacheHttpClientAdapter ApacheHttpClientAdapter builder)
                                                              (.httpClient ^CloseableHttpClient client)
                                                              (.url (snowplow-url)))
         ^ApacheHttpClientAdapter adapter (.build adapter-builder)
         ^BatchEmitter$Builder2 batch-emitter-builder (-> (. ^BatchEmitter BatchEmitter builder)
                                                          (.bufferSize 1)
                                                          (.httpClientAdapter adapter))]
     (.build batch-emitter-builder))))

(def ^:private ^Tracker tracker
  "An instance of a Snowplow tracker"
  (delay
   (-> (Tracker$TrackerBuilder. ^Emitter @emitter "sp" "metabase")
       (.build))))

(defn- subject
  "Create a Subject object for a given user ID, to be included in analytics events"
  [user-id]
  (-> (Subject$SubjectBuilder.)
      (.userId (str user-id))
      (.build)))

(defn- context
  "Common context included in every analytics event"
  []
  (new SelfDescribingJson
       "iglu:com.metabase/instance/jsonschema/1-0-0"
       {"id"             (public-settings/analytics-uuid),
        "version"        {"tag" (:tag (public-settings/version))},
        "token-features" (into {} (for [[token enabled?] (public-settings/token-features)]
                                    [(name token) enabled?]))}))

(defn- payload
  [schema version event-data]
  (new SelfDescribingJson
       (format "iglu:com.metabase/%s/jsonschema/%s" (name schema) version)
       ;; Make sure keywords are converted to strings
       (into {} (for [[k v] event-data] [(name k) (if (keyword? v) (name v) v)]))))

(defn- track-schema-event
  [schema version user-id event-data]
  (when (public-settings/anon-tracking-enabled)
    (try
      (let [^Unstructured$Builder2 builder (-> (. Unstructured builder)
                                               (.eventData (payload schema version event-data))
                                               (.customContext [(context)]))
            ^Unstructured$Builder2 builder' (if user-id
                                              (.subject builder (subject user-id))
                                              builder)
            ^Unstructured event (.build builder')]
        (.track ^Tracker @tracker event))
      (catch Throwable e
        (log/debug e (trs "Error sending Snowplow analytics event {0}" (name (:event event-data))))))))

;; Snowplow analytics interface

(defmulti track-event
  "Send a single analytics event to Snowplow"
  (fn [event & _] event))

(defmethod track-event :new_instance_created
  [_]
  (track-schema-event :account "1-0-0" nil {:event :new_instance_created}))

(defmethod track-event :invite_sent
  [_ user-id event-data]
  (track-schema-event :invite "1-0-0" user-id (assoc event-data :event :invite_sent)))
