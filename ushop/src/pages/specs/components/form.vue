<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="specs">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="specs.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index===0" @click="addAttr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="specs.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='规格添加'">确 定</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate,
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      specs: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [{ value: "" }],
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount:"specs/reqCount",
    }),
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    cancel() {
      this.info.isShow = false;
    },
    add() {
      this.specs.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsAdd(this.specs).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
          this.reqCount()
        }
      });
    },
    getOne(id) {
      reqSpecsDetail(id).then((res) => {
        console.log(res);
        this.specs = res.data.list[0];
        //  '["s","M"]'-->[{value:"s"},{value:"M"}]
        this.attrArr = JSON.parse(this.specs.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    empty() {
      this.specs = {
        specsname: "",
        attrs: [],
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    update() {
      this.specs.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsUpdate(this.specs).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "规格编辑") {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.el-button {
  margin: 0;
}
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>