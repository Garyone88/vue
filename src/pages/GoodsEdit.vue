<template>
  <div class="goodsadd">
    <!-- 按钮 -->
    <el-row type="flex" justify="space-between" class="tools">
      <el-button type="info" @click="handleBack">返回</el-button>
    </el-row>
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择类别">
          <el-option
            v-for="(item,index) in categorys"
            :key="index"
            :label="item.title"
            :value="item.category_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="推荐类型">
        <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
      </el-form-item>
      <el-form-item label="内容标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="form.sub_title"></el-input>
      </el-form-item>
      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8899/admin/article/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
      </el-form-item>
      <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>
      <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-upload
          action="http://localhost:8899/admin/article/uploadimg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handleCardSuccess"
          :on-remove="handleRemove"
          :fileList="form.fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>

      <el-form-item label="内容摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
      </el-form-item>
      <el-form-item label="内容描述">
        <quillEditor v-model="form.content"></quillEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        category_id: "",
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [], //封面图片
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        fileList: [], // 多张图片
        zhaiyao: "",
        content: "",

        is_slide: false
      },
      categorys: [],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    // 提交按钮
    onSubmit() {
      this.$axios({
        url: `http://localhost:8899/admin/goods/edit/${this.$route.params.id}`,
        method: "POST",
        data: this.form,
        withCredentials: true
      }).then(res => {
        console.log(res);
        const { status, message } = res.data;
        if (status === 0) {
          this.$message.success(message);
          this.$router.back();
        } else {
          console.log(this.form);
          this.$router.push("/login");
        }
      });
    },
    // 返回按钮
    handleBack() {
      this.$router.back();
    },

    // 封面图片
    handleAvatarSuccess(res, file) {
      this.form.imgList = [res];
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 图片列表
    handleRemove(file, fileList) {
      const files = fileList.map(v => {
        return v.response;
      });

      this.form.fileList = files;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleCardSuccess(res, file, fileList) {
      const files = fileList.map(v => {
        return v.response;
      });
      this.form.fileList = files;
    }
  },
  mounted() {
    this.$axios({
      url: "http://localhost:8899/admin/category/getlist/goods",
      method: "GET"
    }).then(res => {
      const { status, message } = res.data;
      // 所有的类别数据保存到categorys
      this.categorys = message;
    });
    const { id } = this.$route.params;
    // 请求类别的数据
    this.$axios({
      url: `http://localhost:8899/admin/goods/getgoodsmodel/${id}`,
      method: "GET"
    }).then(res => {
      const { status, message } = res.data;
      this.imageUrl = message.imgList[0].url;
      this.form = {
        ...message,
        // category_id转化为数字
        category_id: +message.category_id,
      };
      console.log(this.form);
      
    });
  },
  components: {
    // 富文本组件
    quillEditor
  }
};
</script>


<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
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