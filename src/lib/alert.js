// 自定义颜色：
// colors = {
//   success: '#2BD99F',
//   warning: '#FF5722',
//   info: '#26B7FF',
//   error: '#FFC107'
// }

// 自定义停留时间
// time = 2 // 2秒

// css 长度单位
// unit = 'px'
const opt = {
  colors: {
    success: '#2BD99F',
    error: '#FF5722',
    info: '#26B7FF',
    warning: '#FFC107'
  },
  time: 2000, // ms
  style: {
    height: '80px',
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: 'weiruanyahei'
  }
}

class Alert {
  constructor (options) {
    if (!options) {
      this.opt = opt
    } else {
      opt.time = options['time'] || 2000
      if (options['color']) {
        Object.assign(opt.color, options['color'])
      }
      if (options['style']) {
        Object.assign(opt.style, options['style'])
      }
      this.opt = opt
    }
  }
  create () {
    let el = document.createElement('div')
    el.style = `
    position: fixed;
    top: -${this.opt.style.height};
    left: 0;
    z-index: 99999999;
    transform: translate3d(0,0,0);
    width: 100%;
    height:${this.opt.style.height};
    text-align: center;
    color: #fff;
    opacity: 0;
    font: ${this.opt.style.fontWeight} ${this.opt.style.fontSize}/${this.opt.style.height} ${this.opt.style.fontFamily};
    transition: all .3s ease-in-out;
    box-shadow: 0 0 18px rgba(0,0,0,.3);`
    return el
  }
  append (el) {
    document.querySelector('body').appendChild(el)
  }
  destroy (el) {
    document.querySelector('body').removeChild(el)
  }
  animation (el) {
    // slide-in
    setTimeout(() => {
      el.style.top = 0
      el.style.opacity = 1
    }, 20)
    // stay and slide-out
    setTimeout(() => {
      el.style.top = `-${this.opt.style.height}`
      el.style.opacity = 0
    }, (this.opt.time + 320))
    // destroy
    setTimeout(() => {
      this.destroy(el)
    }, (this.opt.time + 720))
  }
  init (msg, type) {
    let el = this.create()
    this.append(el)
    el.innerText = msg
    el.style.backgroundColor = this.opt.colors[type]
    this.animation(el)
  }
  success (msg) {
    this.init(msg, 'success')
  }
  error (msg) {
    this.init(msg, 'error')
  }
  warning (msg) {
    this.init(msg, 'warning')
  }
  info (msg) {
    this.init(msg, 'info')
  }
}

// module.exports = Alert
export {Alert}
