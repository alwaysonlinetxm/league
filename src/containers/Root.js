// @flow
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/CommonActions';
import './reset.scss';

type Props = {
  children: Object,
  actions: Object,
  text: string
};

class Root extends PureComponent<void, Props, void> {
  render() {
    const { children, actions, text } = this.props;

    return (
      <div>
        { React.cloneElement(children, { ...actions }) }
        <footer>{ text }</footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    text: state.common.text
  };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

// $Unknown
export default connect(mapStateToProps, mapDispatchToProps)(Root);
