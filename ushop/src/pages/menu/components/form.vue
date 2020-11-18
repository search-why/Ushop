<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item v-if="form.type==1" label="菜单图标" label-width="120px">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in logo" :key="item" :label="item" :value="item">
              <i :class="item">{{item}}</i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址" label-width="120px">
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 10.遍历routes -->
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name+'--/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='菜单添加'">确 定</el-button>
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { routes } from "../../../router/index";
import { reqMenuAdd, reqMenuUpdate, reqMenuDetail } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      routes: routes,
      form: {
        title: "",
        pid: "",
        type: "",
        url: "",
        icon: "",
        status: 1,
      },
      logo: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation",
      ],
    };
  },
  props: ["info", "list"],
  methods: {
    add() {
      reqMenuAdd(this.form).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          //弹个成功
          successAlert(res.data.msg);
          //弹框消失
          this.cancel();
          //form置空
          this.empty();
          //24.通知menu刷新列表数据
          this.$emit("init");
        }
      });
    },
    // 13.form置空
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    cancel() {
      this.info.isShow = false;
    },
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    edit() {
      reqMenuUpdate(this.form)
        .then((res) => {
          if (res.data.code === 200) {
            //成功弹框
            successAlert("修改成功");
            //弹框消失
            this.cancel();
            //form重置
            this.empty();
            //列表刷新
            this.$emit("init");
          }
        });
    },
    getOne(id) {
      reqMenuDetail(id).then((res) => {
        //此时form上是没有id的
        this.form = res.data.list;
        //补id
        this.form.id = id;
      });
    },
    //38.弹框消失
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "菜单编辑") {
        this.empty();
      }
    },
  },
};
</script>

<style>
</style>