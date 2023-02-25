<template>
  <div>
    <!-- 订单管理 -->
    <div class="search">
      <input style="height:30px;margin-bottom:10px"  type="text" v-model="input"  placeholder="请输入搜索关键词" >
        <button class="searchbtn">
          <i @click="search"  class="el-icon-search"></i>
        </button>
    </div>
    <el-table @selection-change="selectChange" :data="tableData" border style="width: 100%">
      
      <el-table-column label="操作" width="140px" align="left">
        <template slot-scope="{ row }">
          <el-button icon="el-icon-delete" type="info" plain id="czbtn"  @click="deleteOrder(row)">
            
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="订单编号" width="90">
       </el-table-column>
      <el-table-column prop="goods_name" label="商品名" width="150" >
      </el-table-column>
      <el-table-column prop="goods_img_url" label="图片" width="150">
        <template slot-scope="scope">
          <img :src="`/download?url=${scope.row.goods_img_url}`" style="height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="user_no" label="收货人学号" width="140">
       </el-table-column>
       <el-table-column prop="receiving_method" label="收货方式" width="140">
        <template slot-scope="scope">
          {{ scope.row.receiving_method|transformReceiving_method }}
        </template>
       </el-table-column>
      <el-table-column prop="order_status" label="订单状态" width="146"> 
        <template slot-scope="scope">
          {{ scope.row.order_status|transformOrder_status }}
        </template>
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData:[]
    }},

  mounted(){
    this.query();
  },
  filters:{
    transformReceiving_method(value){
      if(value=="1"){
        return "线下交货";
      }else{
        return "快递发货"
      }
    },
    transformOrder_status(value){
      if(value=="0"){
        return "待收货";
      }
      if(value=="1"){
        return "已收货";
      }
      
    },
  },
  methods: {
    search() {
    let params = {
      "goods_name": this.input,
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
    query(){
      axios.post('/query-allorder')
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.tableData = res.data.data;
          console.log(this.tableData)
        }
      })
    },
    deleteOrder(row) {
      this.$confirm('是否确认删除该订单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              "id": row.id,
            }
      axios.post('/delete-order',params)
        .then(res =>{
          if (res.status == 200 && res.data.errorcode == 0) {
            this.query();
            this.$message({message: '删除成功',type: 'success'});
          }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
}
</script>

<style scoped>
#czbtn {
  margin-left: -1px;
  padding: 15px;
  background: none;
  border: none;
  color: gray;
  font-size: 15px;
  width: 0px;
  cursor: pointer;
}
</style>