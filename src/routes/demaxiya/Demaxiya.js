import React, { Component } from 'react';
import Text from './components/Text';
import Style from './Demaxiya.scss';

class Demaxiya extends Component {
  render() {
    return (
      <div className={Style.box}>
        <Text />
        demaxiya
      </div>
    );
  }
}

export default Demaxiya;
