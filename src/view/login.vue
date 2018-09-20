<style>
  html,body{height: 100%;width: 100%}
  #login{
    height: 100%;width: 100%;
    background-image: url("./../assets/login_banner.jpg");
    background-size: cover
  }
  #login>.login-wrap{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: white;padding: 30px;width: 300px;
    border-radius: 4px;
    box-shadow: 0 2px 16px #333c4b, 0 0 1px #333c4b, 0 0 1px #333c4b;
  }
</style>
<template>
  <div id="login">
    <div class="login-wrap">
      <el-form
        style="width: 300px;text-align: center">
        <p
          style="font-size: 24px;font-weight: 400;text-align: center;margin: 0px 0 14px 0">
          用户登录</p>
        <el-input
          class="user_name"
          style="margin: 14px 0 25px 0"
          v-model="user_name">
        </el-input>
        <el-input
          class="user_password"
          type="password"
          v-model="user_password">
        </el-input>
        <el-button
          style="margin: 30px 0 14px 0;width: 150px;background-color: #409eff;color: white"
          @click="goHome">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
  import UserInfo from './../service/user-info'
export default {
  data(){
    return{
      user_name: '',
      user_password: ''
    }
  },
  methods:{
    goHome(){
      let val = {user_name: this.user_name,user_password:this.user_password}
      UserInfo.ValidateLogon(this.dataInterface,val)
        .then(res => {
          if (res == 'no'){
            this.$message('账号密码错误')

          }else {
            // this.$router.push({path:'/home'})
            console.log(res)
          }
        }
      )
    }
  }
}
</script>
