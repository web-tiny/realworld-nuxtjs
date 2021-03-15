<!--
 * @Descripttion: tiny.jiao@aliyun.com
 * @version: 
 * @Author: Tiny
 * @Date: 2021-03-13 21:28:51
 * @LastEditors: Tiny
 * @LastEditTime: 2021-03-14 10:41:19
-->
<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ loginText }}</h1>
        <p class="text-xs-center">
          <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
          <nuxt-link to="/login" v-else >Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <li>That email is already taken</li>
        </ul>

        <form @submit.prevent="handleSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required minlength="8">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ loginText }}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { to } from 'await-to-js'
import { apiLogin, apiRegister } from "@/api/index.js"
const Cookie = process.client ? require("js-cookie") : undefined

export default {
  name: 'LoginIndex',
  middleware: 'notAuthenticated',
  props: {},
  components: {},
  data() {
    return {
      user: {
        email:"",
        password: "",
        username: ""
      },
    }
  },
  created() {},
  mounted() {},
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    },
    loginText () {
      return this.isLogin ? 'Login in' : 'Sign up'
    }
  },
  watch: {},
  methods: {
    handleSubmit() {
      this.isLogin ? this.login() : this.register()
    },

    async login() {
      const {email, password} = this.user;
      const [err, {data} = {}] = await to(apiLogin({ user: {email, password }}))
      if (!err && data) {
        this.dealData(data)
      }
    },

    async register() {
      const [err, {data} = {}] = await to(apiRegister({ user: { ...this.user} }))
      if (!err && data) {
        this.dealData(data)
      }
    },

    dealData(data) {
      const {user = {}} = data || {}
      Cookie.set("user", user)
      this.$store.commit("setUser", user)
      this.$router.push("/")
      console.log(user)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
