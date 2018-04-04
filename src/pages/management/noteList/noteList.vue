<template lang="html">
  <div class="note_list">
    <div class="head">笔记管理<i @click="$router.go(-1)"></i></div>
    <table cellpadding="0" cellspacing="0">
      <thead>
        <tr><td>标题</td><td>分类</td><td>摘要</td><td>创建时间</td><td>操作</td></tr>
      </thead>
      <tbody>
        <tr v-for="item in noteList" :key="item._id" v-if="noteList.length > 0">
          <td style="font-size: 14px; width: 25%;">{{item.title}}</td>
          <td style="text-align: center; width: 10%;">{{item.tag}}</td>
          <td style="font-size: 12px; width: 40%; text-indent: 2em;line-height:24px;">{{item.abstract}}</td>
          <td style="font-size: 14px; width: 15%;">{{item.time | time}}</td>
          <td style="text-align: center; width: 10%;">
            <i class="edit" title="编辑" @click="editNote(item._id)"></i>
            <i class="delete" title="删除" @click="deleteNote(item._id)"></i>
          </td>
        </tr>
        <tr v-if="noteList.length === 0">
          <td colspan="5" class="none">没有笔记...</td>
        </tr>
      </tbody>
    </table>
    <div class="bottom clear">
      <button type="button" class="add" @click="addnote">添加笔记</button>
      <pagination :align="'right'" :page-count="pageCount" :curpage.sync="currentPage" @current-change="pageChange"></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/pagination/pagination'
import Format from 'lib/format'
export default {
  name: 'noteList',
  components: { Pagination },
  data () {
    return {
      currentPage: 1,
      pageCount: 0,
      noteList: []
    }
  },
  filters: {
    time (stamp) {
      return Format.formatDate(stamp, '-', 'minute')
    }
  },
  methods: {
    addnote () {
      this.$router.push('/addnote')
    },
    editNote (id) {
      this.$router.push({path: '/updateNote', query: {id: id}})
    },
    async deleteNote (id) {
      let res = await this.$http.deleteNote(id)
      if (res) {
        this.Alert.success('删除成功')
        this.getNoteList(this.currentPage)
      }
    },
    async getNoteList (i) {
      let res = await this.$http.getNotes(i)
      if (res) {
        this.noteList = res.data
        this.pageCount = res.pageCount

      }
    },
    pageChange (i) {
      this.getNoteList(i)
    }
  },
  created () {
    this.getNoteList(this.currentPage)
  }
}
</script>

<style lang="less" scoped>
  .note_list{
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
        word-wrap: break-word;
        word-break: break-all;

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

          & > .edit, & > .delete{
            display: inline-block;
            width: 24px;
            height: 24px;
            cursor: pointer;
            background-repeat: no-repeat;
            background-size: cover;
            &:hover{
              transform: scale(1.8);
            }
          }
          & > .edit{
            margin-right: 5px;
            background-image: url('../../../assets/edit.png');
          }
          & > .delete{
            background-image: url('../../../assets/delete.svg');
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
