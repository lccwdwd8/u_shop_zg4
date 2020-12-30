<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <!-- 2.v-model绑定user -->
      <el-form :model="user">
        <!-- <div>user:{{ user }}</div> -->
        <div>value1:{{ value }}</div>
        <!-- top1 -->
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px"
          ><el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          >
          </el-date-picker
        ></el-form-item>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeSpecsId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in goodsidatr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import { sucalert } from "../../../utils/alert";
import {
  reqcatelist,
  reqgoodslist,
  speckilladd,
  speckinfo,
  speckedit,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      //-----------------
      secondCateList: [],
      //-----------------
      goodsidatr: [],
      value: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    //
    ...mapActions({
      reqCateList: "cate/reqList",
    }),
    // 改变一级分类时
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.user.goodsid = "";

      this.getSecondList();
    },
    //
    getSecondList() {
      reqcatelist({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code === 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    // 改变二级分类时
    changeSpecsId() {
      this.user.goodsid = "";
      reqgoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        if (res.data.code === 200) {
          this.goodsidatr = res.data.list;
        }
      });
    },
    getShowSpecsAttr() {},
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      //-----------------
      this.secondCateList = [];
      //-----------------
      this.showSpecsAttr = [];

      this.value = [];
    },
    add() {
      this.user.begintime = this.value[0];

      this.user.endtime = this.value[1];

      speckilladd(this.user).then((res) => {
        if (res.data.code === 200) {
          sucalert(res.data.msg);

          this.empty();

          this.cancel();

          this.$emit("init");
        }
      });
    },
    getone(id) {
      speckinfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;

          this.value[0] = this.user.begintime - 0;

          this.value[1] = this.user.endtime - 0;

          this.value = this.value.slice(0, 2);

          this.user.id = id;
        }
      });
    },
    update() {
      this.user.begintime = this.value[0];

      this.user.endtime = this.value[1];

      speckedit(this.user).then((res) => {
        if (res.data.code === 200) {
          sucalert(res.data.msg);

          this.empty();
          this.cancel();
          this.$emit("init");
        }
      });
    },
  },

  mounted() {
    this.reqCateList();
  },
};
</script>

<style scoped>
</style>