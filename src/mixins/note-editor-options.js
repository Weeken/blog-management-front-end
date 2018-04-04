const editorOptions = {
  data () {
    return {
      editorOptions: {
        // width: 1000,
        height: '800px',
        menus: [
          'head', // 标题
          'bold', // 粗体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          // 'video', // 插入视频
          // 'code', // 插入代码
          'insertCode', // 插入代码
          'clearStyle', // 清除文字的样式
          'clearFormat', // 清除文字的格式
          'clearAll', // 一键清空编辑器
          'undo', // 撤销
          'redo', // 重复
          'fullscreen' // 全屏
        ],
        pasteFilterStyle: true, // 关闭粘贴样式的过滤
        uploadImgServer: 'https://upload-z2.qiniup.com/',
        uploadFileName: 'file',
        uploadImgMaxLength: 1,
        uploadImgParams: {
          token: '' // 属性值会自动进行 encode ，此处无需 encode
        },
        uploadImgParamsWithUrl: true,
        uploadImgHooks: {
          // success: (xhr, editor, result) => {
          //   // 图片上传并返回结果，图片插入成功之后触发
          //   // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          //   // console.log(result)
          // },
          // fail: (xhr, editor, result) => {
          //   // console.log(result)
          // },
          customInsert: (insertImg, result/* , editor */) => {
            // console.log(insertImg)
            let url = `https://images.weeken.top/${result.key}`
            insertImg(url)
          }
        }
      }
    }
  }
}

export default editorOptions
