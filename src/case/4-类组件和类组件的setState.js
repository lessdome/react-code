import React from './react';
import ReactDOM from './react-dom';

/**
 * 类组件和类组件的更新
 * 可以在构造函数里，并且只能在构造函数里给this.state赋值
 * 定义状态对象
 * 属性对象 父组件传入的 不能改变 是只读的 -- readonly
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      number: 0,
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({ number: this.state.number + 1 });
  }

  handleChange() {
    this.setState({ loading: !this.state.loading });
  }

  render() {
    return (
      <div>
        props: {this.state.name}
        <hr />
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <hr />
        <p>{this.state.loading ? 'LOADING...' : '    '}</p>
        <button onClick={this.handleChange}>changeLoading</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter name="计数器" />, document.getElementById('root'));
