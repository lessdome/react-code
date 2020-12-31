import React from './react';
import ReactDOM from './react-dom';

/**
 * 函数定义组件
 * React 元素不仅可以是DOM标签 还可以是用户自定义的组件
 * 1. 自定义组件的名称必须是首字母大写的 因为原生标签是小写的 所以要区分
 * 2. 自定义组件使用前要提前定义
 * 3. 自定义组件必须要返回一个根元素
 */

function ChildOne(props) {
  return (
    <div>
      <hr />I am {props.name}’s child
      <hr />
    </div>
  );
}

function FunctionComponentWelcome(props) {
  return (
    <div className="title" style={{ background: 'green', color: 'red' }}>
      <span>{props.name}</span>
      {props.children}

      <ChildOne name={props.name} />
    </div>
  );
}

ReactDOM.render(
  <FunctionComponentWelcome name="1111">world</FunctionComponentWelcome>,
  document.getElementById('root')
);
