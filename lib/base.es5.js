function Base() {
  this.events = {}
}

Base.prototype.on = function(evt, callback) {
  this.events[evt] = this.events[evt] || []
  this.events[evt].push(callback)
}

Base.prototype.trigger = function(evt, value) {
  this.events[evt].forEach(callback => {
    callback.call(this, value)
  })
}

Base.extend = function(extensionOpt) {
  var Super = this
  function S() {}
  S.prototype = Super.prototype
  function Clazz() {
    Super.call(this)
  }

  Clazz.prototype = new Super
  return Clazz
}

module.exports = Base
