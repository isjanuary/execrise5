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

Base.extend = function(prototype, static) {
  var Super = this
  function emptyClazz() {}
  // inherit prototype methods from parent Super
  emptyClazz.prototype = Super.prototype
  function extensiveClazz() {
    // Super.call(this) will extensiveClazz to this
    Super.call(this)
  }

  // merge new prototype methods from @param: prototype
  extensiveClazz.prototype = merge(new emptyClazz, prototype)

  // 1. merge static methods from parent Super
  // 2. merge static methods from @param: static
  // extensiveClazz = merge(merge(extensiveClazz, Base), static)
  extensiveClazz = merge(merge(extensiveClazz, Super), static)

  return extensiveClazz
}

function merge(base, extensions) {
  if (!extensions) return base
  for (var name in extensions) {
    base[name] = extensions[name]
  }

  return base
}

module.exports = Base
