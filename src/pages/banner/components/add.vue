<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加' : '修改'"
      :visible.sync="info.isshow"
      width="50%"
      height="400px"
      @closed="cancel"
    >
      <el-form ref="form" :model="user" label-width="80px" height="600px">
        <el-form-item label="标题">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--  -->
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
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
        <!-- ||||||||||||||||||||||||||| -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { sucalert } from "../../../utils/alert";
import {
  reqbanneradd,
  reqbannerinfo,
  reqbanneredit,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      user: {
        title: "",
        status: 1,
        img: null,
      },
    };
  },
  methods: {
    //改变图片路径时触发
    changeImg(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    //添加
    add() {
      reqbanneradd(this.user).then((res) => {
        if (res.data.code === 200) {
          sucalert(res.data.msg);

          this.empty();

          this.cancel();

          this.$emit("init");
        }
      });
    },
    //修改
    update() {
      reqbanneredit(this.user).then((res) => {
        if (res.data.code === 200) {
          sucalert(res.data.msg);

        //   this.empty();

          this.cancel();

          this.$emit("init");
        }
      });
    },
    cancel() {
        console.log(this.info.isadd)
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.imgUrl = "";
      this.user = {
        title: "",
        status: 1,
        img: null,
      };
    },
    getone(id) {
      reqbannerinfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;

          this.user.id = id;

          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.form>>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>