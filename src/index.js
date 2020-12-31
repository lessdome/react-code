import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {
  // 设置初始属性对象
  static defaultProps = {
    name: '珠峰',
  };

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
    console.log('Counter 1.constructor 初始化属性和状态对象');
  }

  componentWillMount() {
    console.log('Counter 2.componentWillMount 组件将要挂载');
  }

  componentDidMount() {
    console.log('Counter 4.componentDidMount 组件挂载完成');
  }

  handleClick = (ev) => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    console.log('Counter 3.render 渲染');
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        {this.state.number === 4 ? null : (
          <ChildCounter counter={this.state.number} />
        )}
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter 5.shouldComponentUpdate 决定组件是否需要更新');

    return nextState.number % 2 === 0; // 偶数就是true 奇数就是false
  }

  componentWillUpdate() {
    console.log('Counter 6.componentWillUpdate 组件将要更新');
  }

  componentDidUpdate() {
    console.log('Counter 7.componentWillUpdate 组件更新完成');
  }
}

class ChildCounter extends React.Component {
  componentWillMount() {
    console.log('ChildCounter 1.componentWillMount');
  }
  render() {
    console.log('ChildCounter 2.render');
    return (
      <div>
        <hr />
        <p>{this.props.counter}</p>
      </div>
    );
  }
  componentDidMount() {
    console.log('ChildCounter 3.componentDidMount');
  }

  componentWillReceiveProps(newProps) {
    console.log('ChildCounter 4.componentWillReceiveProps');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('ChildCounter 5.shouldComponentUpdate ');

    return nextProps.count % 3 === 0; // 3的倍数true 奇数就是false
  }

  componentWillUpdate() {
    console.log('ChildCounter 6.componentWillUpdate ');
  }

  componentDidUpdate() {
    console.log('ChildCounter 7.componentWillUpdate ');
  }

  componenWillUnmount() {
    console.log('ChildCounter 8.componentWillUnmount');
  }
}

ReactDOM.render(<Counter />, window.document.getElementById('root'));

/**
Counter 1.constructor 初始化属性和状态对象
Counter 2.componentWillMount 组件将要挂载
Counter 3.render 渲染
Counter 4.componentDidMount 组件挂载完成
Counter 5.shouldComponentUpdate 决定组件是否需要更新
Counter 5.shouldComponentUpdate 决定组件是否需要更新
Counter 6.componentWillUpdate 组件将要更新
Counter 3.render 渲染
Counter 7.componentWillUpdate 组件更新完成
 */
