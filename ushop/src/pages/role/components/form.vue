<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='角色添加'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleAdd,
  reqMenuList,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      menuList: [],
    };
  },
  methods: {
    add() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.user).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    cancel() {
      this.info.isShow = false;
    },
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        this.user = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        this.user.id = id;
      });
    },
    update() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    closed() {
      if (this.info.title === "角色编辑") {
        this.empty();
      }
    },
  },
  mounted() {
    reqMenuList().then((res) => {
      this.menuList = res.data.list;
    });
  },
};
</script>

<style>
</style>