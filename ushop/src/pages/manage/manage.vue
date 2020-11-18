<template>
  <div class="manage">
    <el-button type="primary" @click="add">添加</el-button>

    <v-table :list="list" @init="newInit" @edit="edit"></v-table>

    <v-form :info="info" ref="form" @init="newInit"></v-form>

    <!-- total：总条数
    page-size:一页的数量
    current-change:当前页码发生了修改，会触发，回调函数的参数就是新的页码-->
    <el-pagination
      background
      @current-change="changePage"
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :page-count="page"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vTable from "./components/table";
import vForm from "./components/form";
import { reqUserList, reqUserCount } from "../../utils/http";
import { successAlert } from "../../utils/alert";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "管理员添加",
      },
      list: [],
      total: 3,
      size: 3,
      page: 1,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
      this.info.isShow = true;
      this.info.title = "管理员添加";
    },
    newInit(){
      this.init()
      this.getCount()
    },
    init() {
      reqUserList({ size: this.size, page: this.page }).then((res) => {
        if (res.data.code == 200) {
          let list = res.data.list ? res.data.list : [];

          // 56.如果取到的list是[],并且page>1,page自减，请列表
          if (list.length === 0 && this.page > 1) {
            this.page--;
            this.init();
            return;
          }
          this.list = list;
        }
      });
    },
    changePage(page) {
      this.page = page;
      this.init();
    },
    edit(uid) {
      this.info.isShow = true;
      this.info.title = "管理员修改";
      this.$refs.form.getOne(uid);
    },
    getCount() {
      reqUserCount().then((res) => {
        this.total = res.data.list[0].total;
        this.page = parseInt(this.total / this.size) + 1;
      });
    },
  },
  mounted() {
    this.getCount();
    this.init();
  },
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
.el-pagination{
  margin-top: 10px;
  text-align: right;
}
</style>