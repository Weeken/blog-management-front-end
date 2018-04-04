<template lang="html">
  <div class="user_mask" @click.self="closeLogin">
    <form class="form">
      <h3>登  录</h3>
      <div class="field">
        <input type="email" placeholder="邮箱" v-model.trim="loginForm.email" @blur="$v.loginForm.email.$touch()">
        <span>邮箱</span>
        <ul class="noti_list">
          <li key="null" v-if="$v.loginForm.email.$dirty && !$v.loginForm.email.required">请输入邮箱地址</li>
          <li key="error" v-if="$v.loginForm.email.$dirty && !$v.loginForm.email.email">请输入正确的邮箱地址</li>
        </ul>
      </div>
      <div class="field">
        <input type="password" placeholder="密码" v-model.trim="loginForm.password" @blur="$v.loginForm.password.$touch()">
        <span>密码</span>
        <ul class="noti_list">
          <li v-if="$v.loginForm.password.$dirty && !$v.loginForm.password.required">请输入密码</li>
          <li v-if="$v.loginForm.password.$dirty && !$v.loginForm.password.minLength">密码至少6个字符</li>
        </ul>
      </div>
      <!-- <input type="button" value="Forgot Password ?"> -->
      <button class="submit" :disabled="$v.loginForm.$invalid" @click.prevent="login">立即登录</button>
    </form>
  </div>
</template>

<script>
import 'css/form.less'
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {},
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    loginForm: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    async login () {
      let res = await this.$http.login(this.loginForm)
      if (res) {
        this.Alert.success(res.message)
        this.$storage.setItem('admin', res.data)
        this.userInfo = res.data
        this.$router.push('/home')
      }
    }
  }
}
</script>
