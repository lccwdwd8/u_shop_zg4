<template>
  <div>
    <el-dialog
      :title="info.isadd ? '管理员添加' : '管理员修改'"
      :visible.sync="info.isshow"
      width="70%"
      center
      @closed="cancel"
    >
      <el-form ref="form" :model="user" label-width="80px" height="600px">
        <el-form-item label="所属角色">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in role"
              :key="item.id"
              :label="item.rolename" 
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
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
        <el-button v-if="info.isadd" @click="add">添加</el-button>
        <el-button type="primary" v-else @click="edit">修改</el-button>
        <!-- ||||||||||||||||||||||||||| -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { sucalert } from "../../../utils/alert";
import { reqRolelist, reqUserAdd,reqUserInfo,reqUseradit } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      role: [],
    };
  },
  methods: {
    cancel() {
      if(!this.info.isadd){
        this.empty()
      }
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
    add() {
      reqUserAdd(this.user).then((res) => {
        if (res.data.code === 200) {
          sucalert(res.data.msg);

          this.empty()

          this.cancel()

          this.$emit("init")
        }
      });
    },
    getone(id){
      reqUserInfo({uid:id}).then(res=>{
        if(res.data.code ===200){
          this.user  = res.data.list

          this.user.password = ""
        }
      })
    },
    edit(){
      // console.log(this.user)
        reqUseradit(this.user).then(res=>{
            if(res.data.code ===200){
              sucalert(res.data.msg)

              this.cancel()

              this.$emit("init")
            }
        })
    }
  },
  mounted() {
    reqRolelist().then((res) => {
      if (res.data.code === 200) {
        this.role = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>