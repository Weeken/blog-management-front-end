export default {

  pad (num) {
    return num < 10 ? `0${num}` : '' + `${num}` // 小于10补上0
  },

  filtTime (duratin) {
    let times = {}
    times.hour = parseInt(duratin / 3600)
    times.min = parseInt(duratin % 3600 / 60)
    times.sec = parseInt(duratin % 3600 % 60 % 60)
    // console.log(times)
    return times
  },

  formatTime (timeStamp) {
    let time = this.filtTime(timeStamp)
    let formattime = {
      hour: this.pad(time.hour) + ':' + this.pad(time.min) + ':' + this.pad(time.sec),
      min: this.pad(time.min) + ':' + this.pad(time.sec)
    }
    // console.log(formattime)
    return time.hour > 0 ? formattime.hour : formattime.min
  },

  filtDate (params) {
    let date = {}
    let time = typeof params === 'object' ? date : new Date(params)
    date.year = time.getFullYear()
    date.month = time.getMonth() + 1
    date.date = time.getDate()
    date.hour = time.getHours()
    date.minute = time.getMinutes()
    date.second = time.getSeconds()
    return date
  },

  formatDate (time, connector, format) {
    let _ = connector instanceof String ? connector : String(connector)

    let date = this.filtDate(time)

    let date_ = {
      'year': date.year,
      'month': date.year + _ + this.pad(date.month),
      'date': date.year + _ + this.pad(date.month) + _ + this.pad(date.date),
      'hour': date.year + _ + this.pad(date.month) + _ + this.pad(date.date) + ' ' + this.pad(date.hour),
      'minute': date.year + _ + this.pad(date.month) + _ + this.pad(date.date) + ' ' + this.pad(date.hour) + ':' + this.pad(date.minute),
      'second': date.year + _ + this.pad(date.month) + _ + this.pad(date.date) + ' ' + this.pad(date.hour) + ':' + this.pad(date.minute) + ':' + this.pad(date.second),
      'second2': date.year + _ + this.pad(date.month) + _ + this.pad(date.date) + this.pad(date.hour) + this.pad(date.minute) + this.pad(date.second)
    }
    return date_[format]
  }
}
