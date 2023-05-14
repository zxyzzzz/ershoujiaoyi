<template>
    <div>
    <el-table :data="tableData" border style="width: 100%">     
      <el-table-column  prop="user_no" label="学号" width="196" >
      </el-table-column>
      <el-table-column  prop="order_id" label="订单编号" width="160" >
      </el-table-column>
      <el-table-column  prop="goods_id" label="商品编号" width="160" >
      </el-table-column>
      <el-table-column prop="img_url" label="付款截图" width="250" >
        <template slot-scope="scope">
          <img :src="`/download?url=${scope.row.img_url}`" style="height: 60px" />
        </template>
      </el-table-column>
       <el-table-column label="操作" width="190px" align="left">
        <template slot-scope="{ row }">
          <el-button  type="info" plain id="czbtn" @click="pass(row)"> 通过          
          </el-button>
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
      tableData:[],
    }},
  
  mounted(){
    this.query();
  
  },
    methods: {
      query(){
      axios.post('/query-pay-apl')
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.tableData = res.data.data;
          // for (let i = 0; i < this.tableData.length; i++){
          //   console.log(this.tableData[i].msg_time);
          // }
        }
      })
    },
      pass(row) {
        debugger
        this.$alert('是否确认通过？', {
            confirmButtonText: '确定',
            callback: action => {
              let params = {
                "id": row.id,
                "order_id":row.order_id
              }
        console.log(row)
        axios.post('/pass-pay-apl',params)
          .then(res =>{
            if (res.status == 200 && res.data.errorcode == 0) {
              this.query();
              this.$message({message: '已通过',type: 'success'});
            }
          })
            }
          });
      },
    
  
  }
  }
  </script>
  
  <style scoped>
  #czbtn {
  margin-left: 30px;
  padding: 15px;
  background: none;
  border: none;
  color: gray;
  font-size: 15px;
  width: 0px;
  cursor: pointer;
  }
  </style>