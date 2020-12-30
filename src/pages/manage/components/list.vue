<template>
  <div>
    <el-table :data="list" style="width: 100%" >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-if="scope.row.status === 2">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template> 
      </el-table-column>
    </el-table>
  </div>
</template> 

<script>
import { sucalert } from "../../../utils/alert";
import {reqManageDel} from "../../../utils/http"
export default {
  props:["list"],
  methods:{
    edit(id){
      this.$emit("edit",id)
    },
    del(id){
      reqManageDel({uid:id}).then(res=>{
        if(res.data.code === 200){
          sucalert(res.data.msg)


          this.$emit("init")
        }
      })
    }
  }
};
</script>

<style>
</style>