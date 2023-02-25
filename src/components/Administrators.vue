<template>
    <div>
      <Head></Head>
      <div class="user">
        <p id="title1">个人中心 
          <span id="name">hi-{{ user_name }}</span></p>
      </div>
      <el-container class="usercenter">
        <el-aside width="200px" class="left">
          <p style="margin-left: 20px; font-size: 15px">全部功能</p>
          <el-menu :default-active="activeIndex">
            <el-menu-item id="btn" @click="show(1)" :class="index === 1 ? 'active' : ''"
              >我的订单</el-menu-item
            >
            
            <el-menu-item id="btn" @click="show(6)" :class="index === 6 ? 'active' : ''"
              >我发布的商品</el-menu-item
            >
            <el-menu-item id="btn" @click="show(7)" :class="index === 7 ? 'active' : ''"
              >已卖出的商品</el-menu-item
            >
            <el-menu-item id="btn" @click="show(8)" :class="index === 8 ? 'active' : ''"
              >个人信息</el-menu-item
            >
            <el-menu-item id="btn" @click="show(9)" :class="index === 9 ? 'active' : ''"
              >收货地址</el-menu-item
            >
            <el-menu-item id="btn" @click="show(3)" :class="index === 3 ? 'active' : ''"
              >留言板管理</el-menu-item
            >
            <el-menu-item id="btn" @click="show(4)" :class="index === 4 ? 'active' : ''"
              >用户管理</el-menu-item
            >
            <el-menu-item id="btn" @click="show(10)" :class="index === 10 ? 'active' : ''"
              >订单管理</el-menu-item
            >
            <el-menu-item id="btn" @click="show(11)" :class="index === 11 ? 'active' : ''"
              >商品管理</el-menu-item
            >
            <el-menu-item id="btn" @click="show(5)" :class="index === 5 ? 'active' : ''"
              >数据统计</el-menu-item
            >
          </el-menu>
        </el-aside>
        <el-main class="center" >
          <div class="tab_content">
            <keep-alive>
              <component :is="comp" v-show="isShow"></component>
            </keep-alive>
          </div>
        </el-main>
        <!-- <el-aside class="right">
          <div class="date">
            <el-container>
              <el-header id="datetitle" style="height:80px">
                  <p id="time">当前时间</p>
              </el-header>
              <el-main id="date">
                {{ date }}
              </el-main>
            </el-container>
          </div>
        </el-aside> -->
      </el-container>
    </div>
  </template>
    
    <script>
    import axios from "axios";
  import Head from "./Head.vue";
  import User1 from "./User1.vue";
  import User12 from "../components/User12.vue";
  import User4 from "../components/User4.vue";
  import User5 from "../components/User5.vue";
  import User6 from "../components/User6.vue";
  import User7 from "../components/User7.vue";
  import User8 from "../components/User8.vue";
  import User9 from "../components/User9.vue";
  import User10 from "../components/User10.vue";
  import User11 from "../components/User11.vue";
  export default {
    components: {
      Head,
      User1,
      User12,
      User4,
      User5,
      User6,
      User7,
      User8,
      User9,
      User10,
      User11,
    },
    data() {
      return {
        user_name:"",
        activeIndex: "1",
        comp: "User1",
        isShow: true,
        index: 1,
        date: new Date(new Date().getTime() + 8 * 3600 * 1000)
          .toJSON()
          .substr(0, 19)
          .replace("T", " "),
      };
    },
    mounted() {
      this.query();
      let _this = this;
      this.timer = setInterval(() => {
        _this.date = new Date(new Date().getTime() + 8 * 3600 * 1000)
          .toJSON()
          .substr(0, 19)
          .replace("T", " ");
      }, 1000);
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
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
          this.user_name = data.user_name;
        }
      })
    },
      show(value) {
        if (this.index === value) {
          this.index = 0;
          this.isShow = !this.isShow;
        } else {
          this.index = value;
          this.isShow = true;
        }
        if (value === 1) {
          this.comp = "User1";
        }
        if (value === 3) {
          this.comp = "User12";
        }
        if (value === 4) {
          this.comp = "User4";
        }
        if (value === 5) {
          this.comp = "User5";
        }
        if (value === 6) {
          this.comp = "User6";
        }
        if (value === 7) {
          this.comp = "User7";
        }
        if (value === 8) {
          this.comp = "User8";
        }
        if (value === 9) {
          this.comp = "User9";
        }
        if (value === 10) {
          this.comp = "User10";
        }
        if (value === 11) {
          this.comp = "User11";
        }
      },
    },
  };
  </script>
    
    <style>
  #btn{
      background: none;
    }
  .usercenter {
    margin-top: 10px;
  }
  .left {
    margin-left: 50px;
  }
  .user {
    width: 100%;
    height: 100px;
    background-color: rgb(93, 176, 119);
    margin-top: -20px;
  }
  #title1 {
    font-size: 30px;
    color: aliceblue;
    margin-left: 50px;
    padding-top: 27px;
  }
  #SearchForm {
    float: right;
    padding-right: 150px;
  }
  #searchbtn {
    height: 42px;
    width: 110px;
    padding: 0;
    cursor: pointer;
    border: 0;
    outline: 0;
    color: #fff;
    background-color: #96c4f9;
    font: 14px/1.5 Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, arial, Simsun, \\5;
  }
  #keyword {
    width: 300px;
    height: 40px;
    padding: 0 10px;
    float: left;
    border: 1px solid #ddd;
    border-right: none;
    font-size: 14px;
    color: #666;
    outline-style: none;
  }
  .active {
    color: rgb(93, 176, 119);
    font-size: 25px;
  }
  #name{
    font-size: 20px;
    margin-left:85px;
  }
  </style>