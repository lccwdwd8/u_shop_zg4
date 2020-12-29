<template>
  <div>
    <template>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="角色编号" width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="状态">
           <template slot-scope="scope">
            <!-- 编辑 -->
             <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-if="scope.row.status===2">禁用</el-button>
         </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              @click="emit(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del(scope.row.id)"
            ></el-button
          ></template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { reqRoledel } from "../../../utils/http";
import { sucalert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(id);
        reqRoledel({ id: id }).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            sucalert(res.data.msg);

            this.$emit("init");
          }
        });
      });
    },
    //通知首页 编辑
    emit(id){
      this.$emit("emit",id)
    }
  },
};
</script>

<style>
</style>