import render from './render'

/**
 * 处理多个子元素的方法
 * @param {Array<Object>} childrenVdom 子元素的虚拟dom
 * @param {DOMNODE} dom 父元素的真实dom
 */
function reconcileChildren(childrenVdom, dom) {
    for (let i = 0; i < childrenVdom.length; i++) {
        let childVdom = childrenVdom[i]
        render(childVdom, dom)
    }
}

export default reconcileChildren