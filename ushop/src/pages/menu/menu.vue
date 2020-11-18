<template>
  <div class="menu">
      <el-button type="primary" @click="willAdd">添加</el-button>

      <v-table :info="info" :list="list" @init="init" @edit="edit($event)"></v-table>

      <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from './components/form'
import vTable from './components/table'
import { reqMenuList } from '../../utils/http'
export default {
  data() {
    return {
      info: {
         isShow: false,
         title: '菜单添加'
      },
      list: []
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd(){
      this.info.isShow = true;
      this.info.title = '菜单添加'
    },
    init(){
      reqMenuList().then((res)=>{
          // console.log(res.data.list);
          this.list = res.data.list
      })
    },
    edit(id){
      this.info.isShow = true
      this.info.title = '菜单编辑'
      this.$refs.form.getOne(id)
    }
  },
  components: {
    vForm,
    vTable
  },
  mounted() {
    this.init()
  }
};
</script>

<style>
.el-button{
  margin: 20px 0 10px;
}
</style>