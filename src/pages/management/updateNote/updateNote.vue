<template lang="html">
  <div class="update_note">
    <div class="head">更新笔记<i @click="back"></i></div>
    <div class="paper">

      <div class="filed">
        <label class="required">文章标题：</label>
        <input type="text" v-model="note.title">
      </div>

      <div class="filed">
        <label class="required">分类标签：</label>
        <input type="text" v-model="note.tag">
      </div>

      <div class="filed">
        <label class="required">内容摘要：</label>
        <textarea type="text" v-model="note.abstract"></textarea>
      </div>

      <div class="filed">
        <label class="required">文章内容：</label>
        <vue-wangeditor id="editor" :options="editorOptions" v-model="note.content" :init-content="initContent"></vue-wangeditor>
      </div>

      <div class="filed">
        <button type="button" @click.prevent="submitNote">提 交</button>
      </div>

    </div>
  </div>
</template>

<script>
import editorOptions from '@/mixins/note-editor-options'
export default {
  name: 'updateNote',
  mixins: [editorOptions],
  data () {
    return {
      token: '',
      initContent: '',
      note: {
        title: '',
        tag: '',
        abstract: '',
        content: ''
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async getToken () {
      this.token = (await this.$http.getUpToken()).token
      this.editorOptions.uploadImgParams.token = this.token
    },
    async getNoteDetails () {
      this.note = (await this.$http.getNoteDetails(this.$route.query.id)).data
      this.initContent = this.note.content
    },
    async submitNote () {
      let res = await this.$http.updateNote(this.$route.query.id, this.note)
      if (res) {
        this.Alert.success(res.message)
      }
    }
  },
  created () {
    this.getNoteDetails()
    this.getToken()
  }
}
</script>

<style lang="less" scoped>
  .update_note{
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

    .paper{
      width: 960px;
      // height: 1000px;
      margin: 50px auto;
      padding: 50px;
      background-color: #fff;
      border-radius: 5px;
      // box-shadow: 2px 3px 16px rgba(0,0,0,.3);

      .filed{
        width: 100%;
        margin-bottom: 30px;

        & > label{
          width: 120px;
          padding: 10px;
          font: 16px/60px microsoft yahei;
          display: inline-block;

          &.required{
            &:after{
              content: '*';
              color: #e53935;
              vertical-align: top;
            }
          }
        }

        & > input{
          display: inline-block;
          width: 700px;
          height: 40px;
          padding: 0 20px;
          font: 16px/40px microsoft yahei;
          // background-color: #e3f2fd;
          border-bottom: 1px solid #ddd;

          &:focus{
            border-bottom: 2px solid #90caf9;
          }
        }

        & > textarea{
          width: 100%;
          height: 200px;
          border: 1px solid #ddd;
          padding: 10px;
          font: 14px/20px microsoft yahei;

          &:focus{
            border-color: #90caf9;
          }
        }

        & > button{
          display: block;
          width: 300px;
          height: 40px;
          margin: 50px auto 30px;
          border: 0;
          cursor: pointer;
          color: #fff;
          border-radius: 5px;
          background-color: #64b5f6;
          font-size: 20px;
          box-shadow: 2px 2px 12px rgba(0,0,0,.3);
          &:hover{
            // background-color: #90caf9;
            box-shadow: 2px 2px 12px rgba(0,0,0,0);
          }
        }
      }
    }
  }
</style>
