function Base() {
  this.events = {}
}

Base.prototype.on = function(evtName, callback) {
  this.events[evtName] = this.events[evtName] || []
  this.events[evtName].push(callback)
}

Base.prototype.trigger = function(evtName, value) {
  (this.events[evtName] || []).forEach(callback => {
    callback.call(this, value)
  })
}

Base.extend = function() {
  var Super = function() {}
  Super.prototype = Base.prototype
  function extensiveClass() {
    Base.call(this)
    this.events = {}
  }

  extensiveClass.prototype = new Super;
  // arguments is an object:
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
  extensiveClass = merge(extensiveClass, arguments)
  extensiveClass['extend'] = Base.extend
  console.log('extensions: ', extensiveClass);
  return extensiveClass
}

function merge(base, extensions) {
  var instanceMethods = extensions[0] || {}
  var staticMethods = extensions[1] || {}

  Object.keys(instanceMethods).forEach(methodName => {
    base.prototype[methodName] = instanceMethods[methodName]
  })

  Object.keys(staticMethods).forEach(methodName => {
    base[methodName] = staticMethods[methodName]
  })

  console.log('base.prototype: ', base.prototype);
  return base
}

module.exports = Base
