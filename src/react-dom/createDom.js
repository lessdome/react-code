import updateProps from './updateProps'
import render from './render'
import reconcileChildren from './reconcileChildren'
import mountFunctionComponent from './mountFunctionComponent'
import mountClassComponent from './mountClassComponent'

/**
 * 把虚拟dom变成真实dom
 * @param {Object} vdom 虚拟do'm
 */
function createDom(vdom) {
    // 需要处理 vdom是 Number | String的类型 
    // 如果vdom 是 字符串 数字 直接返回一个文本节点
    if (typeof vdom === 'string' || typeof vdom === 'number') return document.createTextNode(vdom)

    /** 否则他就是一个 react 虚拟dom元素了 */
    let {
        type,
        props
    } = vdom

    let dom
        // 自定义函数组件
    if (typeof type === 'function') {
        if (type.isReactComponent) {
            return mountClassComponent(vdom)
        } else {
            return mountFunctionComponent(vdom)
        }

    } else {
        // 原生组件
        dom = document.createElement(type)
    }

    updateProps(dom, props)

    if (typeof props.children === 'string' || typeof props.children === 'number') {
        // 优化 如果props.children是一个字符串或者数字 那么直接给这个dom的textContent赋值为这个值 不需要递归
        dom.textContent = props.children
    } else if (typeof props.children === 'object' && props.children.type) {
        // 如果只有一个子元素， 并且这个子元素是一个虚拟dom元素 则将这个vdom挂载到当前dom上
        render(props.children, dom)
    } else if (Array.isArray(props.children)) {
        // 如果子元素是一个数组时， 说明我们要特殊处理
        reconcileChildren(props.children, dom);
    } else {
        dom.textContent = props.children ? props.children.toString() : ''
    }

    // 把真实的dom作为一个dom属性放在虚拟dom上 为以后的更新做准备
    // vdom.dom = dom
    return dom
}

export default createDom