<template>
  <div>
    <el-container>
      <el-aside width="200px" height="500px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="menu">菜单管理</el-menu-item>
              <el-menu-item index="role">角色管理</el-menu-item>
              <el-menu-item index="manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="cate">商品分类</el-menu-item>
              <el-menu-item index="specs">商品规格</el-menu-item>
              <el-menu-item index="goods">商品管理</el-menu-item>
              <el-menu-item index="member">会员管理</el-menu-item>
              <el-menu-item index="banner">轮播图管理</el-menu-item>
              <el-menu-item index="speckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--头像  -->
      <el-container>
        <el-header>
          <div class="username">
            
            <h4>用户名:{{ username }}</h4>
            <el-button type="info" @click="gologin" size="mini">退出登录</el-button>
          </div>
        </el-header>
        <el-main height="600px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              ><a href="/">{{ $route.name }}</a></el-breadcrumb-item
            >
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    getusername() {
      this.username = JSON.parse(localStorage.getItem("usertitle"));
    },
    gologin(){
      localStorage.clear("usertitle")
      this.$router.push("/login")
    }
  },
  mounted() {
    this.getusername();
  },
};
</script>


<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* height: 100%; */
}
body > .el-container {
  margin-bottom: 40px;
}
.username {
  color: #999;
  float: right;
}
.username h4{
  display: inline;
}
.username .el-button{
  display: inline-block;
}
</style>