<template>
  <div>
    <el-button  @click="willadd">添加</el-button>
    <v-list :list="list" @init="init" @emit="emit($event)"></v-list>
    <v-add :info="info" @init="init" :list="list" ref='add'></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
import {reqMenuList} from "../../utils/http"
export default {
  components:{
    vList,
    vAdd
  },
  data(){
    return{
      info:{
        isshow:false,
        isadd:true,
      },
      list:[]
    }
  },
  methods:{
    init(){
      reqMenuList().then(res=>{
        console.log(res)
        if(res.data.code === 200){
          this.list = res.data.list
        }
      })
    },
    emit(id){

      this.info.isshow = true
      
      this.info.isadd = false
       
      this.$refs.add.getOne(id)
    },
    willadd(){
      this.info.isshow = true

      this.info.isadd = true
    }

  },
  mounted(){
    this.init()
  }
}
</script>

<style scoped>

</style>