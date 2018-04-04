import Vue from 'vue'
import Format from 'lib/format'

let a = Vue.filter('time', stamp => {
  return Format.formatDate(stamp, '-', 'minute')
})

export default {a}
