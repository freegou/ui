<template>
  <div>
    <div class="loginWraper">
      <div class="loginBox">
        <form class="form form-horizontal">
          <div class="row cl">
            <label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60d;</i></label>
            <div class="formControls col-xs-8">
              <input type="text" placeholder="账户" class="input-text size-L" v-model="User.username">
            </div>
          </div>
          <div class="row cl">
            <label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60e;</i></label>
            <div class="formControls col-xs-8">
              <input type="password" placeholder="密码" class="input-text size-L" v-model="User.password">
            </div>
          </div>
          <div class="row cl">
            <div class="formControls col-xs-8 col-xs-offset-3">
              <button class="btn btn-success radius size-L" @click="submit">登录</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        User: {},
        apiUrl: 'http://cyapi.freegou.io/'
      }
    },
    methods: {
      submit () {
        this.$http.post(this.apiUrl + 'api-token-auth/', {username: this.User.username, password: this.User.password})
          .then(resp => {
            this.Information = resp.body
            localStorage.setItem('token', this.Information.token)
            if (this.Information.id !== null) {
              this.$router.push('/nav')
              location.reload()
            }
          })
      }
    }
  }
</script>


