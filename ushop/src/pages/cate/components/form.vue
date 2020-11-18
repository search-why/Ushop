<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='商品分类添加'">确 定</el-button>
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { routes } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import { reqCateAdd,reqCateDetail,reqCateEdit } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      form: {
        pid: "",
        img: null,
        catename: "",
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list"
    })
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    }),
    add() {
      console.log(1111);
      reqCateAdd(this.form).then(res => {
        console.log(3333);
        if (res.data.code === 200) {
          //弹个成功
          successAlert(res.data.msg);
          //弹框消失
          this.cancel();
          //form置空
          this.empty();
          //24.通知menu刷新列表数据
          this.reqList();
        }
      });
    },
    getOne(id){
      reqCateDetail(id).then(res=>{
        this.form = res.data.list;
        this.imgUrl = this.$imgPre + this.form.img
        this.form.id = id
      })
    },
    edit(){
      reqCateEdit(this.form).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.cancel();
          this.empty();
          this.reqList()
        }
      })
    },
    // 13.form置空
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
    },
    cancel() {
      this.info.isShow = false;
    },
    //38.弹框消失
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "商品分类编辑") {
        this.empty();
      }
    },
    changeFile(e) {
      console.log(e);
      let file = e.raw;

      this.imgUrl = URL.createObjectURL(file);

      this.form.img = file;
    },
  },
  mounted() {
    //   12.一进来，先获取菜单列表数据
    this.reqList()
  }
};
</script>

<style scoped lang="stylus">
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}

.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}

.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

.form >>> .el-upload {
  border: 1px dashed #ccc !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>