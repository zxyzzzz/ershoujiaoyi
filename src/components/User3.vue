<template>
  <div>
    <div class="sendbox">
      <div class="text-panel">
        <textarea v-model="msg_detail" class="text-area" placeholder="请输入内容"></textarea>
      </div>
    </div>
    <el-button type="primary" plain style="margin-left: 45%; margin-top: 30px" @click="submit"
      >提交</el-button
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      msg_detail:'',
    }
    },
  mounted() {
    this.gettime();
  },
    methods:{
      gettime(){
        var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      // let hh = new Date().getHours();
      // let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      // let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy+'-'+mm+'-'+dd;
      },
      async submit() {
        
        console.log(this.gettime)
      let params = {
          "user_no":sessionStorage.getItem("user_no"),
          // "user_name":
          "msg_detail":this.msg_detail,
          "msg_time":this.gettime
      }
      console.log(this.currentdate)
      await axios.post('/add-msg',params)
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
    }
 
};
</script>

<style  scoped>
.sendbox{
  margin-top: 30px;
}
.text-area {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  border: 1px solid #73a0a7;
  font-size: 16px;
  resize: none;
}
.text-area:focus {
  outline: none;
}
</style>



<!-- <template>
  <div class="user3container">
    <el-container>
      <el-aside style="width: 200px">
        <p
          style="
            font-size: 19px;
            margin-top: 20px;
            margin-left: 20px;
            margin-bottom: 10px;
          "
        >
          <i class="el-icon-chat-line-round"></i>聊天列表
        </p>
        <span style="margin-top: 0px">
          <i class="el-icon-search"></i>
          <input
            placeholder="搜索最近联系人"
            height="100%"
            autocomplete="off"
            value=""
          />
        </span>
        <el-divider></el-divider>
      </el-aside>
      <el-main class="user3main">
        <el-container>
          <el-body style="height: 300px"></el-body>
          <el-divider></el-divider>
          <el-footer>
            <div class="sendbox">
              <div class="text-panel">
                <textarea class="text-area" placeholder="请输入内容"></textarea>
              </div>
            </div>
            <el-button type="primary" plain style="float: right;">发送</el-button>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
    };
  },
};
</script>

<style>
.user3container {
  border: 3px solid #f5f5f5;
  width: 90%;
  background-color: #f5f5f5;
  margin-left: 20px;
  border-radius: 10px;
}
.user3main {
  height: 500px;
  background-color: #fff;
}
.text-area{
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
  resize: none;
}
.text-area:focus{
    outline: none;
}
</style> -->