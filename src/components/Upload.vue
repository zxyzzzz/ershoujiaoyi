<template>
  <div class="ubc">
    <div class="uploadcontainer">
      <el-button type="primary" class="close" @click="close">
        <i class="el-icon-close"></i>
      </el-button>
      <p class="title">发布商品</p>
      <el-form :model="uploadForm" ref="uploadForm" style="margin-left: 20px">
        <el-container>
          <el-aside style="width: 400px">
            <el-form-item
              label="名称"
              label-width="80px"
              prop="name"
              :rules="[{ required: true, message: '名称不能为空' }]"
            >
              <el-input style="width: 250px"
                v-model="uploadForm.name"></el-input>
            </el-form-item>
            <el-form-item
              label="价格"
              label-width="80px"
              prop="price"
              :rules="[{ required: true, message: '价格不能为空' }]"
            >
              <el-input
                style="width: 250px"
                v-model="uploadForm.price"
              ></el-input>
            </el-form-item>
            <el-form-item label="详细信息" label-width="80px" prop="details">
              <el-input
                style="width: 250px"
                v-model="uploadForm.details"
              ></el-input>
            </el-form-item>
           
            <!-- <el-form-item label="交易地点" label-width="80px" prop="type">
              <el-input
                style="width: 250px"
                v-model="uploadForm.place"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="分类" label-width="80px" prop="type">
              <el-select v-model="uploadForm.type" placeholder="请选择">
                <el-option
                  v-for="item in goodsTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-aside>
          <el-aside>
            <input type="file" ref="goodsImg" style="display:none">
            <el-button @click="selectFile" >选择商品图片</el-button>
            <img :src="goods_img_url_download" />
          </el-aside>
        </el-container>
        <el-form-item>
          <el-button style="margin-left: 300px;" @click="addgoods">
            发布
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import commonUtils from "../utils/commonUtils"

export default {
  data() {
    return {
      uploadForm: {
        price: "",
        type: "",
        name: "",
        details: "",
      },
      fileList:"",
      goodsTypes:[
        {label:"全部商品",name:"0"},
        {label:"手机电脑",name:"1"},
        {label:"运动健身",name:"2"},
        {label:"服饰鞋帽",name:"3"},
        {label:"生活娱乐",name:"4"},
        {label:"个护美妆",name:"5"},
        {label:"图书教材",name:"6"},
        {label:"交通出行",name:"7"}
      ]
    };
  },
  computed:{
    head_img_url_download(){
      // user/book.jpg
      return "/download?url=" +this.goods_img_url;
    }
  },
  methods: {
    selectFile(){
      this.$refs.goodsImg.click();
    },
    async addgoods() {
      let files = this.$refs.goodsImg.files;
      let goods_img_url = "";
      if(files.length>0){
        let url = await commonUtils.upload(files[0],"goods");
        goods_img_url = url;
      }
      let params = {
          "user_no":sessionStorage.getItem("user_no"),
         "goods_name": this.uploadForm.name,
         "goods_status":"0",
          "goods_price": this.uploadForm.price,
          "goods_type":this.uploadForm.type,
          "goods_detail":this.uploadForm.details,
          "goods_img_url":goods_img_url
      }
      this.$router.push({ path: "/" });
      await axios.post('/add-goods',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.$message({
            message: '发布成功',
            type: 'success'
          });
        }else{
          this.$message({
            message: '发布失败'+res.data.message,
            type: 'error'
          });
        }
      })
      .catch(res => {

        this.$message({
            message: '发布失败'+res.response.data.message,
            type: 'error'
          });
        //注册失败
      })
    },
    close() {
      this.$router.push({ path: "/" });
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  },
};
</script>

<style scoped>
.close {
  float: right;
  right: 0;
  border-radius: 0;
}

.title {
  text-align: center;
  font-size: 20px;
  padding-top: 40px;
  color: darkslategrey;
}
.uploadcontainer {
  margin-left: 23%;
  margin-top: 70px;
  margin-bottom: 70px;
  padding-bottom: 50px;
  width: 700px;
  height: auto;
  background-color: white;
}
.u {
  float: right;
  margin-right: 70px;
  margin-top: -190px;
  width: 250px;
  height: 100px;
  border: 1px solid #dedddd;
}
.ubtn {
  margin-left: 80px;
  margin-top: 20px;
}
.ubc {
  background: linear-gradient(to bottom right, rgb(93, 176, 119), white);
  width: 100%;
  height: 100%;
  margin-top: -70px;
  padding-top: 70px;
  padding-bottom: 50px;
  background-size: 100% 100%;
}
select {
  margin-left: 11px;
  height: 30px;
  width: 128px;
}
.el-container {
  margin-top: 50px;
}
.upload-demo{
  width: 250px;
  height: 150px;
  border: 1px solid rgb(171, 170, 170);
}
</style>