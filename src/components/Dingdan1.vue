<template>
  <div>
    <!-- 全部订单 -->
    <div class="search">
      <input style="height:30px;margin-bottom:10px;padding-top:-10px"  type="text" v-model="input"  placeholder="请输入搜索关键词" >
        <button class="searchbtn">
          <i @click="search"  class="el-icon-search"></i>
        </button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column slot-scope="{ row }">
        <el-button style="border: none"  @click="handleDetail(row)"
          >查看</el-button>
      </el-table-column> -->
      <el-table-column label="操作" width="120px" align="left">
        <template slot-scope="{ row }">
          <!-- 详情按钮 -->
          <el-button type="info" plain id="czbtn" @click="handleDetail(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="goods_img_url" label="封面" width="230">
        <template slot-scope="scope">
          <img :src="`/download?url=${scope.row.goods_img_url}`" style="height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="255">
      </el-table-column>
      <el-table-column prop="goods_price" label="价格" width="170"> </el-table-column>
      <el-table-column prop="order_status" label="订单状态" width="160">
        <template slot-scope="scope">
          {{ scope.row.order_status|transformOrder_status }}
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="商品详情" :visible.sync="cardvisible">
      <dingdan-card v-if="cardvisible" :tableData="tableData" />
    </el-dialog>
  </div>
</template>

<script>
import DingdanCard from "./DingdanCard.vue";
import axios from "axios";
export default {
  components: { DingdanCard },
  data() {
    return {
      cardvisible: false,
      tableData: [
        
      ],
    };
  },
  filters:{
    transformOrder_status(value){
      if(value=="0"){
        return "待收货";
      }
      if(value=="1"){
        return "已收货";
      }
      
    },
  },
  mounted(){
    this.query();
  },
  methods: {
    search() {
    let params = {
      "goods_name":this.input
    }
    console.log(this.input)
    axios.post('/search-order',params)
    .then( (res)=> {
      if(res.status ==200 && res.data.errorcode==0){
        this.$message({
          message: '搜索成功',
          type: 'success'
        });
        this.tableData = res.data.data;
      }else{
        this.$message({
          message: '搜索失败'+res.data.message,
          type: 'error'
        });
      }
    })
  },
    async query(){
      let params = {
        user_no:sessionStorage.getItem("user_no")
      };
      axios.post('/query-order',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){

          this.tableData = res.data.data;
        }else{
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
  
    handleDetail(row) {
      this.cardvisible = true; // 打开“卡券详情”对话框
      this.tableData = row; // 把对应行数据赋值给data里的detailData
    },
  },
  mounted(){
    this.query();
  }
};
</script>

<style scoped>
.p {
  margin-left: 44px;
}
.namep {
  font-size: 20px;
  margin-top: 0px;
}
.btn {
  margin-top: 30px;
  margin-left: 300px;
}
#czbtn {
  background: none;
  border: none;
  color: gray;
  font-size: 15px;
  width: 90px;
  cursor: pointer;
}
</style>