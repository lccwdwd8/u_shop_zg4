<template>
  <div>
    <el-button @click="willAdd">添加</el-button>
    <v-list :list="list" @edit="edit($event)" @init="init"></v-list>
    <v-add :info="info" @init="init" ref="add"></v-add>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import vList from "./components/list"; 
import vAdd from "./components/add";
import { reqUserCount, reqUserList } from "../../utils/http";
import { sucalert } from "../../utils/alert";
export default {
  components: {
    vList,
    vAdd,
  },
  //数据
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
      total: 0,
      page: 1,
      pageSize: 2,
    };
  },
  //方法
  methods: {
    changePage(e) {
      this.page = e;

      this.getUserlist();
    },
    willAdd() {
      this.info.isshow = true;

      this.info.isadd = true;
    },
    init() {
      // console.log("666")
      this.getuserCount();

      this.getUserlist();
    },
    getUserlist() {
      reqUserList({ page: this.page, size: this.pageSize }).then((res) => {
        if (res.data.code === 200) {
          if (!res.data.list && this.page > 1) {
            this.page--;
            this.getUserlist();
            return;
          }

          this.list = res.data.list;
        }
      });
    },
    getuserCount() {
      reqUserCount().then((res) => {
        if (res.data.code === 200) {
          this.total = res.data.list[0].total;

          // console.log(this.total);
        }
      });
    },
    edit(id) {
      this.info.isshow = true;

      this.info.isadd = false;
      this.$refs.add.getone(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>