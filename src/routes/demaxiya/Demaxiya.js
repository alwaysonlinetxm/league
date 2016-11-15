import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Text from './components/Text';
import Style from './Demaxiya.scss';

class Demaxiya extends Component {
  showText = this.showText.bind(this)

  showText() {
    this.props.showText('lalalalalalalala');
  }

  render() {
    return (
      <div className={Style.box} onClick={ this.showText }>
        <Text />
        demaxiya
      </div>
    );
  }
}

Demaxiya.propTypes = {
  showText: PropTypes.func.isRequired
};

export default connect()(Demaxiya);
