import createDom from './createDom'

/**
 * 1. 把vdom 虚拟dom 变成真实的dom
 * 2. 把虚拟dom上的属性更新或者同步到dom上
 * 3. 把此虚拟dom的儿子们也变成真实的dom挂载到自己的dom上 dom.appendChild
 * 4. 把自己挂载到根节点上
 * @param {Object | Number | String} vdom react组件
 * @param {DOMNode} container 挂载节点
 */
function render(vdom, container) {
    const dom = createDom(vdom)
    container.appendChild(dom)
    if (dom.componentDidMount) dom.componentDidMount()
}

export default render