<template>
  <div class="containerzhuce">
    <div class="zhuce">
      <el-button type="primary" class="close" @click="close">
        <i class="el-icon-close"></i>
      </el-button>
      <p id="title">注册</p>
      <el-form
        :model="LoginForm"
        ref="LoginForm"
        :label-position="labelPosition"
        label-width="120px"
        style="margin-left: 30px"
      >
        <el-form-item  label="头像">
          <el-upload
            style="
              width: 100px;
              height: 100px;
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
            "
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="name"
          :rules="[{ required: true, message: '用户名不能为空' }]"
        >
          <el-input style="width: 250px" v-model="LoginForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="学号"
          prop="id"
          :rules="[{ required: true, message: '学号不能为空' }]"
        >
          <el-input style="width: 250px" v-model="LoginForm.id"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            style="width: 250px"
            v-model="LoginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
       
        <el-form-item
          label="电话号码"
          prop="tel"
          :rules="[{ required: true, message: '电话号码不能为空' }]"
        >
          <el-input
            style="width: 250px"
            v-model="LoginForm.tel"
            type="tel"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="regist" style="margin-left: 80px"
            >点击注册</el-button
          >
        </el-form-item>
        <el-button
          type="text"
          style="float: right; padding-right: 20px"
          @click="login"
          >已有账号，去登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      imageUrl: "",
      labelPosition: "left",
      LoginForm: {
        name: "",
        password: "",
        id: "",
        tel: "",
      },
    };
  },
  methods: {
    async regist() {
    
      let params = {
        "user_name":this.LoginForm.name,
        "user_no":this.LoginForm.id,
        "password":this.LoginForm.password,
        "tel":this.LoginForm.tel
      }
      axios.post('/register',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          this.$router.push({ path: "/" });
        }else{
          this.$message({
            message: '注册失败'+res.data.message,
            type: 'error'
          });
        }
      })
      .catch(res => {

        this.$message({
            message: '注册失败'+res.response.data.message,
            type: 'error'
          });
        //注册失败
      })
    },
    close() {
      this.$router.push({ path: "/" });
    },
    login() {
      this.$router.push({ path: "/denglu" });
    },
    handleAvatarSuccess(res, file) {
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
  },
};
</script>

<style scoped>
.containerzhuce {
  background: linear-gradient(to bottom right, rgb(93, 176, 119), white);
  width: 100%;
  height: 100%;
  margin-top: -70px;
  padding-top: 50px;
  padding-bottom: 50px;
  background-size: 100% 100%;
}
.zhuce {
  margin-left: 30%;
  margin-top: 70px;
  width: 550px;
  height: auto;
  margin-bottom: 70px;
  padding-bottom: 50px;
  background-color: white;
}
.close {
  float: right;
  right: 0;
  border-radius: 0;
}
#title {
  text-align: center;
  font-size: 20px;
  padding-top: 50px;
  color: darkslategrey;
}
.el-icon-plus {
  font-size: 25px;
  padding-left: 35px;
  padding-top: 35px;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>