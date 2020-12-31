import createDom from './createDom'

/**
 * 把一个类型为自定义函数组件的虚拟dom转换为真实dom并返回
 * @param {Object} vdom 函数组件
 */
function mountFuncitonComponent(vdom) {
    let {
        type: FunctionComponent,
        props
    } = vdom
    let renderVdom = FunctionComponent(props)

    return createDom(renderVdom)
}

export default mountFuncitonComponent