<template lang="html">
  <div class="memo_list">
    <div class="head">便笺管理<i @click="$router.go(-1)"></i></div>

    <table cellpadding="0" cellspacing="0">
      <thead>
        <tr><td>主题</td><td>标题</td><td>封面</td><td>描述</td><td>操作</td></tr>
      </thead>
      <tbody>
        <tr v-for="item in memoList" :key="item._id" v-if="memoList.length > 0">
          <td>{{item.caption}}</td>
          <td>{{item.title}}</td>
          <td style="text-align: center;"><img :src="item.imageUrl" /></td>
          <td><div v-html="item.desc"></div></td>
          <td style="text-align: center;"><i class="delete" title="删除" @click="deleteMemo(item._id)"></i></td>
        </tr>
        <tr v-if="memoList.length === 0">
          <td colspan="5" class="none">没有便笺...</td>
        </tr>
      </tbody>
    </table>
    <div class="bottom clear">
      <button type="button" class="add" @click="addMemo">添加便笺</button>
      <pagination :align="'right'" :page-count="pageCount" :curpage.sync="currentPage" @current-change="pageChange"></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/pagination/pagination'
export default {
  name: 'memoList',
  components: { Pagination },
  data () {
    return {
      currentPage: 1,
      pageCount: 0,
      memoList: []
    }
  },
  methods: {
    addMemo () {
      this.$router.push('/addMemo')
    },
    async deleteMemo (id) {
      let res = await this.$http.deleteMemo(id)
      if (res) {
        this.Alert.success('删除成功')
        this.getMemoList(this.currentPage)
      }
    },
    async getMemoList (i) {
      let res = await this.$http.getMemoList(i)
      if (res) {
        this.memoList = res.data
        this.pageCount = res.pageCount

      }
    },
    pageChange (i) {
      this.getMemoList(i)
    }
  },
  created () {
    this.getMemoList(this.currentPage)
  }
}
</script>

<style lang="less" scoped>
  .memo_list{
    width: 100%;

    .head{
      width: 100%;
      height: 70px;
      padding: 0 50px;
      color: #fff;
      background-color: #42a5f5;
      font: 24px/70px microsoft yahei;
      // box-shadow: 0 0 14px rgba(0,0,0,.4);
      position: relative;

      & > i{
        position: absolute;
        width: 50px;
        height: 50px;
        top: 10px;
        right: 50px;
        cursor: pointer;
        transition: all .2s linear;
        &:hover{
          transform: rotate(180deg);
          &:before,&:after{
            background-color: #1976d2;
          }
        }
        &:before,&:after{
          content: '';
          position: absolute;
          top: 50%;
          left: 10%;
          margin-top: -2px;
          width: 80%;
          height: 4px;
          background-color: #fff;
          transition: all .2s linear;
        }
        &:before{
          transform: rotate(-45deg);
        }
        &:after{
          transform: rotate(45deg);
        }
      }
    }

    & > table{
      width: 1000px;
      margin: 50px auto;
      border: 1px solid #ddd;
      border-right: 0;
      border-bottom: 0;
      // background-color: #fff;

      tr:hover{
        background-color: rgba(94,178,237,.1);
      }

      td{
        height: 40px;
        padding: 0 10px;
        vertical-align: middle;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;

        &.none{
          text-align: center;
          color: #aaa;
        }
      }

      thead{
        height: 40px;
        color: #075a9d;
        background-color: rgba(16,150,243,.24);
        td{
          height: 40px;
          line-height: 40px;
          border-right: 0;
          text-align: center;
        }
      }

      tbody{
        td{
          & > img{
            width: 52px;
            height: 64px;
            margin: 5px auto;
          }

          & > .delete{
            display: inline-block;
            width: 24px;
            height: 24px;
            cursor: pointer;
            background-image: url('../../../assets/delete.svg');
            background-repeat: no-repeat;
            background-size: cover;
            &:hover{
              transform: scale(1.8);
            }
          }
        }
      }
    }

    .bottom{
      width: 1000px;
      height: 40px;
      margin: 50px auto;

      .add{
        float: left;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        border-radius: 5px;
        background-color: #2196f3;
        cursor: pointer;
        box-shadow: 2px 2px 10px rgba(0,0,0,.3);

        &:hover{
          box-shadow: 2px 2px 10px rgba(0,0,0,0);
        }
      }
    }
  }
</style>
