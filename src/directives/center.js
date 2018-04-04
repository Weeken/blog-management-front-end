import Vue from 'vue'

Vue.directive('center', {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__center__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind (el, binding) {
    document.removeEventListener('click', el.__center__)
    delete el.__center__
  },
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    console.log(el)
  }
})
