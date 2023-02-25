<template>
  <div>
    <el-container>
      <el-aside style="width: 270px">
        <!-- <img style="width: 210px" :src="tableData.img" /> -->
        <img style="width: 210px" :src="`/download?url=${tableData.goods_img_url}`" />

        <div class="setting_right" @click.stop="uploadHeadImg">
          <div class="caption">更改图片</div>
        </div>
        <input
          type="file"
          accept="image/*"
          @change="handleFile"
          class="hiddenInput"
        />
      </el-aside>
      <el-main
        style="margin-top: -41px; word-break: break-all; word-wrap: break-word"
      >
        <div style="height: 365px">
          <span
            style="width: 100%;
              /* word-break: break-all;
            word-wrap: break-word;
            margin-left: 20px; */
            "
          >
            <el-form
              :model="tableData"
              ref="tableData"
              :label-position="labelPosition"
              label-width="90px"
              style="margin-left:-20px"
            >
              <el-form-item label="商品名：" prop="goods_name">
                <el-input  style="width: 190px" v-model="tableData.goods_name"> </el-input>
              </el-form-item>
              <el-form-item label="价格：" prop="goods_price">
                <el-input  style="width: 190px" v-model="tableData.goods_price"> </el-input>
              </el-form-item>
              <el-form-item label="分类：" prop="goods_type">
                <select v-model="tableData.goods_type" style="width: 100px" >
                <option selected="selected">请选择：</option>
                <option value="1">手机电脑</option>
                <option value="2">运动健身</option>
                <option value="3">衣服鞋帽</option>
                <option value="4">生活娱乐</option>
                <option value="5">个护美妆</option>
                <option value="6">图书教材</option>
                <option value="7">交通出行</option>
                <option value="8">其他</option>
              </select>
                <!-- <el-input  style="width: 190px" v-model="tableData.goods_type"> </el-input> -->
              </el-form-item>
              <el-form-item label="详细信息：" prop="goods_detail">
                <el-input  style="width: 190px" v-model="tableData.goods_detail" > </el-input>
              </el-form-item>
            </el-form>
            
          </span>
        </div>
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="save">保 存</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // props: { tableData: { type: Object } },
  props: ["tableData"],
  data() {
    return {
      labelPosition:"left",
      uvisible: false,
      userInfo: {
        avatar:
          "https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg",
      },
      options: [
        {
          value: "fenlei1",
          label: "手机电脑",
        },
        {
          value: "fenlei2",
          label: "运动健身",
        },
        {
          value: "fenlei3",
          label: "衣服鞋帽",
        },
        {
          value: "fenlei4",
          label: "生活娱乐",
        },
        {
          value: "fenlei5",
          label: "个护美妆",
        },
        {
          value: "fenlei6",
          label: "图书教材",
        },
        {
          value: "fenlei7",
          label: "交通出行",
        },
        {
          value: "fenlei8",
          label: "其他",
        },
      ],
    };
  },
  methods: {
    async save() {
      let params = {
        "id":this.tableData.id,
        "goods_img_url":this.tableData.goods_img_url,
        "goods_price": this.tableData.goods_price,
        "goods_type": this.tableData.goods_type,
        "goods_name": this.tableData.goods_name,
        "goods_detail": this.tableData.goods_detail,
      };
      axios.post("/edit-goods", params)
        .then((res) => {
          if (res.status == 200 && res.data.errorcode == 0) {
            this.$message({
              message: "编辑成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "编辑失败" + res.data.message,
              type: "error",
            });
          }
        });
        this.$emit("update", this.uvisible);
        this.uvisible = false;
    },
    cancel() {
      this.$emit("update", this.uvisible);
      this.uvisible = false;
    },
    show(obj) {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("ok");
    },
    uploadHeadImg: function () {
      this.$el.querySelector(".hiddenInput").click();
    },
    // 将头像显示
    handleFile: function (e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = (data) => {
        let res = data.target || data.srcElement;
        this.tableData.img = res.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
.img {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin-left: 10px;
}

.input {
  height: 25px;
  margin-left: -50px;
}
.ltitle {
  display: inline-block;
  width: 120px;
  font-size: 15px;
}
.p {
  height: 40px;
  margin-left: 5px;
}
.text-area {
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
  resize: none;
}
.text-area:focus {
  outline: none;
}
select {
  margin-left: 20px;
  height: 34px;
}
</style>
