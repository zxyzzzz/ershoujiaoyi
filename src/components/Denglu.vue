<template>
  <div id="container">
    <div class="login">
      <el-button type="primary" class="close" @click="close">
        <i class="el-icon-close"></i>
      </el-button>
      <p id="title">登录</p>
      <!-- <div class="loginform" style="display:block">
            <div>
                <input type="text" id="username" placeholder="用户名" 
                style="border-color:lightgray;width: 250px;height: 35px;margin-left: 89px;margin-top: 50px;">
            </div>
            <div>
                <input type="password" id="password" placeholder="密码" style="border-color:lightgray;width: 250px;height: 35px;margin-left: 89px;margin-top: 30px;">
            </div>
            <el-button type="primary" style="width: 255px;height: 40px;margin-left: 89px;margin-top: 30px;">登录</el-button>
        </div> -->
      <el-form
        :model="LoginForm" ref="LoginForm"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-top: 60px"
      >
        <el-form-item
          label="学号"
          prop="id"
          :rules="[{ required: true, message: '学号不能为空' }]"
        >
          <el-input style="width: 300px"
          v-model="LoginForm.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"
          :rules="[{ required: true, message: '密码不能为空' }]">
          <el-input style="width: 300px"
          v-model="LoginForm.password"
          type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" style="margin-left: 94px;">登录</el-button>
        </el-form-item>
        <el-button @click="forget" type="text" style="float:right;padding-right:20px">忘记密码</el-button>
        <el-button @click="zhuce" type="text" style="float:right;padding-right:20px">去注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "right",
      LoginForm:{
        id:'',
        password:''
      }
    };
  },
  methods: {
    close() {
      this.$router.push({ path: "/" });
    },
    zhuce(){
      this.$router.push({ path: "/zhuce" });
    },
    forget(){
      this.$router.push({ path: "/forget" });
    },
    async login(){
      let params = {
        "user_no":this.LoginForm.id,
        "password":this.LoginForm.password,
      }

      axios.post('/login',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({ path: "/" });
          sessionStorage.setItem("user_no",this.LoginForm.id)
        }else{
          this.$message({
            message: '登录失败'+res.data.message,
            type: 'error'
          });
        }
      })
      .catch(res => {

        this.$message({
            message: '登录失败'+res.response.data.message,
            type: 'error'
          });
        //注册失败
      })
    }
}
};
</script>

<style scoped>
.close {
  float: right;
  right: 0;
  border-radius: 0;
}
#container {
  background: linear-gradient(to bottom right, rgb(93, 176, 119),white);
  width: 100%;
  height: 100%;
  margin-top: -70px;
  padding-top: 70px;
  padding-bottom: 50px;
  background-size: 100% 100%;
}
.login {
  margin-left: 33%;
  margin-top: 100px;
  width: 450px;
  height: auto;
  margin-bottom: 70px;
  padding-bottom: 50px;
  background-color: white;
}
#title {
  text-align: center;
  font-size: 20px;
  padding-top: 90px;
  color: darkslategrey;
}
</style>