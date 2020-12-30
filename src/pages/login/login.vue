<template>
  <div class="login">
    <div class="con">
      <h2 class="center">登录</h2>
      <div class="ipt">
        <el-input
          v-model="user.username"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </div>
      <div class="ipt">
        <el-input
          v-model="user.password"
          placeholder="请输入密码"
          clearable
          show-password
        ></el-input>
      </div>
      <div class="center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import { reqUserLogin } from "../../utils/http";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    login() {
      reqUserLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          this.changeUser(res.data.list)
          
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 500px;
  height: 500px;
  text-align: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
}
.el-button--primary {
  width: 100%;
}
</style>