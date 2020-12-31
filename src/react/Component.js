import createDom from '../react-dom/createDom.js'

/**
 * 更新队列
 * @param {Boolean} isBatchingUpdate 当前是否处于批量更新模式， 模式值为false
 */
export let updateQueue = {
    isBatchingUpdate: false,
    updates: new Set(),
    batchUpdate() {
        for (const updater of this.updates) {
            updater.updateComponent()
        }
        this.isBatchingUpdate = false
    }
}

/**
 * @param {Component} classInstance 类组件的实例
 */
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance // 类组件的实例
        this.pendingStates = [] // 等待生效的状态 状态可能是一个对象 也可能是一个函数
        this.callbackQueue = []
    }

    /** 发布订阅 */
    addState(partialState, callback) {
        this.pendingStates.push(partialState) // 等待更新的或者说等待生效的状态
        if (typeof callback === 'function') this.callbackQueue.push(callback) // 状态更新后的回调

        // 更新的逻辑
        this.emitUpdate()
    }

    /** 不管属性变化还是状态变化都会更新 */
    emitUpdate(newProps) {
        if (updateQueue.isBatchingUpdate) { // 如果当前是批量模式, 先缓存updater
            updateQueue.updates.add(this) // 本次更新结束
        } else {
            this.updateComponent() // 直接更新组件
        }
    }

    updateComponent() {
        // 如果有等待更新的状态对象的话
        if (this.pendingStates.length) {
            // this.classInstance.state = this.getState() // 计算新状态
            // this.classInstance.forceUpdate() // 组件实例强制更新
            // this.callbackQueue.forEach(callback => callback()) // 执行setState的回调函数
            // this.callbackQueue.length = 0 // 执行完毕 清空回调函数的队列
            shouldUpdate(this.classInstance, this.getState())
        }
    }

    getState() {
        let {
            classInstance,
            pendingStates
        } = this
        let {
            state
        } = classInstance

        pendingStates.forEach(nextState => {
            // 如果 pendingstate是一个函数 需要传入老状态 返回新状态 在进行合并
            if (typeof nextState === 'function') {
                nextState = nextState.call(classInstance, state)
            }
            state = {
                ...classInstance.state,
                ...nextState
            }
        })

        // 把状态数组清空掉
        pendingStates.length = 0
        return state
    }
}

/**
 * @param {Object} props 父组件传入的属性 只可读 不可修改 --- readonly
 */
class Component {
    constructor(props) {
        this.props = props
        this.updater = new Updater(this)
    }

    /** 修改state的唯一方法 */
    setState(partialState, callback) {
        this.updater.addState(partialState, callback)
    }

    /** 用来区分是函数组件还是类组件 */
    static isReactComponent = true

    /** 此方法为抽象方法，不可执行，只能通过子类实现 */
    render() {
        throw new Error('此方法为抽象方法，不可执行，只能通过子类实现')
    }

    /** 强制更新组件 */
    forceUpdate() {
        if (this.componentWillUpdate) {
            this.componentWillUpdate()
        }
        let newVDom = this.render()
        updateClassComponent(this, newVDom)
        if (this.componentDidUpdate) {
            this.componentDidUpdate()
        }
    }
}

/**
 * 判断组件是否需要更新 组件
 * @param {Component} classInstance 类组件的实例
 * @param {Array<Record>} nextState 新的状态
 */
function shouldUpdate(classInstance, nextState) {
    classInstance.state = nextState; // 不过组件要不要刷新, 其实组件的state属性一定会改变
    // 如果组件有这个方法，并且这个方法的返回值为false, 则不需要继续向下更新了, 否则就更新
    if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(classInstance.props, classInstance.state)) {
        return;
    }

    classInstance.forceUpdate()
}

/**
 *  更新类组件的定义
 * @param {Object} classInstance 类组件的实例
 * @param {Object} newVdom 新的虚拟dom
 */
function updateClassComponent(classInstance, newVdom) {
    let oldDOM = classInstance.dom // 取出这个类组件上次渲染出来的真实dom
    let newDOM = createDom(newVdom)
    oldDOM.parentNode.replaceChild(newDOM, oldDOM)
    classInstance.dom = newDOM
}

export default Component