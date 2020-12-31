let element = {
    type: 'h1'
}

Object.freeze(element)

element.type = 'h2'

element.something = '1'

console.log(element)