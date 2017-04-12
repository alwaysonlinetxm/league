// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Text from './components/Text';
import Style from './Demaxiya.scss';

type Props = {
  showText: () => mixed
};

class Demaxiya extends PureComponent<void, Props, void> {
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

export default connect()(Demaxiya);
