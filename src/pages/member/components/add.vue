<template>
  <div>
    <el-dialog
      title="修改"
      :visible.sync="info.isshow"
      width="70%"
      center
      @closed="cancel"
    >
      <el-form ref="form" :model="user" label-width="80px" height="600px">
        <el-form-item label="手机号">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <!-- ------!!看页面数据!!----- -->
        <!-- <el-button @click="getCheckedKeys">通过 key 获取</el-button> -->
        <el-form-item label="状态">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- ||||||||||||看页面数据||||||||||| -->
        <!-- 页面user -->
        {{ user }}
        <el-button type="primary" @click="edit">修改</el-button>
        <!-- ||||||||||||||||||||||||||| -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { sucalert } from "../../../utils/alert";
import { reqmemeedit, reqmemeinfo } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    getone(id) {
      reqmemeinfo({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;

          this.user.password = "";
        }
      });
    },
    edit() {
      if (!this.user.password) {
        this.$message({
          message: "未填写密码",
          type: "warning",
        });
        return;
      }
      reqmemeedit(this.user).then((res) => {
        if (res.data.code === 200) {
          sucalert(res.data.msg);

          this.cancel();

          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>