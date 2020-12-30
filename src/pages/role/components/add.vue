<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加' : '修改'"
      :visible.sync="info.isshow"
      width="50%"
      height="400px"
      @close="cancel"
    >
      <el-form ref="form" :model="user" label-width="80px" height="600px">
        <el-form-item label="角色名称">
          <el-input v-model="user.rolename"></el-input>
        </el-form-item>
        <el-tree
          :data="data" 
          show-checkbox
          check-on-click-node
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
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
        <!-- {{ user }} -->
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="edit" v-else>修改</el-button>
        <!-- ||||||||||||||||||||||||||| -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import { sucalert } from "../../../utils/alert";
import {
  reqRoleAdd,
  reqRoleinfo,
  reqRoleedit,
  reqMenuList,
} from "../../../utils/http";
export default {
  props: ["info","data"],
  data() {
    return {
      // data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    //在此处将menus转为字符串数组
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
      let arr = this.$refs.tree.getCheckedKeys();
      this.user.menus = JSON.stringify(arr);
    },
    //添加
    add() {
      //先调用将user数组转为数组字符串
     this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())

      reqRoleAdd(this.user).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          sucalert(res.data.msg);

          this.cancel();

          this.empty();

          this.$emit("init");
        }
      });
    },
    //取消
    cancel() {
      console.log(this.info.isadd);
      if (!this.info.isadd) {
        console.log(this.user.menus);
        this.empty();

        this.user.menus = [];
        this.setCheckedKeys();
        console.log(this.user.menus);
      }

      this.info.isshow = false;
    },
    //清空
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([])
    },
    //获取一条数据
    getOne(id) {
      reqRoleinfo({ id: id }).then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          this.user = res.data.list;

          this.user.id = id;

          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        }
      });
    },
    //改树形控件
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys(this.user.menus);
    },
    //确定更新数据
    edit() {
      //将数组转为数组字符串
      this.getCheckedKeys();
      reqRoleedit(this.user).then((res) => {
        if (res.data.code === 200) {
          sucalert(res.data.msg);

          if(this.user.id == this.userInfo.roleid){
            this.changeUser({})
            this.$router.push("/login")
            return
          }

          this.cancel();

          this.$emit("init");
        }
      });
    },
    
  },
  mounted(){
    
  }
};
</script>

<style>
</style>