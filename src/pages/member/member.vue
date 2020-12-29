<template>
  <div>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import { reqmemlist } from "../../utils/http";
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
      },
      list: [],
    };
  },
  methods: {
    init() {
      reqmemlist().then((res) => {
        if (res.data.code === 200) {
          console.log(this.list)
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;

      this.$refs.add.getone(id)
    },
  },
  mounted(){
    this.init()
  }
};
</script>

<style>
</style>