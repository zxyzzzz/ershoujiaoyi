<template>
    <div class="container"  style="height:100%">
      <el-container>
          <el-aside style="width:300px">
          <img style="width:210px" :src="tableData.img"/>
      </el-aside>
      <el-main
            style="word-break: break-all;word-wrap: break-word;
              margin-left: 20px;
            "
          >
            <div class="name">{{tableData.name }}</div>
            <el-divider></el-divider>
            <div style="margin-top: 20px;"><span class="title">分类：</span> {{tableData.classify }}</div>
            <div style="margin-top: 20px;"><span class="title">价格：</span>{{ tableData.price }}</div>
            <div style="margin-top: 20px;"><span class="title">详细信息：</span>{{ tableData.details }}</div>
            <el-divider></el-divider>
            <button class="btn">联系卖家</button>
            <button class="btn"  @click="buy">立即购买</button>
          </el-main>
      </el-container>
      
    </div>
  </template>
  
  <script>
  export default {
    props: {tableData:{type: Object,}},
    data() {
      return {
      };
    },
    mounted() {
      console.log(this.tableData);
    },
    methods:{
      buy(){
        this.$router.push({path:'/jiesuan',query:{tableData:this.tableData}})
      }
    }
  }
  </script>
  
  <style  scoped>
  .title{
      font-size: 17px;
  }
  .name{
      font-size: 23px
  }
  </style>>
  
  