<style>
#home{height: 100%}
</style>
<template>
  <div id="home">
    <el-container style="height: 100%;">
      <el-aside style="width: 236px;background-color: #343c4a">
        <logo zoomVal="0.7" style="margin-top: 10px"></logo>
        <div style="display: flex;justify-content: space-between;align-items: center;padding: 0 5px 0 20px;cursor: pointer" @click="goMeetingTea">
          <span style="color: #fff;line-height: 50px" >meetingtea.top</span>
          <div style="background-color: #4cc1b2;width: 5px;height: 25px"></div>
        </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          text-color="rgb(191, 202, 217)"
          active-text-color="#38aaf2"
          background-color="#343c4a"
          style="border-right: none;">
          <el-submenu index="1">
            <template slot="title">
              <span class="iconfont icon-shujuguanli">数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <span class="iconfont icon-shangpinliebiao">商品列表</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <span class="iconfont icon-yonghuliebiao">用户列表</span>
              </el-menu-item>
              <el-menu-item index="1-3">
                <span class="iconfont icon-wenzhang">文章列表</span>
              </el-menu-item>
              <el-menu-item index="1-4">
                <span class="iconfont icon-wenzhang">test文章列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span class="iconfont icon-tianjiashuju">添加数据</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <span class="iconfont icon-tianjiayonghu">添加用户</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <span class="iconfont icon-tianjiashangpin">添加商品</span>
              </el-menu-item>
              <el-menu-item index="2-3">
                <span class="iconfont icon-tianjiashangpin">添加文章</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <span class="iconfont icon-tianjiashuju">AI Studio</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <span class="iconfont icon-tianjiayonghu">数据集</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="3">
            <span slot="title" class="iconfont icon-dingdan">订单管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title" class="iconfont icon-wenjianguanli">后台文件管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <span slot="title" class="iconfont icon-shezhi">修改资料</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="60px" style="background:#EFF2F7">
          <el-dropdown style="float: right;margin-right: 20px;margin-top: 5px" @command="handleCommand">
            <span class="user-operation" style="display: flex;align-items: center">
              <img src="./../assets/touxiang.png" alt="" style="border-radius: 50%;margin-right: 10px;height: 50px">
              <span>{{nickname}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">您是<span style="color: red"> {{role}}</span></el-dropdown-item>
              <el-dropdown-item command="b" divided>设置</el-dropdown-item>
              <el-dropdown-item command="sign_out">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main style="background:#fff;height: 100%">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import logo from './../view/logo'
  export default {
    components:{
      logo
    },
    data(){
      return{
        nickname: ''
      }
    },
    mounted(){
      let obj =JSON.parse(localStorage.getItem('resData'))
      this.nickname = obj.nickname
      console.log(obj)
    },
    computed:{
      role(){
        let obj=JSON.parse(localStorage.getItem('resData'))
        if (obj.role == 'user'){
          return '普通用户'
        } else {
          return '超级用户'
        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      handleSelect(key, keyPath){
        if(key == "4"){
          this.$router.push({name:"file-manager"})
        }else if (key == "1-1"){
          this.$router.push({name:"list-of-goods",params:{
            a:{sss:'sss'},
            b:2
          }})
        }else if (key == "2-2"){
          this.$router.push({name:"add-goods"})
        }else if (key == "1-2"){
          this.$router.push({name:"list-of-users"})
        }else if (key == "1-3"){
          this.$router.push({name:"list-of-articles"})
        }else if (key == "2-3"){
          this.$router.push({name:"add-articles"})
        }else if (key == "1-4"){
          this.$router.push({name:"list-of-testarticles"})
        }else if (key == "3-1"){
          this.$router.push({name:"dataset-mange"})
        }else {
          alert("还未开发！")
        }
      },
      handleCommand(command) {
        if (command == "sign_out"){
          localStorage.setItem('token','no')
          this.$router.push({path:"/login"})
          this.$message('退出登录')
        }
      },
      goMeetingTea(){
        window.open("http://www.meetingtea.top:8000");                 //在另外新建窗口中打开窗口
      }
    }
  }
</script>
