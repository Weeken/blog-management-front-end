<template lang="html">
  <div class="top_wrap" @click="scrollToTop"></div>
</template>

<script>
export default {
  name: 'backToTop',
  data () {
    return {}
  },
  methods: {
    scrollToTop () {
      let timer = setInterval(() => {
        //获取滚动条距离顶部的高度
        let view = document.querySelector('#view')
        let osTop = view.scrollTop
        let speed = Math.floor(-osTop / 5)
        view.scrollTop = osTop + speed

        if(osTop === 0){
          clearInterval(timer)
        }
      }, 30)
    },
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: "arrow";
  src: url("./arrow.woff");
  font-display: swap;
}
  .top_wrap{
    position: fixed;
    right: 30px;
    bottom: 50px;
    width: 40px;
    height: 40px;
    z-index: 200000;
    border-radius: 50%;
    color: #aaa;
    background-color: #fff;
    opacity: .6;
    box-shadow: 2px 2px 8px rgba(0,0,0,.2);
    font: 18px/40px arrow;
    text-align: center;
    cursor: pointer;
    transition: all .4s ease;

    &:before{
      content: '\ea3a';
    }
  }
</style>
