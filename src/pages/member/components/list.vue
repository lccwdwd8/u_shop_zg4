<template>
  <div>
    <el-table :data="list" style="width: 100%"  height="600px">
      <el-table-column prop="id" label="会员编号"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template> 

<script>
import { sucalert } from "../../../utils/alert";
export default {
  props:["list"],
  methods:{
    edit(id){
      this.$emit("edit",id)
    },
  }
};
</script>

<style>
</style>