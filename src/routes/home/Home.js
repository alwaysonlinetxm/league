import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { getNames } from '../../selectors/HomeSelector';
import Actions from '../../actions/HomeActions';
import * as DataTypes from '../../constants/DataTypes';
import Util from '../../libs/util';
import Text from './components/Text';
import Style from './Home.scss';

class Home extends PureComponent {
  toDemaxiya = this.toDemaxiya.bind(this)
  sagaTask = this.sagaTask.bind(this)

  toDemaxiya() {
    this.context.router.push('/demaxiya');
  }

  sagaTask() {
    Util.log('test saga');
    this.props.sagaTask({
      name: 'item3',
      num: 3
    });
  }

  componentWillMount() {
    Util.log('will ', 'mount');
    this.props.getMember();
  }

  render() {
    const { names, text } = this.props;

    return (
      <div className={ Style.home }>
        <p className={ Style.task } onClick={ this.sagaTask }>saga task</p>
        <p onClick={ this.toDemaxiya } className={ classnames(Style.border, Style.color) }>Home</p>
        { names.map((node, i) => <p key={ i }>{ node }</p>) }
        <Text text={ text } />
      </div>
    );
  }
}

Home.propTypes = {
  list: PropTypes.arrayOf(DataTypes.MEMBER).isRequired,
  total: PropTypes.number.isRequired,
  names: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  getMember: PropTypes.func.isRequired,
  sagaTask: PropTypes.func.isRequired
};

Home.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  const { list, total, text } = state.home;
  return {
    list,
    total,
    names: getNames(state),
    text
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
