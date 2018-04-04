import axios from 'axios'
import {Alert} from 'lib/alert'
import Storage from 'lib/local_storage'

let alert = new Alert()

const Envs = {
  development: 'http://localhost:3000',
  production: 'https://weeken.top'
}

const BASE = `${Envs[process.env.NODE_ENV]}/v1/api`

const URL = {
  TOKEN: `${BASE}/token`,
  LOGIN: `${BASE}/users/admin/login`,

  ADDMEMO: `${BASE}/memos/admin/addMemos`,
  MEMOLIST: `${BASE}/memos/admin/memoList`,
  DELETEMEMO: `${BASE}/memos/admin/deleteMemos`,

  NOTESLIST: `${BASE}/notes/admin/noteList`,
  ADDNOTE: `${BASE}/notes/admin/addNotes`,
  NOTEDETAILS: `${BASE}/notes/admin/noteDetails`,
  UPDATENOTE: `${BASE}/notes/admin/updateNote`,
  DELETENOTE: `${BASE}/notes/admin/deleteNotes`
}

function error (err, fail) {
  // 请求有响应
  if (err.response) {
    // 如果有错误处理方法
    if (fail) {
      fail(err.response.data.error, err.response.status, err.response.headers)
    } else {
      // 默认处理错误请求方法
      alert.error(err.response.data.message || err.response.status + ': ' + err.response.statusText)
    }
  } else {
    alert.error(err.message)
  }
}

async function handler (promise, fail) {
  try {
    let res = await promise
    return res.data
  } catch (err) {
    error(err, fail)
  }
}

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  let user = Storage.getItem('admin')
  if (user && user.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = user.token
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  console.log(error.response)
  if (error.response.status === 401 && error.response.data.type === 'auth_error') {
    Storage.removeItem('user')
  }
  return Promise.reject(error)
})

export default {
  // 上传七牛云
  async getUpToken (fail) {
    return await handler(axios.get(URL.TOKEN), fail)
  },
  async upload (token, formdata, fail) {
    let url = `https://upload-z2.qiniup.com/?token=${token}`
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return await handler(axios.post(url, formdata, config), fail)
  },
  async login (params, fail) {
    return await handler(axios.post(URL.LOGIN, params), fail)
  },
  // 管理后台
  // 便笺管理
  async getMemoList (page, fail) {
    return await handler(axios.get(URL.MEMOLIST, {params: {page: page}}), fail)
  },
  async addMemos (params, fail) {
    return await handler(axios.post(URL.ADDMEMO, params), fail)
  },
  async deleteMemo (id, fail) {
    let url = `${URL.DELETEMEMO}/${id}`
    return await handler(axios.delete(url), fail)
  },
  // 笔记管理
  async getNotes (page, fail) {
    return await handler(axios.get(URL.NOTESLIST, {params: {page: page}}), fail)
  },
  async addNotes (params, fail) {
    return await handler(axios.post(URL.ADDNOTE, params), fail)
  },
  async getNoteDetails (id, fail) {
    let url = `${URL.NOTEDETAILS}/${id}`
    return await handler(axios.get(url), fail)
  },
  async updateNote (id, params, fail) {
    let url = `${URL.UPDATENOTE}/${id}`
    return await handler(axios.put(url, params), fail)
  },
  async deleteNote (id, fail) {
    let url = `${URL.DELETENOTE}/${id}`
    return await handler(axios.delete(url), fail)
  }
}
