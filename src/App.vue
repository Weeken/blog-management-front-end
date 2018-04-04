<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less" scoped>
  #app{
    width: 100%;
    height: 100%;
    position: relative;
    // background-color: #ddd;
    // padding-bottom: 150px;
  }
</style>
