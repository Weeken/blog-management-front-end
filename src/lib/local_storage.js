if (typeof localStorage === 'object') {
  try {
    localStorage.setItem('localStorage', 1)
    localStorage.removeItem('localStorage')
  } catch (e) {
    console.log(e.message, e.name, e.stack)
    Storage.prototype._setItem = Storage.prototype.setItem
    Storage.prototype.setItem = function () {}
    alert('你的浏览器不支持本地储存,对于浏览器来说,通常情况下是您使用了"无痕浏览模式".这将导致你访问本网站产生异常')
  }
}

export default {
  getItem (name) {
    let item = localStorage.getItem(name)
    try {
      // console.log('是json', JSON.parse(item))
      return JSON.parse(item)
    } catch (e) {
      // console.log('不是json')
      console.log(e.message, e.name, e.stack)
      return item
    }
  },
  setItem (name, val) {
    let type = Object.prototype.toString.call(val).slice(8, -1)
    if (type === 'Object') {
      localStorage.setItem(name, JSON.stringify(val))
    } else {
      localStorage.setItem(name, val)
    }
  },
  removeItem (name) {
    localStorage.removeItem(name)
  },
  clear () {
    localStorage.clear()
  }
}
