<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option v-for="item in role" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='管理员添加'">确 定</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqUserAdd,
  reqRoleList,
  reqUserDetail,
  reqUserUpdate,
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        uid: "",
        username: "",
        password: "",
        roleid: "",
        status: 1,
      },
      role: [],
    };
  },
  methods: {
    cancel() {
      this.info.isShow = false;
    },
    add() {
      reqUserAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.$emit("init");
          this.empty();
        }
      });
    },
    getOne(uid) {
      reqUserDetail(uid).then((res) => {
        this.user = res.data.list;
        this.user.password = "";
      });
    },
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    update() {
      reqUserUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "管理员编辑") {
        this.empty();
      }
    },
  },
  mounted() {
    reqRoleList().then((res) => {
      this.role = res.data.list;
    });
  },
};
</script>

<style>
</style>