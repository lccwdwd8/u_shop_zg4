<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      height="500px"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="type" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-if="scope.row.status === 2">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
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
  </div>
</template>
<script>
import { sucalert } from "../../../utils/alert";
import { reqMenuDel } from "../../../utils/http";
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
        reqMenuDel({ id: id }).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            //成功后的提示
            sucalert();
            //刷新界面
            this.$emit("init");
          }
        });
      });
    },
    emit(id) {
      this.$emit("emit", id);
    },
  },
};
</script>