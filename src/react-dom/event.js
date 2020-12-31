import {
    updateQueue
} from '../react/Component'

/**
 * 给真实DOM 添加事件处理函数
 * 为什么要这么做？ 合成事件？ 为什么要做事件委托
 * 1. 做浏览器兼容处理
 * 2. 可以在事件之前和之后 装饰一些内容  --- 装饰器模式
 *    before -- updateQueue.isBatchingUpdate = true
 *    after -- updateQueue.batchUpdate()
 * @param {DOM_NODE} dom 真实DOM
 * @param {String} eventType 事件类型
 * @param {Function} listener 监听函数
 */
export function addEvent(dom, eventType, listener) {
    let store = dom.store || (dom.store = {})
    store[eventType] = listener // store.onclick = handleClick

    // 事件代理 不管你给哪个dom元素上绑定事件 最后都统一代理到document上
    if (!document[eventType]) {
        document[eventType] = dispatchEvent //document.onclick = dispatchEvent
    }
}

/**
 * dom触发的事件代理函数
 * @param {NativeEvent} event DOM原生事件对象
 */
function dispatchEvent(event) {
    let {
        target,
        type
    } = event // 事件源  事件类型
    let eventType = `on${type }`
    updateQueue.isBatchingUpdate = true // 先把队列设置成批量更新模式
    while (target) {
        let {
            store
        } = target
        let listener = store && store[eventType]
        listener && listener.call(target, new EventSingleCase(event))
        target = target.parentElement
    }

    updateQueue.batchUpdate()
}

/**
 * 对事件对象进行单例和兼容处理
 * @param {NativeEvent} event 
 */
function EventSingleCase(event) {
    if (EventSingleCase.instace) return EventSingleCase.instace
    EventSingleCase.instace = this.initEvent(event)
    return EventSingleCase.instace
}

EventSingleCase.prototype.initEvent = function(nativeEvent) {
    Object.assign(nativeEvent, {})
    return nativeEvent
}