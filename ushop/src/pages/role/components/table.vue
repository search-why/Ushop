<template>
  <div class="table">
    <el-table :data="list" height="400" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="100"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="menus" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqRoleDel } from "../../../utils/http";
import { successAlert,errorAlert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      reqRoleDel(id).then((res) => {
        if (res.data.code == 200) {
          //成功的弹框
          successAlert(res.data.msg);
          //28.通知父组件刷新list
          this.$emit("init");
        }
      });
    },
    edit(id){
        this.$emit("edit",id);
    }
  },
};
</script>

<style>
</style>