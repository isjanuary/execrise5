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
  emptyClazz.prototype = Super.prototype
  function extensiveClazz() {
    // Super.call(this) will force the extensiveClass bind to this
    Super.call(this)
  }

  // merge protyotype chain methods that can be used in a new instance
  extensiveClazz.prototype = merge(new emptyClazz, prototype)

  // console.log('==============: ', Base)
  extensiveClazz = merge(merge(extensiveClazz, Base), static)

  // merge static methods

  // merge
  // var Super = this
  // function S() {}
  // S.prototype = Super.prototype
  // function Clazz() {
  //   Super.call(this)
  // }

  // Clazz.prototype = new Super;
  return extensiveClazz
}

function merge(base, extensions) {
  if (!extensions) return base
  console.log('--------------------')
  for (var name in extensions) {
    console.log('name: ', name)
    base[name] = extensions[name]
  }

  return base
}

module.exports = Base
