<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed" @opened="opened">
      <el-form :model="goods">
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="goods.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="goods.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="120px">
          <el-input v-model="goods.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="goods.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
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
        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="goods.specsid" placeholder="请选择">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="goods.specsattr" placeholder="请选择">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <template>
            <el-radio v-model="goods.isnew" label="1">是</el-radio>
            <el-radio v-model="goods.isnew" label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <template>
            <el-radio v-model="goods.ishot" label="1">是</el-radio>
            <el-radio v-model="goods.ishot" label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="goods.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <!-- 富文本编辑器 -->

          <div v-if="info.isShow" id="edit"></div>
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
import E from "wangeditor";
import { routes } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import { reqGoodsAdd, reqCateDetail, reqCateEdit } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "",
        ishot: "",
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      
    }),
    changeFirst(){
      
    },
    add() {
      reqGoodsAdd(this.goods).then((res) => {
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
    getOne(id) {
      reqCateDetail(id).then((res) => {
        this.goods = res.data.list;
        this.imgUrl = this.$imgPre + this.goods.img;
        this.goods.id = id;
      });
    },
    edit() {
      reqCateEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    // 13.form置空
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
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
    opened() {
      this.editor = new E("#edit");
      this.editor.create();
      // this.editor.txt.html(this.user.description);
    },
  },
  mounted() {
    // 请求一级分类列表
    this.reqCateList();
  },
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