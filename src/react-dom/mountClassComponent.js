import createDom from './createDom'

/**
 * 1. 创建类组件的实例
 * 2. 调用类组件实例的render方法获得返回的虚拟DOM(React元素)
 * 3. 把返回的虚拟DOM转成真实DOM进行挂载
 * @param {Object} vdom 类型为类组件的虚拟dom
 */
function mountClassComponent(vdom) {
    // 解构类的定义和类的属性对象
    let {
        type,
        props
    } = vdom;
    // 创建类的实例
    let classInstace = new type(props);
    // componentWillMount 生命周期在此处执行
    if (classInstace.componentWillMount) {
        classInstace.componentWillMount()
    }
    // 调用实例的render方法 返回要渲染的虚拟dom对象
    let renderVdom = classInstace.render();
    // 根据虚拟DOM对象创建真实DOM对象
    let dom = createDom(renderVdom);
    // 如果类组件有componentDidMount生命周期函数 就给dom添加一个自定义属性在 dom挂载结束够调用
    if (classInstace.componentDidMount) dom.componentDidMount = classInstace.componentDidMount.bind(classInstace);
    // 为以后类组件的更新，把真实的dom挂载到了类的实例上
    classInstace.dom = dom;
    return dom;
}

export default mountClassComponent