<template>
    <div id="container">
      <div class="login">
        <el-button type="primary" class="close" @click="close">
          <i class="el-icon-close"></i>
        </el-button>
        <p id="title">重置密码</p>
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
          <el-form-item label="电话号码" prop="tel"
            :rules="[{ required: true, message: '请输入绑定的电话号码' }]">
            <el-input style="width: 300px"
            v-model="LoginForm.tel"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 94px;" @click="submit">提交</el-button>
          </el-form-item>
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
          tel:''
        }
      };
    },
    mounted() {
    this.gettime();
  },
    methods: {
      gettime(){
        var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
     _this.gettime = yy+'-'+mm+'-'+dd;
      },
        submit() {
          let params = {
              "user_no":this.LoginForm.id,
              "apl_status":"0",
              "apl_time":this.gettime
            }
            this.$router.push({ path: "/" });
      axios.post('/add-apl',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        }else{
          this.$message({
            message: '提交失败'+res.data.message,
            type: 'error'
          });
        }
      })
      },
      close() {
        this.$router.push({ path: "/" });
      },
      zhuce(){
        this.$router.push({ path: "/zhuce" });
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
    background: linear-gradient(to bottom right,white, rgb(93, 176, 119));
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