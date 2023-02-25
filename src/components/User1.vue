<template>
  <div class="containeruser1">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" id="showbtn" @click="show(1)" :class="index === 1 ? 'active1' : ''" style="background:none">全部订单</el-menu-item>
      <el-menu-item index="2" id="showbtn" @click="show(2)" :class="index === 2 ? 'active1' : ''">待收货</el-menu-item>
      <el-menu-item index="3" id="showbtn" @click="show(3)" :class="index === 3 ? 'active1' : ''">已收货</el-menu-item>
      <!-- <el-menu-item index="4" id="showbtn" @click="show(4)" :class="index === 4 ? 'active1' : ''">待收货</el-menu-item>
      <el-menu-item index="5" id="showbtn" @click="show(5)" :class="index === 5 ? 'active1' : ''">待评价</el-menu-item> -->
     
    </el-menu>
    <!-- <div class="ddhead">
      <div class="classRow">
          <div class="classLeft">

          </div>
          <div class="classCenter">
            <p style="margin-top: 0px;padding-left: 45px;">商品名称</p>
          </div>
          <div class="classRight1">
            <p style="margin-top: 0px;padding-left: 0px;">金额</p>
          </div>
          <div class="classRight2">
            <p style="margin-top: 0px;margin-left: -18px;">订单状态</p>
          </div>
        </div>
    </div> -->
    <div class="tab_content">
          <keep-alive>
            <component :is="comp" :data="tableData" v-show="isShow"></component>
          </keep-alive>
        </div>
  </div>
</template>

<script>
 import axios from "axios";
import Dingdan1 from './Dingdan1.vue'
import Dingdan2 from './Dingdan2.vue'
import Dingdan3 from './Dingdan3.vue'
import Dingdan4 from './Dingdan4.vue'
import Dingdan5 from './Dingdan5.vue'
export default {
  components:{Dingdan1,Dingdan2,Dingdan3,Dingdan4,Dingdan5},
  data() {
    return {
      activeIndex: "1",
      comp:'Dingdan1',
      isShow: true,
      index: 1,
      searchList:[],
      goodsTypes:[
        {label:"全部商品",name:"0"},
        {label:"手机电脑",name:"1"},
        {label:"运动健身",name:"2"},
        {label:"服饰鞋帽",name:"3"},
        {label:"生活娱乐",name:"4"},
        {label:"个护美妆",name:"5"},
        {label:"图书教材",name:"6"},
        {label:"交通出行",name:"7"}
      ],
      tableData: [
       
      ],
    };
  },
  mounted(){
    
  },
  methods: {
   
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
        this.comp = "Dingdan1";
      }
      if (value === 2) {
        this.comp = "Dingdan2";
      }
      if (value === 3) {
        this.comp = "Dingdan3";
      }
      if (value === 4) {
        this.comp = "Dingdan4";
      }
      if (value === 5) {
        this.comp = "Dingdan5";
      }
    }
  },
};
</script>

<style>
.containeruser1 {
  width: 100%;
  border: 1px solid lightgray;
}
.search{
  float: right;
  padding-top: 17px;
}
#ip_keyword{
  height: 25px;
  border: 1px solid lightgrey;
}
.searchbtn{
  font-size: 20px;
  color: grey;
  height: 27px;
  border: none;
  background: none;
  margin-left: -5px;
}
.classRow{
    display: flex;
    color: grey;
}
.classLeft{
    flex: 0.2;
}
.classCenter{
    flex: 0.4;
    font-size: 13px;
}
.classRight1{
  flex: 0.2;
  font-size: 13px;
}
.classRight2{
  flex: 0.2;
  font-size: 13px;
}
.ddhead{
  background-color: #f5f5f5;
  height: 20px;
  margin: 10px;
}
</style>