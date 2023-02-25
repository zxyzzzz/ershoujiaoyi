<template>
    <div class="cards">
      <div class="imgs">
        <img id="imgs" :src="tableData.img" @click="dialogTableVisible1 = true" />
      </div>
      <div>
        <p class="names">{{ this.tableData.name }}</p>
        <p class="prices">{{ this.tableData.price }}</p>
      </div>
      <el-dialog title="商品详情" :visible.sync="dialogTableVisible1">
        <div class="card">
          <el-container style="height: 100%">
            <el-aside width="300px">
              <el-main><img :src="tableData.img" style="width: 210px" /></el-main>
            </el-aside>
            <el-main
              style="
              word-break: break-all;
              word-wrap: break-word;
                margin-left: 20px;
              "
            >
              <div class="name">{{ this.tableData.name }}</div>
              <el-divider></el-divider>
              <div style="margin-top: 20px">
                <span class="title">分类：</span> {{ this.tableData.classify }}
              </div>
              <div style="margin-top: 20px">
                <span class="title">价格：</span>{{ this.tableData.price }}
              </div>
              <div style="margin-top: 20px">
                <span class="title">详细信息：</span>{{ this.tableData.details }}
              </div>
              <el-divider></el-divider>
              <button class="btn">加入购物车</button>
              <button class="btn">联系卖家</button>
              <button class="btn" @click="buy">立即购买</button>
              <button class="btn">删除商品</button>
            </el-main>
          </el-container>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script scoped>
  export default {
    props: ["tableData"],
    data() {
      return {
        dialogTableVisible1: false,
        tableData:''
      };
    },
    methods: {
      buy() {
        this.$router.push({ path: "/jiesuan", query: {tableData:this.tableData}});
      },
    },
    mounted(){
      console.log(this.tableData.name)
    }
  };
  </script>
  
  <style scoped>
  .title {
    font-size: 17px;
  }
  .name {
    font-size: 23px;
  }
  .names {
    text-align: center;
  }
  .prices {
    text-align: center;
    color: gray;
  }
  .cards {
    background-color: rgb(237, 247, 250);
    border-radius: 10px;
    width: 210px;
    height: 300px;
    float: left;
    margin: 5px;
    padding: 10px;
  }
  .cards:hover {
    background-color: white;
  }
  .imgs {
    height: 190px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #imgs {
    max-width: 100%;
    max-height: 100%;
  }
  .el-dialog {
    width: 60%;
  }
  .closec {
    float: right;
    margin-top: -60px;
  }
  </style>