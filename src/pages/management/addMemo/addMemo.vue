<template lang="html">
  <div class="add_mome">
    <div class="head">添加便笺<i @click="back"></i></div>
    <div class="paper">

      <div class="filed">
        <label class="required">主题：</label>
        <input type="text" v-model="memo.caption">
      </div>

      <div class="filed">
        <label class="required">标题：</label>
        <input type="text" v-model="memo.title">
      </div>

      <div class="filed">
        <label class="required">封面：</label>
        <div class="img_wrap">
          <i v-if="!croppedImg"></i>
          <input type="file" ref="file" @change="getImg($event)">
          <img v-if="croppedImg" :src="croppedImg" alt="">
        </div>
      </div>

      <div class="filed">
        <label class="required">描述：</label>
        <vue-wangeditor id="editor" :options="editorOptions" v-model="memo.desc"></vue-wangeditor>
      </div>

      <div class="filed">
        <button type="button" @click.prevent="submitMemo">提 交</button>
      </div>

    </div>
    <vue-cropper v-if="isShow" :img="originImg" :ratio="260/325" :result.sync="croppedImg" :imgData.sync="memo.imageOptions" v-on:close="hide"></vue-cropper>
  </div>
</template>

<script>
import editorOptions from '../../../mixins/memo-editor-option'
export default {
  name: 'addMemo',
  mixins: [editorOptions],
  data () {
    return {
      token: '',
      isShow: false,
      originImg: '',
      croppedImg: '',
      memo: {
        caption: '',
        title: '',
        src: '',
        desc: '',
        imageOptions: {}
      }
    }
  },
  methods: {
    hide () {
      this.isShow = false
      this.originImg = ''
    },
    async uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      let res = await this.$http.upload(this.token, formdata)
      if (res) {
        formdata.delete('file')
        this.originImg = this.createNativePic(file)
        this.memo.src = `https://images.weeken.top/${res.key}`
        this.isShow = true
        this.$refs.file.value = ''
      }
    },
    createNativePic (file) {
      let url
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    getImg (e) {
      let file = e.target.files[0]
      const isType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isType) {
        this.Alert.error('上传头像图片只能是 JPG 或 PNG 格式!')
      } else if (!isLt2M) {
        this.Alert.error('上传头像图片大小不能超过 2MB!')
      } else {
        this.uploadImg(file)
      }
    },
    async getToken () {
      this.token = (await this.$http.getUpToken()).token
      // this.editorOptions.uploadImgParams.token = this.token
    },
    async submitMemo () {
      let res = await this.$http.addMemos(this.memo)
      if (res) {
        this.Alert.success(res.message)
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    }
  },
  created () {
    this.getToken()
  }
}
</script>

<style lang="less" scoped>
  .add_mome{
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
      // box-shadow: 2px 3px 16px rgba(0,0,0,.3);
      border-radius: 5px;

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

        & > .img_wrap{
          display: inline-block;
          vertical-align: top;
          width: 260px;
          height: 325px;
          border-radius: 5px;
          border: 1px solid #ddd;
          position: relative;
          transition: all .2s linear;
          &:hover{
            border: 2px solid #90caf9;

            & > i:before,& > i:after{
              background-color: #90caf9;
            }
          }

          & > i{
            position: absolute;
            width: 60px;
            height: 60px;
            top: 50%;
            left: 50%;
            margin: -30px 0 0 -30px;

            &:before,&:after{
              content: '';
              position: absolute;
              top: 50%;
              margin-top: -5px;
              width: 100%;
              height: 10px;
              background-color: #ddd;
              transition: all .2s linear;
            }
            &:after{
              transform: rotate(90deg);
            }
          }

          & > img{
            width: 100%;
            height: 100%;
          }

          & > input[type="file"]{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
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
