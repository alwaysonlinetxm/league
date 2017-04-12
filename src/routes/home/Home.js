// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { getNames } from '../../selectors/HomeSelector';
import Actions from '../../actions/HomeActions';
import Util from '../../libs/util';
import Text from './components/Text';
import Style from './Home.scss';

type DefaultProps = {
  list: Array<Object>,
  total: number,
  names: Array<string>,
  text: string,
};

type Props = {
  list: Array<Object>,
  total: number,
  names: Array<string>,
  text: string,
  getMember: () => mixed,
  sagaTask: () => mixed
};

type State = {
  text: string
};

class Home extends PureComponent<DefaultProps, Props, State> {
  static defaultProps = {
    list: [],
    total: 0,
    names: [],
    text: ''
  }

  state = {
    text: 'lalala'
  }

  // will check type by flow
  test: HTMLParagraphElement
  toDemaxiya = this.toDemaxiya.bind(this)
  sagaTask = this.sagaTask.bind(this)

  toDemaxiya() {
    this.setState({
      text: 'demaxiya' // will check type by flow
    });
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

  // will check type by flow
  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log(prevProps, prevState)
  }

  render() {
    const { names, text } = this.props;

    return (
      <div className={ Style.home }>
        <p className={ Style.task } onClick={ this.sagaTask } ref={ref => this.test = ref}>saga task</p>
        <p onClick={ this.toDemaxiya } className={ classnames(Style.border, Style.color) }>Home</p>
        { names.map((node, i) => <p key={ i }>{ node }</p>) }
        <Text text={ text } />
      </div>
    );
  }
}

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

// $Unknown
export default connect(mapStateToProps, mapDispatchToProps)(Home);
