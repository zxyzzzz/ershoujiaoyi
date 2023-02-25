<template>
  <div>
    <!-- 商品管理 -->
    <div class="search">
      <input style="height:30px;margin-bottom:10px"  type="text" v-model="input"  placeholder="请输入搜索关键词" >
        <button class="searchbtn">
          <i @click="search"  class="el-icon-search"></i>
        </button>
    </div>
    <el-table  :data="tableData" border style="width: 100%">     
      <el-table-column label="操作" width="160px" align="left">
        <template slot-scope="{ row }">
          <el-button icon="el-icon-delete" type="info" plain id="czbtn"  @click="deleteGoods(row)">
            
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="商品编号" width="106">
       </el-table-column>
       <el-table-column prop="goods_img_url" label="图片" width="150">
        <template slot-scope="scope">
          <img :src="`/download?url=${scope.row.goods_img_url}`" style="height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名" width="160" >
      </el-table-column>
      <el-table-column prop="user_no" label="发布人学号" width="160">
       </el-table-column>
       <el-table-column prop="goods_price" label="价格" width="100">
       </el-table-column>
       <el-table-column prop="goods_status" label="商品状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.goods_status|transformGoods_status }}
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
    transformGoods_status(value){
      if(value=="0"){
        return "待售出";
      }
      if(value=="1"){
        return "已售出";
      }
      
    },
  },
  methods: {
    search() {
    let params = {
      "goods_name": this.input,
    }
    console.log(this.input)
    axios.post('/search-allgoods',params)
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
      axios.post('/query-allgoods')
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.tableData = res.data.data;
          console.log(this.tableData)
        }
      })
    },
    deleteGoods(row) {
      this.$confirm('是否确认删除该商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              "id": row.id,
            }
            axios.post('/delete-goods',params)
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