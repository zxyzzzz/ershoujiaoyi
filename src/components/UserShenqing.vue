<template>
  <div>
  <el-table :data="tableData" border style="width: 100%">     
    
    <el-table-column prop="user_name" label="用户名" width="150">
     </el-table-column>
    <el-table-column  prop="user_no" label="学号" width="216" >
    </el-table-column>
    <el-table-column prop="tel" label="联系电话" width="200" >
    </el-table-column>
     <el-table-column prop="msg_time" label="申请时间" width="200">
      <template v-slot="scope">
        {{ scope.row.msg_time | dateFormat }}
      </template>
     </el-table-column>
     <el-table-column label="操作" width="190px" align="left">
      <template slot-scope="{ row }">
        <el-button  type="info" plain id="czbtn" @click="pass(row)"> 通过          
        </el-button>
        <el-button  type="info" plain id="czbtn" @click="reject(row)"> 驳回          
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
    pass(row) {
      this.$alert('是否确认重置密码？', {
          confirmButtonText: '确定',
          callback: action => {
            let params = {
              "id": row.id,
              // "user_no":row.user_no
            }
      console.log(row)
      axios.post('/pass-apl',params)
        .then(res =>{
          if (res.status == 200 && res.data.errorcode == 0) {
            this.query();
            this.$message({message: '已重置密码为1234567',type: 'success'});
          }else{
            this.$message({message: '修改失败',type: 'error'});
          }
        })
          }
        });
    },
    reject(row) {
      this.$alert('是否确认驳回申请？', {
          confirmButtonText: '确定',
          callback: action => {
            let params = {
              "id": row.id,
            }
      console.log(row)
      axios.post('/reject-apl',params)
        .then(res =>{
          if (res.status == 200 && res.data.errorcode == 0) {
            this.query();
            this.$message({message: '已驳回',type: 'success'});
          }
        })
          }
        });
    },
   query(){
    axios.post('/query-apl')
    .then( (res)=> {
      if(res.status ==200 && res.data.errorcode==0){
        this.tableData = res.data.data;
        // for (let i = 0; i < this.tableData.length; i++){
        //   console.log(this.tableData[i].msg_time);
        // }
      }
    })
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