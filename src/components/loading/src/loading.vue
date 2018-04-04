<template lang="html">
  <transition name="fade" @after-leave="handleAfterLeave">
    <div class="w_loading" v-show="visible">
      <div class="mask">
        <div class="loader">
          <div class="dot" v-for="i in 5" :key="i"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      visible: true
    }
  },
  methods: {
    handleAfterLeave () {
      this.$emit('after-leave')
    }
  }
}
</script>

<style lang="css" scoped>
.w_loading{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.w_loading .mask{
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.w_loading .mask .loader {
  position: absolute;
  top: 50%;
  left: 40%;
  margin-left: 10%;
  transform: translate3d(-50%, -50%, 0);
}
.w_loading .mask .loader .dot {
  width: 24px;
  height: 24px;
  background: #3ac;
  border-radius: 100%;
  display: inline-block;
  animation: slide 1s infinite;
}
.w_loading .mask .loader .dot:nth-child(1) {
  animation-delay: 0.1s;
  background: #32aacc;
}
.w_loading .mask .loader .dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #64aacc;
}
.w_loading .mask .loader .dot:nth-child(3) {
  animation-delay: 0.3s;
  background: #96aacc;
}
.w_loading .mask .loader .dot:nth-child(4) {
  animation-delay: 0.4s;
  background: #c8aacc;
}
.w_loading .mask .loader .dot:nth-child(5) {
  animation-delay: 0.5s;
  background: #faaacc;
}

/*过渡效果*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.bounce-enter-active {
  animation: bounce-in .2s;
}
.bounce-leave-active {
  animation: bounce-out .2s;
}
@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
@keyframes bounce-out {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(0); }
}
@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
