<template>
  <div>
    <el-button @click="willAdd">添加</el-button>

    <v-list  @edit="edit($event)"></v-list>

    <v-add :info="info"  ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
// import { reqcatelist } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;

      this.info.isadd = true;
    },
    edit(id) {
      console.log(id);

      this.info.isshow = true

      this.info.isadd = false

      this.$refs.add.getOne(id);
    },
 
  },
  mounted() {
  },
};
</script>

<style>
</style>