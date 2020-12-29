<template>
  <div>
      <el-button @click="willadd">添加</el-button>
      <v-list @edit="edit($event)" :list="list" @init="init"></v-list>
      <v-add :info="info" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
import {reqbannerlist} from "../../utils/http"
export default {
  components:{
    vList,
    vAdd
  },
  data(){
    return{
      info:{
        isshow:false,
        isadd:true
      },
      list:[]
    }
  },
  methods:{
    willadd(){
      this.info.isshow = true

      this.info.isadd = true
    },
    init(){
      reqbannerlist().then(res=>{
        if(res.data.code===200){
          this.list = res.data.list
        }
      })
    },
    edit(id){
      this.info.isshow = true

      this.info.isadd = false

      this.$refs.add.getone(id)
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style>

</style>