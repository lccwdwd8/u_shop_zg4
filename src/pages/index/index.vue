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
          <!-- ------------- -->
          <div v-for="item in user.menus" :key="item.id">
            <el-menu-item v-if="!item.children" :index="item.url">
              {{ item.title }}
            </el-menu-item>
            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </div>
          <!-- -------------------- -->
        </el-menu>
      </el-aside>
      <!--头像  -->
      <el-container>
        <el-header>
          <div class="username">
            <h4>用户名:{{ user.username }}</h4>
            <el-button type="info" @click="gologin" size="mini"
              >退出登录</el-button
            >
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: [],
    };
  },
  methods: {
    ...mapActions({
      changUser: "changeUser",
    }),
    getusername() {
      this.user = JSON.parse(sessionStorage.getItem("userInfo"));
    },
    gologin() {
      this.changUser({});

      this.$router.push("/login");
    },
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
.username h4 {
  display: inline;
}
.username .el-button {
  display: inline-block;
}
</style>