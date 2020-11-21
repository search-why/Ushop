<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed" @opened="opened">
      <el-form :model="goods" :rules="rules">
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="goods.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="goods.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondId"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="120px" prop="price">
          <el-input v-model="goods.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px" prop="market_price">
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
        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <el-select v-model="goods.specsid" placeholder="请选择" @change="changespecs">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select v-model="goods.specsattr" placeholder="请选择" multiple>
            <el-option v-for="item in attrList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <template>
            <el-radio v-model="goods.isnew" :label="1">是</el-radio>
            <el-radio v-model="goods.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <template>
            <el-radio v-model="goods.ishot" :label="1">是</el-radio>
            <el-radio v-model="goods.ishot" :label="2">否</el-radio>
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
import {
  reqGoodsAdd,
  reqCateList,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "change" },
        ],
        specsattr: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个规格属性",
            trigger: "change",
          },
        ],
      },
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl: "",
      // 二级菜单
      secondId: [],
      // 规格属性列表
      attrList: [],
      attrArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  props: ["info"],
  methods: {
    ...mapActions({
      // store里面的reqList函数
      reqcateList: "cate/reqList",
      reqspecsList: "specs/reqList",
      reqGoodsList: "goods/reqList",
      reqGoodsCount: "goods/reqCount",
    }),
    changeFirst() {
      this.goods.second_cateid = "";
      this.getSecondId();
    },
    changespecs() {
      // 获取商品规格的属性
      this.goods.specsattr = [];
      this.getSpecs();
    },
    // 获取二级菜单
    getSecondId() {
      // http里面的reqCateList函数
      reqCateList({ pid: this.goods.first_cateid }).then((res) => {
        console.log(res);
        this.secondId = res.data.list;
      });
    },
    getSpecs() {
      let obj = this.specsList.find((item) => item.id === this.goods.specsid);
      this.attrList = obj.attrs;
    },
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除商品属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    //验证
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.goods.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.goods.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.goods.goodsname === "") {
          errorAlert("商品名称为空");
          return;
        }
        if (this.goods.price === "") {
          errorAlert("商品价格为空");
          return;
        }
        if (this.goods.market_price === "") {
          errorAlert("商品市场价格为空");
          return;
        }
        if (!this.goods.img) {
          errorAlert("请选择图片");
          return;
        }
        if (this.goods.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.goods.specsattr.length === 0) {
          errorAlert("请选择商品属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        this.goods.description = this.editor.txt.text();
        reqGoodsAdd(this.goods).then((res) => {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqGoodsList();
          this.reqGoodsCount();
        });
      });
    },
    getOne(id) {
      reqGoodsDetail(id).then((res) => {
        this.goods = res.data.list;
        this.goods.id = id;
        this.getSecondId();
        this.imgUrl = this.$imgPre + this.goods.img;
        this.goods.specsattr = this.goods.specsattr.split(",");
        this.getSpecs();
        if (this.editor) {
          this.editor.txt.html(this.goods.description);
        }
      });
    },
    edit() {
      this.check().then(() => {
        reqGoodsUpdate(this.goods).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqGoodsList();
          }
        });
      });
    },
    // 13.form置空
    empty() {
      this.goods = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.secondCateList = [];
      //图片临时地址
      this.imgUrl = "";
      //规格属性list
      this.attrsList = [];
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
      // console.log(e);
      let file = e.raw;

      this.imgUrl = URL.createObjectURL(file);

      this.goods.img = file;
    },
    opened() {
      this.editor = new E("#edit");
      this.editor.create();
      this.editor.txt.html(this.goods.description);
    },
  },
  mounted() {
    // 请求一级分类列表
    this.reqcateList();
    // 请求规格属性
    this.reqspecsList(true);
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