import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as Actions from '../../actions/HomeActions';
import * as DataTypes from '../../constants/DataTypes';
import Util from '../../libs/util';
import Style from './Home.scss';

class Home extends Component {
  toDemaxiya = this.toDemaxiya.bind(this)

  toDemaxiya() {
    this.context.router.push('/demaxiya');
  }

  componentWillMount() {
    Util.log('will ', 'mount');
    this.props.getMember();
  }

  render() {
    const { list } = this.props;
    return (
      <div className={ Style.home }>
        <p onClick={ this.toDemaxiya } className={ classnames(Style.border, Style.color) }>Home</p>
        { list.map((node, i) => <p key={ i }>{ node.name }</p>) }
      </div>
    );
  }
}

Home.propTypes = {
  list: PropTypes.arrayOf(DataTypes.MEMBER).isRequired,
  total: PropTypes.number.isRequired,
  getMember: PropTypes.func.isRequired
};

Home.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  const { list, total } = state.home;
  return {
    list: list,
    total: total
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
