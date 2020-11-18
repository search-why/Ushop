<template>
  <div class="table">
    <el-table :data="list" height="335" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="150"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="roleid" label="规格属性">
        <template slot-scope="scope">
            <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
          </template>
      </el-table-column>
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
import { mapGetters, mapActions } from "vuex";
import {reqSpecsDel} from '../../../utils/http'
import {successAlert} from '../../../utils/alert'
export default {
   computed: {
    ...mapGetters({
      list: "specs/list",
    })
  },
  data() {
    return {

    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqList: 'specs/reqList',
      reqCount: 'specs/reqCount',
    }),
    edit(id){
      this.$emit("edit",id)
    },
    del(id){
      reqSpecsDel(id).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.reqList();
          this.reqCount();
        }
      })
    }
  },
  mounted() {
    this.reqList();
    this.reqCount()
  },
};
</script>

<style>
</style>