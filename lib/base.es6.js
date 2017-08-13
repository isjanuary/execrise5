class Base {
  constructor() {
    this.events = {}
  }

  on(evtName, callback) {
    this.events[evtName] = this.events[evtName] || []
    this.events[evtName].push(callback)
  }

  trigger(evtName, value) {
    this.events[evtName].forEach(callback => {
      callback.call(this, value)
    })
  }
}

module.exports = Base
