<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
      @closed="cancel"
      @opened="opened"
    >
      <!-- 2.v-model绑定user -->
      <el-form :model="user">
        <!-- <div>user:{{ user }}</div> -->
        <!-- top1 -->
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
          <el-select v-model="user.second_cateid">
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
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeImg"
            />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecsId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in showSpecsAttr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor"></div>
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
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { sucalert, warnalert } from "../../../utils/alert";
import {
  reqcatelist,
  reqspecslist,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl: "",
      //-----------------
      secondCateList: [],
      //-----------------
      showSpecsAttr: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    //封装的验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.first_cateid === "") {
          warnalert("一级分类不能为空");
          return;
        }

        if (this.user.second_cateid === "") {
          warnalert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname === "") {
          warnalert("商品名称不能为空");
          return;
        }

        if (this.user.price === "") {
          warnalert("商品价格不能为空");
          return;
        }

        if (this.user.market_price === "") {
          warnalert("商品市场价格不能为空");
          return;
        }

        if (!this.user.img) {
          warnalert("请上传图片");
          return;
        }
        if (this.user.specsid === "") {
          warnalert("商品规格不能为空");
          return;
        }

        if (this.user.specsattr.length === 0) {
          warnalert("请选择规格属性");
          return;
        }
        if (this.editor.txt.html() == "") {
          warnalert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
    }),
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqcatelist({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code === 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    changeSpecsId() {
      this.user.specsattr = [];

      this.getShowSpecsAttr();
    },
    getShowSpecsAttr() {
      let obj = this.specsList.find((item) => item.id == this.user.specsid);
      this.showSpecsAttr = obj ? obj.attrs : [];
    },

    changeImg(e) {
      let file = e.target.files[0];

      this.imgUrl = URL.createObjectURL(file);

      this.user.img = file;
    },
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    opened() {
      this.editor = new E("#editor");

      this.editor.create();

      this.editor.txt.html(this.user.description);
    },
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      //-----------------
      this.secondCateList = [];
      //-----------------
      this.showSpecsAttr = [];
    },
    add() {
      this.checkProps().then(() => {
        this.user.description = this.editor.txt.html();

        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };

        reqgoodsAdd(data).then((res) => {
          if (res.data.code === 200) {
            sucalert(res.data.msg);

            this.empty();

            this.cancel();

            this.reqList();

            this.reqTotal();
          }
        });
      });
    },
    getone(id) {
      reqgoodsDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;

          this.getSecondList();

          this.imgUrl = this.$pre + this.user.img;

          this.getShowSpecsAttr();

          this.user.specsattr = JSON.parse(this.user.specsattr);
          this.user.id = id;

          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    update() {
      this.checkProps().then(() => {
        this.user.description = this.editor.txt.html();

        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        reqgoodsUpdate(data).then((res) => {
          if (res.data.code === 200) {
            this.cancel();

            this.empty();

            sucalert(res.data.msg);

            this.reqList();
          }
        });
      });
    },
  },

  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
    this.reqSpecsList(true);
  },
};
</script>

<style scoped>
/* 原生js的样式 */
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>