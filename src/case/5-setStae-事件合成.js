import React from './react';
import ReactDOM from './react-dom';

/**
 * 合成事件 和 批量更新
 * 1. 在React里面, 事件的更新可能是异步的, 是批量的, 不是同步
 *    调用state之后状态并没有立刻更新，而是先缓存起来了
 *    等事件函数完成后， 在进行批量更新， 一次更新重新渲染
 * 结论: 因为jsx事件处理函数是react控制的 只要归react控制就是批量 只要是不归react管了 就是非批量的
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      number: 0,
    };
  }

  handleClick = (event) => {
    console.log(event);
    // this.setState(
    //   {
    //     number: this.state.number + 1,
    //   },
    //   () => {
    //     console.log('cb1', this.state.number);
    //   }
    // );
    // console.log(this.state.number);
    // this.setState(
    //   {
    //     number: this.state.number + 1,
    //   },
    //   () => {
    //     console.log('cb2', this.state.number);
    //   }
    // );
    // console.log(this.state.number);
    // 肯定是批量更新， 而且这个回调函数是等全部更新完成后才能执行
    this.setState(
      (lastState) => ({
        number: lastState.number + 1,
      }),
      (state) => {
        console.log('callback1', this.state.number);
      }
    );
    console.log(this.state.number);
    this.setState(
      (lastState) => ({
        number: lastState.number + 1,
      }),
      (state) => {
        console.log('callback2', this.state.number);
      }
    );
    console.log(this.state.number);
    queueMicrotask(() => {
      console.log(this.state.number);
      this.setState(
        (lastState) => ({
          number: lastState.number + 1,
        }),
        (state) => {
          console.log('callback3', this.state.number);
        }
      );
      console.log(this.state.number);
      this.setState(
        (lastState) => ({
          number: lastState.number + 1,
        }),
        (state) => {
          console.log('callback4', this.state.number);
        }
      );
      console.log(this.state.number);
    });
  };

  render() {
    return (
      <div>
        <p> {this.state.name} </p> <hr />
        <p> {this.state.number} </p>{' '}
        <button onClick={this.handleClick}>
          <span> + </span>{' '}
        </button>{' '}
      </div>
    );
  }
}

ReactDOM.render(<Counter name="珠峰" />, document.getElementById('root'));
