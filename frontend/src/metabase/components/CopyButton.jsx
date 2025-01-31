import React, { Component } from "react";

import Icon from "metabase/components/Icon";
import Tooltip from "metabase/components/Tooltip";
import { t } from "ttag";
import CopyToClipboard from "react-copy-to-clipboard";

type Props = {
  className?: string,
  style?: Object,
  value: string,
};
type State = {
  copied: boolean,
};

export default class CopyWidget extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      copied: false,
    };
  }
  onCopy = () => {
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  };
  render() {
    const { value, className, style, ...props } = this.props;
    return (
      <CopyToClipboard text={value} onCopy={this.onCopy}>
        <div className={className} style={style} data-testid="copy-button">
          <Tooltip tooltip={t`Copied!`} isOpen={this.state.copied}>
            <Icon name="copy" {...props} />
          </Tooltip>
        </div>
      </CopyToClipboard>
    );
  }
}
