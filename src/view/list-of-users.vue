<template>
  <div class="list-of-users">
    <el-table
      :data="usersData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="60"
        label="序号">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="user_name">
      </el-table-column>
      <el-table-column
        label="密码"
        prop="user_password">
      </el-table-column>

      <el-table-column
        label="手机号"
        prop="phone_number">
      </el-table-column>

      <el-table-column
        label="邮箱"
        prop="mailbox">
      </el-table-column>

      <el-table-column
        label="头像"
        prop="touxiang">
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  import UserInfo from './../service/user-info'
  export default {
    data() {
      return {
        usersData:[]
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        let _this = this
        UserInfo.GetUsers(_this.dataInterface).then(res => {
          if (res.success==false){
            this.$router.push({path:'/login'})
          }
          this.usersData = res
        })
      }
    },
  }
</script>
