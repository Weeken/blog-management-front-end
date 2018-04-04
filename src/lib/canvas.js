class Circle {
  constructor (x, y, alpha) {
    this.x = x
    this.y = y
    this.r = Math.random() * 20 + 3
    this._mx = Math.random() * 2 - 1
    this._my = Math.random() * 2 - 1
    this.alpha = alpha
  }

  drawCircle (ctx) {
    let pr = window.devicePixelRatio || 1
    ctx.scale(pr, pr)
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 360)
    ctx.closePath()
    ctx.fillStyle = 'rgba(204, 204, 204, .3)'
    // ctx.fillStyle = '#' + (Math.cos(this.r) * 127 + 128 << 16 | Math.cos(this.r + Math.PI * 2 / 3) * 127 + 128 << 8 | Math.cos(this.r + Math.PI * 2 / 3 * 2) * 127 + 128).toString(16)
    ctx.fill()
  }

  drawLine (ctx, _circle) {
    let dx = this.x - _circle.x
    let dy = this.y - _circle.y
    let d = Math.sqrt(dx * dx + dy * dy)
    if (d < 150) {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)// 起始点
      ctx.lineTo(_circle.x, _circle.y)// 终点
      ctx.closePath()
      ctx.strokeStyle = 'rgba(204, 204, 204, 0.1)'
      ctx.stroke()
    }
  }

  move (w, h) {
    this._mx = (this.x + this.r < w && this.x - this.r > 0) ? this._mx : (-this._mx)
    this._my = (this.y + this.r < h && this.y - this.r > 0) ? this._my : (-this._my)
    this.x += this._mx / 2
    this.y += this._my / 2
  }
}

export { Circle }
