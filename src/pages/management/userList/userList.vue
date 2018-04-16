<template lang="html">
  <div class="memo_list">
    <div class="head">访客管理<i @click="$router.go(-1)"></i></div>

    <div class="search clear">
      <input type="text" v-model="search.email" placeholder="email">
      <input type="text" v-model="search.name" placeholder="昵称">
      <button type="button" @click="findUser(1)">搜索</button>
    </div>

    <table cellpadding="0" cellspacing="0">
      <thead>
        <tr><td>_id</td><td>邮箱</td><td>昵称</td><td>头像</td><td>类型</td></tr>
      </thead>
      <tbody>
        <tr v-for="item in userList" :key="item._id" v-if="userList.length > 0">
          <td>{{item._id}}</td>
          <td>{{item.email}}</td>
          <td>{{item.name}}</td>
          <td style="text-align: center;"><img :src="item.avatar" /></td>
          <td>{{item.type}}</td>
          <!-- <td style="text-align: center;"><i class="delete" title="删除" @click="deleteMemo(item._id)"></i></td> -->
        </tr>
        <tr v-if="userList.length === 0">
          <td colspan="5" class="none">没有访客...</td>
        </tr>
      </tbody>
    </table>
    <div class="bottom clear" v-if="pageCount > 1">
      <pagination :align="'center'" :page-count="pageCount" :curpage.sync="currentPage" @current-change="pageChange"></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/pagination/pagination'
export default {
  name: 'userList',
  components: { Pagination },
  data () {
    return {
      search: {
        email: '',
        name: ''
      },
      currentPage: 1,
      pageCount: 0,
      userList: []
    }
  },
  methods: {
    async getUserList (i) {
      let res = await this.$http.getMemoList(i)
      if (res) {
        this.userList = res.data
        this.pageCount = res.pageCount
      }
    },
    async findUser (i) {
      let params = { page: i }
      if (this.search.email) params.email = this.search.email
      if (this.search.name) params.name = this.search.name
      let res = await this.$http.findUsers(params)
      if (res) {
        this.userList = res.data
        this.pageCount = res.pageCount
      }
    },
    pageChange (i) {
      this.findUser(i)
    }
  },
  created () {
    this.findUser(this.currentPage)
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

    .search{
      width: 1000px;
      height: 40px;
      margin: 50px auto;

      & > input{
        float: left;
        width: 260px;
        height: 40px;
        margin-right: 50px;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 5px;

        &:focus{
          border-color: rgba(94,178,237,1)
        }
      }

      & > button{
        float: left;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        border-radius: 5px;
        background-color: #2196f3;
        cursor: pointer;
      }
    }

    & > table{
      width: 1000px;
      margin: 50px auto;
      border: 1px solid #ddd;
      border-right: 0;
      border-bottom: 0;
      text-align: center;

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
    }
  }
</style>
