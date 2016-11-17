import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/CommonActions';
import './reset.scss';

class Root extends PureComponent {
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

Root.propTypes = {
  text: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    text: state.common.text
  };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Root);
