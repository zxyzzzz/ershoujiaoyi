<template>
  <div style="height:45px;width: 100%;margin-top: -10px;background: #F5F5F5;">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <div class="bar_left" style="position:absolute;left:40px">
        <el-menu-item index="1" class="href" @click="denglu">
          <i class="el-icon-user"></i>
          登录</el-menu-item>
        <el-menu-item index="2" class="href" @click="zhuce">
          <i class="el-icon-mouse"></i>
          注册</el-menu-item>
      </div>
      <div class="bar_right" style="position: absolute; right: 20px">
        <el-menu-item index="3" class="href" @click="func1" >
          <i class="el-icon-s-shop"></i>
          首页</el-menu-item
        >
        <el-menu-item index="4" class="href"  @click="func2" >
          <i class="el-icon-shopping-cart-2"></i>
          购物车
        </el-menu-item>
        <el-menu-item index="5" class="href"  @click="func3">
          <i class="el-icon-user"></i>
          个人中心
        </el-menu-item>
        <el-menu-item index="6" class="href"  @click="func4">
          <i class="el-icon-switch-button"></i>
          安全退出
        </el-menu-item>
      </div>
    </el-menu>
    <div class="line href"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user_type:"",
      user_no:"",
      activeIndex: "1",
      activeIndex2: "1",
      id:''
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    async query(){
      let params = {
        user_no:sessionStorage.getItem("user_no")
      }
      axios.post('/user-query',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          let data = res.data.data[0];        
          this.user_type = data.user_type;
        }
      })
    },
    handleSelect(key, keyPath) {
    },
    func1(){
      this.$router.push({path:'/'});
    },
    func2(){
      let user_no = sessionStorage.getItem("user_no");
      if(user_no){
        this.$router.push({path:'/shoopcart'})
      }else{
        this.$message({message: '请登录',type: 'error'});
      }
      
    },
    func3(){
      // let params = {
      //   user_no:sessionStorage.getItem("user_no")
      // }
      // axios.post('/user-query',params)
      // .then( (res)=> {
      //   if(res.status ==200 && res.data.errorcode==0){
      //     let data = res.data.data[0];   
      //     this.user_no = data.user_no;     
      //     this.user_type = data.user_type;
      //   }
      // })
      // let user_no = sessionStorage.getItem("user_no");
      this.query();
      console.log(this.user_type)
      if(this.user_type){ 
        if(this.user_type==1){
          this.$router.push({path:'/user'})
        }
        if(this.user_type==2){
          this.$router.push({path:'/administrators'})
        }}
        else{
        this.$message({message: '请登录',type: 'error'});
      }
        
      
    },
    func4(){
      let user_no = sessionStorage.getItem("user_no");
      if(user_no){
        this.$message({message: '已退出',type: 'success'});
      }else{
        this.$message({message: '您未登录',type: 'error'});
      }
    },
    denglu(){
      let user_no = sessionStorage.getItem("user_no");
      if(user_no){
        this.$message({message: '您已登录',type: 'error'});
      }else{
      this.$router.push({path:'/denglu'});
      }
    },
    zhuce(){
      this.$router.push({path:'/zhuce'});
    }
  },
};
</script>

<style scoped>
.href{
  display: inline;
  font-size: 5px;
}
</style>
