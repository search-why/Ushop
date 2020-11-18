<template>
  <div class="role">
    <el-button type="primary" @click="add">添加</el-button>
    <v-table :list="list" @init="init" @edit="edit"></v-table>
    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vTable from "./components/table";
import vForm from "./components/form";
import { reqRoleList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "角色添加",
      },
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
      this.info.isShow = true;
      this.info.title = "角色添加";
    },
    init() {
      reqRoleList().then((res) => {
        this.list = res.data.list;
      });
    },
    edit(id){
      this.info.isShow = true
      this.info.title = "角色编辑"
      this.$refs.form.getOne(id)
    }
  },
  mounted() {
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
</style>