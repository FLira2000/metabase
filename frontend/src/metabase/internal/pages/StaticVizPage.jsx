import React from "react";
import { Box } from "grid-styled";
import Heading from "metabase/components/type/Heading";
import Subhead from "metabase/components/type/Subhead";
import Text from "metabase/components/type/Text";
import StaticChart from "metabase/static-viz/containers/StaticChart";

export default function StaticVizPage() {
  return (
    <Box py={4}>
      <Box className="wrapper wrapper--trim">
        <Heading>Static Visualisations</Heading>
        <Text>
          These visualizations are used in dashboard subscriptions. They have no
          interactivity and get generated by the backend to be sent to Slack or
          in emails. You can use this playground to work on the source code in
          /static-viz/ and see the effects. You might need to hard refresh to
          see updates.
        </Text>
        <Box py={3}>
          <Subhead>Line chart with timeseries data</Subhead>
          <StaticChart
            type="timeseries/line"
            options={{
              data: [
                ["2020-01-10", 10],
                ["2020-06-10", 60],
                ["2020-12-10", 80],
              ],
              accessors: {
                x: row => new Date(row[0]).valueOf(),
                y: row => row[1],
              },
              labels: {
                left: "Count",
                bottom: "Created At",
              },
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Area chart with timeseries data</Subhead>
          <StaticChart
            type="timeseries/area"
            options={{
              data: [
                ["2020-01-10", 10],
                ["2020-06-10", 60],
                ["2020-12-10", 80],
              ],
              accessors: {
                x: row => new Date(row[0]).valueOf(),
                y: row => row[1],
              },
              settings: {
                x: {
                  date_style: "MMM",
                },
              },
              labels: {
                left: "Count",
                bottom: "Created At",
              },
              colors: {
                brand: "#88BF4D",
              },
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Bar chart with timeseries data</Subhead>
          <StaticChart
            type="timeseries/bar"
            options={{
              data: [
                ["2020-10-21", 20],
                ["2020-10-22", 30],
                ["2020-10-23", 25],
                ["2020-10-24", 10],
                ["2020-10-25", 15],
              ],
              accessors: {
                x: row => new Date(row[0]).valueOf(),
                y: row => row[1],
              },
              settings: {
                x: {
                  date_style: "MM/DD/YYYY",
                },
                y: {
                  number_style: "currency",
                  currency: "USD",
                  currency_style: "symbol",
                  decimals: 0,
                },
              },
              labels: {
                left: "Price",
                bottom: "Created At",
              },
            }}
          />
        </Box>

        <Box py={3}>
          <Subhead>Line chart with categorical data</Subhead>
          <StaticChart
            type="categorical/line"
            options={{
              data: [
                ["Alden Sparks", 70],
                ["Areli Guerra", 30],
                ["Arturo Hopkins", 80],
                ["Beatrice Lane", 120],
                ["Brylee Davenport", 100],
                ["Cali Nixon", 60],
                ["Dane Terrell", 150],
                ["Deshawn Rollins", 40],
                ["Isabell Bright", 70],
                ["Kaya Rowe", 20],
                ["Roderick Herman", 50],
                ["Ruth Dougherty", 75],
              ],
              accessors: {
                x: row => row[0],
                y: row => row[1],
              },
              labels: {
                left: "Tasks",
                bottom: "People",
              },
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Area chart with categorical data</Subhead>
          <StaticChart
            type="categorical/area"
            options={{
              data: [
                ["Alden Sparks", 70],
                ["Areli Guerra", 30],
                ["Arturo Hopkins", 80],
                ["Beatrice Lane", 120],
                ["Brylee Davenport", 100],
                ["Cali Nixon", 60],
                ["Dane Terrell", 150],
                ["Deshawn Rollins", 40],
                ["Isabell Bright", 70],
                ["Kaya Rowe", 20],
                ["Roderick Herman", 50],
                ["Ruth Dougherty", 75],
              ],
              accessors: {
                x: row => row[0],
                y: row => row[1],
              },
              labels: {
                left: "Tasks",
                bottom: "People",
              },
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Bar chart with categorical data</Subhead>
          <StaticChart
            type="categorical/bar"
            options={{
              data: [
                ["Alden Sparks", 70],
                ["Areli Guerra", 30],
                ["Arturo Hopkins", 80],
                ["Beatrice Lane", 120],
                ["Brylee Davenport", 100],
                ["Cali Nixon", 60],
                ["Dane Terrell", 150],
                ["Deshawn Rollins", 40],
                ["Isabell Bright", 70],
                ["Kaya Rowe", 20],
                ["Roderick Herman", 50],
                ["Ruth Dougherty", 75],
              ],
              accessors: {
                x: row => row[0],
                y: row => row[1],
              },
              labels: {
                left: "Tasks",
                bottom: "People",
              },
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Donut chart with categorical data</Subhead>
          <StaticChart
            type="categorical/donut"
            options={{
              data: [
                ["donut", 2000],
                ["cronut", 3100],
              ],
              colors: {
                donut: "#509EE3",
                cronut: "#DDECFA",
              },
              accessors: {
                dimension: row => row[0],
                metric: row => row[1],
              },
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Progress bar</Subhead>
          <StaticChart
            type="progress"
            options={{
              data: {
                value: 0,
                goal: 100000,
              },
              settings: {
                format: {
                  number_style: "currency",
                  currency: "USD",
                  currency_style: "symbol",
                  decimals: 0,
                },
                color: "#84BB4C",
              },
            }}
          />
          <StaticChart
            type="progress"
            options={{
              data: {
                value: 30000,
                goal: 100000,
              },
              settings: {
                format: {
                  number_style: "currency",
                  currency: "USD",
                  currency_style: "symbol",
                  decimals: 0,
                },
                color: "#84BB4C",
              },
            }}
          />
          <StaticChart
            type="progress"
            options={{
              data: {
                value: 100000,
                goal: 100000,
              },
              settings: {
                format: {
                  number_style: "currency",
                  currency: "USD",
                  currency_style: "symbol",
                  decimals: 0,
                },
                color: "#84BB4C",
              },
            }}
          />
          <StaticChart
            type="progress"
            options={{
              data: {
                value: 135000,
                goal: 100000,
              },
              settings: {
                format: {
                  number_style: "currency",
                  currency: "USD",
                  currency_style: "symbol",
                  decimals: 0,
                },
                color: "#84BB4C",
              },
            }}
          />
        </Box>
        <Box>
          <Subhead>Waterfall chart with timeseries data and no total</Subhead>
          <StaticChart
            type="timeseries/waterfall"
            options={{
              data: [
                ["2020-10-20", 20],
                ["2020-10-21", 20],
                ["2020-10-22", 100],
                ["2020-10-23", -10],
                ["2020-10-24", 20],
                ["2020-10-25", -30],
                ["2020-10-26", -10],
                ["2020-10-27", 20],
                ["2020-10-28", -15],
              ],
              accessors: {
                x: row => new Date(row[0]).valueOf(),
                y: row => row[1],
              },
              labels: {
                left: "Count",
                bottom: "Created At",
              },
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Waterfall chart with categorical data and total</Subhead>
          <StaticChart
            type="categorical/waterfall"
            options={{
              data: [
                ["Stage 1", 800],
                ["Stage 2", 400],
                ["Stage 3", -300],
                ["Stage 4", -100],
                ["Stage 5", -50],
                ["Stage 6", 200],
                ["Stage 7", -100],
                ["Stage 8", 300],
                ["Stage 9", 100],
                ["Stage 10", -300],
              ],
              accessors: {
                x: row => row[0],
                y: row => row[1],
              },
              settings: {
                showTotal: true,
              },
              labels: {
                left: "Count",
                bottom: "Created At",
              },
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Line/Area/Bar chart with multiple series</Subhead>
          <StaticChart
            type="combo-chart"
            options={{
              settings: {
                goal: {
                  value: 140,
                  label: "Goal",
                },
                x: {
                  type: "timeseries",
                },
                y: {
                  type: "linear",
                },
                labels: {
                  left: "Count",
                  right: "Sum",
                  bottom: "Date",
                },
              },
              series: [
                {
                  name: "line series",
                  color: "#509ee3",
                  yAxisPosition: "left",
                  type: "line",
                  data: [
                    ["2020-10-20", 15],
                    ["2020-10-21", 20],
                    ["2020-10-22", 35],
                    ["2020-10-23", 40],
                    ["2020-10-24", 55],
                    ["2020-10-25", 60],
                    ["2020-10-26", 75],
                    ["2020-10-27", 80],
                    ["2020-10-28", 95],
                  ],
                },
                {
                  name: "bar series 1",
                  color: "#88bf4d",
                  yAxisPosition: "left",
                  type: "bar",
                  data: [
                    ["2020-10-20", 90],
                    ["2020-10-21", 80],
                    ["2020-10-22", 70],
                    ["2020-10-23", 60],
                    ["2020-10-24", 50],
                    ["2020-10-25", 40],
                    ["2020-10-26", 30],
                    ["2020-10-27", 20],
                    ["2020-10-28", 10],
                  ],
                },
                {
                  name: "bar series 2 with a really really really long name",
                  color: "#a989c5",
                  yAxisPosition: "right",
                  type: "bar",
                  data: [
                    ["2020-10-20", 4],
                    ["2020-10-21", 5],
                    ["2020-10-22", 6],
                    ["2020-10-23", 7],
                    ["2020-10-24", 6],
                    ["2020-10-25", 5],
                    ["2020-10-26", 4],
                    ["2020-10-27", 3],
                    ["2020-10-28", 2],
                  ],
                },
                {
                  name: "area series",
                  color: "#ef8c8c",
                  yAxisPosition: "right",
                  type: "area",
                  data: [
                    ["2020-10-20", 4],
                    ["2020-10-21", 5],
                    ["2020-10-22", 3],
                    ["2020-10-23", 4],
                    ["2020-10-24", 5],
                    ["2020-10-25", 8],
                    ["2020-10-26", 9],
                    ["2020-10-27", 12],
                    ["2020-10-28", 15],
                  ],
                },
              ],
            }}
          />
        </Box>

        <Box py={3}>
          <Subhead>
            Line/Area/Bar chart with negative values, different X ranges, and
            right Y-axis
          </Subhead>
          <StaticChart
            type="combo-chart"
            options={{
              settings: {
                x: {
                  type: "timeseries",
                },
                y: {
                  type: "linear",
                },
                labels: {
                  right: "Sum",
                  bottom: "Date",
                },
              },
              series: [
                {
                  name: "line series",
                  color: "#509ee3",
                  yAxisPosition: "right",
                  type: "line",
                  data: [
                    ["2020-10-18", -65],
                    ["2020-10-19", -55],
                    ["2020-10-20", -45],
                    ["2020-10-21", -30],
                    ["2020-10-22", -25],
                    ["2020-10-23", -10],
                    ["2020-10-24", 0],
                    ["2020-10-25", 10],
                    ["2020-10-26", 20],
                    ["2020-10-27", 80],
                  ],
                },
                {
                  name: "bar series",
                  color: "#88bf4d",
                  yAxisPosition: "right",
                  type: "bar",
                  data: [
                    ["2020-10-20", -90],
                    ["2020-10-21", -80],
                    ["2020-10-22", -70],
                    ["2020-10-23", -60],
                    ["2020-10-24", 10],
                    ["2020-10-25", 20],
                    ["2020-10-26", 30],
                    ["2020-10-27", 40],
                    ["2020-10-28", 50],
                  ],
                },
                {
                  name: "area series",
                  color: "#ef8c8c",
                  yAxisPosition: "right",
                  type: "area",
                  data: [
                    ["2020-10-22", 13],
                    ["2020-10-23", 10],
                    ["2020-10-24", 5],
                    ["2020-10-25", -8],
                    ["2020-10-26", -9],
                    ["2020-10-27", -22],
                    ["2020-10-28", -85],
                    ["2020-10-29", -100],
                    ["2020-10-30", -120],
                  ],
                },
              ],
            }}
          />
        </Box>
        <Box py={3}>
          <Subhead>Funnel</Subhead>
          <StaticChart
            type="funnel"
            options={{
              data: [
                ["Visitors", 1000],
                ["Started sign up", 300],
                ["Finished sign up", 200],
                ["Opened app", 195],
                ["Finished onboarding", 150],
                ["Activated", 50],
              ],
              settings: {
                step: {
                  name: "Step",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
