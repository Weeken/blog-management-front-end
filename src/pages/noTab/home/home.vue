<template>
  <div class="home_wrap" ref="bg">
    <canvas id="canvas" ref="cvs"></canvas>
    <div class="content">
      <div class="avatar move_down">
        <div class="avatar_wrap"><img src="../../../assets/avatar.jpg" alt="avatar"></div>
      </div>
      <div class="welcome move_up">If you have great talents, industry will improve them; if you have but moderate abilities, industry will supply their deficiency.</div>
      <div class="nav move_up">
        <ul>
          <li v-for="item in tabs" :key="item.path">
            <router-link :to="item.path">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'components/loading'
import { Circle } from 'lib/canvas'
let loading
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
export default {
  name: 'Home',
  data () {
    return {
      tabs: [
        { path: '/memoList', name: '便笺管理' },
        { path: '/noteList', name: '笔记管理' },
        { path: '/userList', name: '访客管理' }
      ]
    }
  },
  computed: {
    cvs () { return this.$refs.cvs },
    bg () { return this.$refs.bg }
  },
  methods: {
    preloadImg () {
      let style = this.bg.currentStyle || window.getComputedStyle(this.bg, false)
      let img = new Image()
      img.src = style.backgroundImage.slice(4, -1).replace(/"/g, "")
      if (img.complete) {
        // console.log('complete')
        setTimeout(() => {
          if (loading) loading.hide()
        }, 50)
      } else {
        img.onerror = () => {
          if (loading) loading.hide()
        }
        img.onload = () => {
          if (loading) loading.hide()
        }
      }
    }
  },
  created () {
    loading = Loading.show()
  },
  mounted () {
    let cvs = this.cvs
    let ctx = cvs.getContext('2d')
    let w = cvs.width = window.innerWidth
    let h = cvs.height = window.innerHeight
    let circles = []

    let draw = () => {
      ctx.clearRect(0, 0, w, h)
      circles.map(item => {
        item.move(w, h)
        item.drawCircle(ctx)
      })
      window.requestAnimationFrame(draw)
    }
    let init = (num) => {
      for (let i = 0; i < num; i++) {
        circles.push(new Circle(Math.random() * w, Math.random() * h, Math.random() / 2))
      }
      draw()
    }
    init(90)

    this.preloadImg()
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: "Lobster";
  // src: url("../../../assets/font/Lobster-Regular.ttf");
  src: url("../../../assets/font/DancingScript-Bold.ttf");
  font-display: swap;
}

@keyframes movedown{
	0%{
		transform: translateY(200px);
		opacity: 0;
	}
	50%{
		transform: translateY(100px);
		opacity: 0;
	}
	100%{
		transform: translateY(0);
		opacity: 1;
	}
}
@keyframes moveup{
	0%{
		transform: translateY(-200px);
		opacity: 0;
	}
	50%{
		transform: translateY(-100px);
		opacity: 0;
	}
	100%{
		transform: translateY(0);
		opacity: 1;
	}
}

@keyframes zoom{
	0%{
		transform: scale(1);
	}
	50%{
		transform: scale(1.6);
	}
	100%{
		transform: scale(1.3);
	}
}

.move_up{
  animation: moveup .8s ease-in-out;
}
.move_down{
  animation: movedown .8s ease-in-out;
}

.home_wrap{
  width: 100%;
	height: 100%;
  background-image: url('../../../assets/bg.jpg');
  background-size: cover;
  position: relative;

  #canvas{
    // position: absolute;
    // z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
  }

  .content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;

    .avatar{
      position: absolute;
      top: 30%;
      left: 0;
      width: 100%;
      height: 120px;

      .avatar_wrap{
        display: inline-block;
        width: 120px;
        height: 120px;
        // border: 2px solid #fff;
        border-radius: 50%;
        overflow: hidden;

        &:hover{
          transform: scale(1.3);
          animation: zoom .3s;
        }

        & > img{
          width: 100%;
          height: 100%;
        }
      }
    }

    .welcome{
      position: absolute;
      width: 100%;
      height: 80px;
      top: 44%;
      font: 24px/80px Lobster;
    }

    .nav{
      position: absolute;
      width: 100%;
      height: 80px;
      top: 50%;

      li{
        display: inline-block;
        font: 20px/25px microsoft yahei;
        margin: 30px 80px 30px 40px;
        white-space: nowrap;
        transition: all .2s linear;
        border-bottom: 2px solid #fff;
        width: 0px;
        & > a{ color: #fff; text-decoration: none; }
        &:hover{
          width: 80px;
          margin-right: 0px;
        }
      }
    }
  }
}
</style>
