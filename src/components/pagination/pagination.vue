<template lang="html">
  <div class="page_wrap">
    <ul :style="{textAlign: align}">
      <li class="pre page" :class="currentPage === 1 ? 'disabled' : ''" @click="pre"></li>
      <li class="ellipsis page" v-if="currentList > 1">...</li>
      <li class="page" :class="currentPage === i ? 'current' : ''" v-for="i in currentPageList" :key="i" @click="setCurrent(i)">{{i}}</li>
      <li class="ellipsis page" v-if="currentList < listCount">...</li>
      <li class="next page" :class="currentPage === pageCount ? 'disabled' : ''" @click="next"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pageCount: {type: Number, required: true},
    align: {type: String, default: 'center'},
    curpage: {type: Number, default: 1}
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    // 总区间数
    listCount () {
      if (this.pageCount <= 5) {
        return 1
      } else {
        return this.pageCount % 5 === 0 ? ~~(this.pageCount / 5) : ~~(this.pageCount / 5 + 1)
      }
    },
    // 当前分页区间号
    currentList () {
      return this.currentPage >=5 && this.currentPage % 5 === 0 ? ~~(this.currentPage / 5) : ~~(this.currentPage / 5 + 1)
    },
    // 当前分页区间
    currentPageList () {
      let list = []
      if (this.pageCount <= 5) {
        for (let i = 1; i <= this.pageCount; i ++) {
          list.push(i)
        }
      } else {
        list = [1, 2, 3, 4, 5].map(i => {
          let page = i + 5 * (this.currentList - 1)
          if (page <= this.pageCount) {
            return page
          }
        })
      }
      return list.filter(n => {return n}) // forEach(), filter(), reduce(), every() 和some()都会跳过空位。
    }
  },
  watch: {
    currentPage (i) {
      this.$emit('current-change', i)
      this.$emit('update:curpage', i)
    }
  },
  methods: {
    setCurrent (i) {
      this.currentPage = i
    },
    pre () {
      if (this.currentPage <= 1) {
        return
      } else {
        this.currentPage -= 1
      }
    },
    next () {
      if (this.currentPage >= this.pageCount) {
        this.currentPage = this.pageCount
      } else {
        this.currentPage += 1
      }
    }
  },
  created () {
    this.currentPage = this.curpage
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'w-icon';
  src: url('./icon.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
[class^="pre"],[class^="next"],
[class*=" pre"],[class*=" next"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'w-icon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Enable Ligatures ================ */
  letter-spacing: 0;
  -webkit-font-feature-settings: "liga";
  -moz-font-feature-settings: "liga=1";
  -moz-font-feature-settings: "liga";
  -ms-font-feature-settings: "liga" 1;
  font-feature-settings: "liga";
  -webkit-font-variant-ligatures: discretionary-ligatures;
  font-variant-ligatures: discretionary-ligatures;
}
.page_wrap{
  min-width: 160px;
  height: 40px;

  li.page{
    width: 40px;
    height: 40px;
    border: 1px solid #2196f3;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    font: 20px/38px microsoft yahei;
    text-align: center;
    color: #2196f3;
    margin-right: 5px;
    &:last-child{
      margin-right: 0;
    }

    &:hover{
      background-color: #beddf6;
    }

    &.current{
      background-color: #2196f3;
      color: #fff;
    }

    &.disabled{
      cursor: not-allowed;
      background-color: #eee;
      color: #ccc;
      border-color: #ddd;
    }

    &.pre:after{
      content: '\ea1f';
    }
    &.next:after{
      content: '\ea20';
    }
  }
}
</style>
