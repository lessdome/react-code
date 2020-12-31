import {
    addEvent
} from './event'

/**
 * 师兄虚拟dom的属性 更新刚创建出来的真实dom的属性
 * @param {DOM-NODE} dom 
 * @param {Object} props 
 */
function updateProps(dom, newProps) {
    for (let key in newProps) {
        if (key === 'children') {
            continue
        } else if (key === 'style') {
            let styleObj = newProps.style
            for (let attr in styleObj) {
                dom.style[attr] = styleObj[attr]
            }
        } else if (key.startsWith('on')) {
            // dom[key.toLowerCase()] = newProps[key]
            addEvent(dom, key.toLocaleLowerCase(), newProps[key])
        } else {
            dom[key] = newProps[key]
        }

    }
}

export default updateProps