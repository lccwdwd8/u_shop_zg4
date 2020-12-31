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
        <el-form-item label="上级分类">
          <el-select v-model="user.pid" placeholder="请选择">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in list"
              :value="item.id"
              :label="item.catename"
              :key="item.id"
            ></el-option>
            <!-- 遍历 -->
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="user.catename"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="图片" v-if="user.pid === 0 ? false : true">
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
        <!-- {{ user }} -->
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
import { mapActions, mapGetters } from "vuex";
import { sucalert,warnalert } from "../../../utils/alert";
import { reqcateadd, reqcatedetail, reqcateedit } from "../../../utils/http";
export default {
  props: ["info"],
  // "list"
  data() {
    return {
      imgUrl: "",
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.pid === "") {
          warnalert("上级分类不能为空");
          return;
        }
        if (this.user.catename === "") {
          warnalert("分类名称不能为空");
          return;
        }

        if (!this.user.img) {
          warnalert("未上传图片");
          return;
        }
        resolve();
      });
    },
    ...mapActions({
      reqList: "cate/reqList",
    }),
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    changeImg(e) {
      let file = e.raw;
      //判断
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    add() {
      this.checkProps().then(() => {
        reqcateadd(this.user).then((res) => {
          if (res.data.code === 200) {
            sucalert(res.data.msg);

            this.empty();

            this.cancel();

            // this.$emit("init");
            this.reqList();
          }
        });
      });
    },
    getOne(id) {
      reqcatedetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    update() {
      console.log("!23");
      reqcateedit(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          sucalert(res.data.msg);
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          // this.$emit("init");
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