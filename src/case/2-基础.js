import React from 'react';
import ReactDOM, { render } from 'react-dom';

/**
 *
 * jsx 编译时发生在 webpack 打包时
 *
 * 打包后的代码在浏览器里执行的时候 会执行函数 返回一个js对象
 *
 * {
 *  type: 'h1',
 *  props: {
 *          id: 'title',
 *          children: 'hello' // 如果只有一个儿子的话, children就是那个独生子, 如果是多个那就是个数组了
 *      }
 * }
 *
 * render 方法 会负责把虚拟dom变成真实的dom 插入到容器中
 */
// const element1 = (
//   <h1
//     id='title'
//     className='title'
//     style={{ color: 'red', background: 'green' }}
//   >
//     title
//   </h1>
// );

// console.log(element1);

// const list = [
//   { id: 1, name: '张1' },
//   { id: 2, name: '张2' },
//   { id: 3, name: '张3' },
// ];
// ReactDOM.render(
//   <ul>
//     {list.map((i) => (
//       <li key={i.id}>{i.name}</li>
//     ))}
//   </ul>,
//   document.getElementById('root')
// );

// setTimeout(() => {
//   const list = [
//     { id: 2, name: '张2' },
//     { id: 3, name: '张3' },
//     { id: 1, name: '张1' },
//   ];
//   ReactDOM.render(
//     <ul>
//       {list.map((i) => (
//         <li key={i.id}>{i.name}</li>
//       ))}
//     </ul>,
//     document.getElementById('root')
//   );
// }, 10000);
/**
 * React 更新的时候会如何更新?
 *  1. 简单粗暴 把老的删除掉 在插入全部新元素 性能非常差
 *  2. React 会把老的 虚拟DOM 和 新的虚拟DON 进行比较 这个就是所谓的 dom-diff 找到他们之间的差异 然后只更新差异的地方
 */

function tich() {
  const element = (
    <div>
      <div>当前时间</div>
      <span>{new Date().toLocaleTimeString()}</span>
      <div>中国</div>
    </div>
  );

  render(element, document.getElementById('root'));
}

setInterval(tich, 1000);

/**
 * React元素是不可变的
 *
 * React 只会更新必要的部分 React@17之前 这只是个规定
 *
 */
