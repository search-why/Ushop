<template>
  <div class="table">
    <el-table :data="list" height="335" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="150"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="roleid" label="所属角色"></el-table-column>
      <el-table-column prop="menus" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reqUserDel} from '../../../utils/http'
import {successAlert} from '../../../utils/alert'
export default {
  data() {
    return {
      
    };
  },
  props: ["list","info"],
  methods: {
    edit(uid){
      this.$emit("edit",uid)
    },
    del(uid){
      reqUserDel(uid).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.$emit("init");
        }
      })
    }
  },
};
</script>

<style>
</style>