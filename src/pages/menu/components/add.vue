<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加菜单' : '修改菜单'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="菜单名称">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- s上级菜单 -->
        <el-form-item label="上级菜单">
          <el-select v-model="user.pid" @change="changeType">
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option v-for="item in list" :key="item.id" :value="item.id">{{
              item.title
            }}</el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型">
          <el-radio v-model="user.type" :label="1" :disabled="true"
            >目录</el-radio
          >
          <el-radio v-model="user.type" :label="2" :disabled="true"
            >菜单</el-radio
          >
        </el-form-item>
        <el-form-item label="菜单图标" v-if="user.type === 1">
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-if="user.type === 2">
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name + '-/' + item.path"
            >
              <!-- {{item.name}}--{{item.path}} -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 查看user中的各项 -->
        <!-- {{ user }} -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="edit" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sucalert, warnalert } from "../../../utils/alert";
import { reqMenuAdd, reqMenuDetail, initMenuList } from "../../../utils/http";
import { indexRouters } from "../../../router";
export default {
  props: ["info", "list"],
  data() {
    return {
      isshow: true,
      user: {
        pid: 0,
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      indexRouters,
    };
  },
  methods: {
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.title === "") {
          warnalert("菜单名称不能为空");
          return;
        }

        if (this.user.icon === "" && this.user.url === "") {
          warnalert("请选择菜单名称或地址");
          return;
        }
        resolve();
      });
    },
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        pid: 0,
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      };
    },
    add() {
      this.checkProps().then(() => {
        reqMenuAdd(this.user).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            //弹出提示
            sucalert(res.data.msg);

            this.cancel();

            this.empty();

            this.$emit("init");
          }
        });
      });
    },
    changeType() {
      if (this.user.pid === 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    getOne(id) {
      reqMenuDetail({ id: id }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.user = res.data.list;

          this.user.id = id;
        }
      });
    },
    edit() {
      this.checkProps().then(() => {
        initMenuList(this.user).then((res) => {
          if (res.data.code === 200) {
            sucalert(res.data.msg);

            this.cancel();

            this.empty();

            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style>
</style>