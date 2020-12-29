<template>
  <div>
    <el-button @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @emit="emit($event)"></v-list>
    <v-add :info="info" @init="init" ref="add" :list="list" :data="data"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import {reqRolelist,reqMenuList} from "../../utils/http"
export default {
  components: {
    vList,
    vAdd,
  },
  data(){
    return{
      //控制页面变量
      info:{
        isshow:false,
        isadd:true
      },
      list:[],
      data:[]
    }
  },
  methods:{
    //刷新界面
    init(){
      reqRolelist().then(res=>{
        console.log(res)

        this.list  = res.data.list
      })
    },
    //编辑
    emit(id){
      this.info.isshow = true
      
      this.info.isadd=false

      console.log(id)

      this.$refs.add.getOne(id)
    },
    //添加
    willAdd(){
      this.info.isshow = true

      this.info.isadd = true
    }
  },

  mounted(){
    this.init()
    reqMenuList().then((res) => {
      if (res.data.code === 200) {
        this.data = res.data.list?res.data.list:[];
      }
    });
  },
};
</script>

<style scoped>
</style>