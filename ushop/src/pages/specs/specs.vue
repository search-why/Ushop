<template>
  <div class="manage">
    <el-button type="primary" @click="add">添加</el-button>

    <v-table @edit="edit"></v-table>

    <v-form :info="info" ref="form"></v-form>

    <!-- total：总条数
    page-size:一页的数量
    current-change:当前页码发生了修改，会触发，回调函数的参数就是新的页码-->
    <el-pagination
      background
      @current-change="reqPage"
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vTable from "./components/table";
import vForm from "./components/form";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "规格添加",
      },
    };
  },
  computed: {
    ...mapGetters({
      total: "specs/total",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqPage: "specs/reqPage",
    }),
    add() {
      this.info.isShow = true;
      this.info.title = "规格添加";
    },
    edit(id) {
      this.info.isShow = true;
      this.info.title = "规格修改";
      this.$refs.form.getOne(id);
    },
  },
  mounted() {},
  components: {
    vTable,
    vForm,
  },
};
</script>

<style>
.el-button {
  margin: 20px 0 10px;
}
.el-pagination {
  margin-top: 10px;
  text-align: right;
}
</style>