<template>
  <div>
    <el-button @click="willadd">添加</el-button>
    <v-list @edit="edit($event)"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
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
      }
    }
  },
  methods:{
    willadd(){
      this.info.isshow = true

      this.info.isadd = true
    },
    edit(id){
    this.info.isshow = true

    this.info.isadd = false

    this.$refs.add.getone(id)
  }
  },
  
}
</script>

<style>

</style>