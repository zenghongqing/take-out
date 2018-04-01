<template>
  <div class="login">
    <header-bar text="登陆注册页" @back="back"></header-bar>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">登陆</mt-tab-item>
      <mt-tab-item id="2">注册</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" class="login-wrapper">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="login_username"></mt-field>
        <!--<mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>-->
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="login_password"></mt-field>
        <mt-button type="primary" size="large" class="mint-button" @click.native="login">登陆</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="register-wrapper">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="register_username"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="register_email"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="register_password1"></mt-field>
        <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="register_password2"></mt-field>
        <mt-button type="primary" size="large" class="mint-button" @click="register">注册</mt-button>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import HeaderBar from '../base/header-bar/header-bar'
import api from '../../api/axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      selected: '1',
      login_username: '',
      login_password: '',
      register_username: '',
      register_email: '',
      register_password1: '',
      register_password2: ''
    }
  },
  components: {
    HeaderBar
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    back () {
      this.$router.push({
        path: '/index'
      })
    },
    login () {
      let data = {
        username: this.login_username,
        password: this.login_password
      }
      api.userLogin(data).then((res) => {
        console.log(data)
        if (res.data.success === false) {
          console.log('账号不存在')
          return
        }
        if (res.data.success) {
          console.log('登陆成功')
          let token = res.data.token
          let username = data.username
          this.$store.dispatch('UserLogin', token)
          this.$store.dispatch('UserName', username)
          this.$store.state.isLogin = true
          // 如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
          let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
          console.log(redirectUrl)
          this.$router.push({
            path: redirectUrl
          })
        } else {
          console.log('密码错误')
        }
      })
    },
    register () {
      let data = {
        username: this.register_username,
        email: this.register_email,
        register_password1: this.register_password1,
        register_password2: this.register_password2
      }
      api.userRegister(data).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.selected = '1'
        } else {
          this.selected = '2'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    margin-top: 42px;
    background-color: #fff;
    overflow: visible;
    .login-wrapper {
      margin-top: 20px;
      overflow: hidden;
      .mint-button {
        margin-top: 30px;
      }
    }
    .register-wrapper {
      margin-top: 20px;
      overflow: hidden;
      .mint-button {
        margin-top: 30px;
      }
    }
  }
</style>
