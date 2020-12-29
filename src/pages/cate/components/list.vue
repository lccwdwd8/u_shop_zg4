<template>
  <div>
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        height="600px"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="id" label="分类编号" width="180">
        </el-table-column>
        <el-table-column prop="catename" label="分类名称" width="180">
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img
              v-if="scope.row.img !== 'null'"
              :src="$pre + scope.row.img"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button type="primary" v-if="scope.row.status === 1"
              >启用</el-button
            >
            <el-button type="info" v-if="scope.row.status === 2"
              >禁用</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <!-- 删除 -->
            <!-- @click="del(scope.row.id)" -->
            <del-btn @confirm="del(scope.row.id)"></del-btn>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { sucalert } from "../../../utils/alert";
import { reqcatedel } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
export default {
  //   props: ["list"],
  computed: {
    ...mapGetters({
      "list":"cate/list"
    })
  },
  methods: {
    ...mapActions({
      "reqList":"cate/reqList"
    }),
    edit(id) {
      //通知父组件有人点了编辑按钮
      this.$emit("edit", id);
    },
    del(id) {
      reqcatedel({ id: id }).then((res) => {
        if (res.data.code === 200) {
          sucalert(res.data.msg);
          this.reqList() 
        //   this.$emit("init");
        }
      });
    },
  },
  mounted(){
    this.reqList()
  }
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;

}
</style>