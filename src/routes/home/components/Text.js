import React, { PureComponent, PropTypes } from 'react';
import './Text.scss';

class Text extends PureComponent {
  render() {
    return (
      <div>{ this.props.text }</div>
    );
  }
}

Text.propTypes = {
  text: PropTypes.string.isRequired
};

export default Text;
