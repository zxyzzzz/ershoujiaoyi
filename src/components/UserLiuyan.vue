<template>
    <div>
    <el-table :data="tableData" border style="width: 100%">     
      <el-table-column label="操作" width="90px" align="left">
        <template slot-scope="{ row }">
          <el-button icon="el-icon-delete" type="info" plain id="czbtn"  @click="deleteMsg(row)">           
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="用户名" width="110">
       </el-table-column>
      <el-table-column prop="user_no" label="学号" width="150" >
      </el-table-column>
      <el-table-column prop="msg_detail" label="留言信息" width="406">
       </el-table-column>
       <el-table-column prop="msg_time" label="留言时间" width="200">
        <template v-slot="scope">
          {{ scope.row.msg_time | dateFormat }}
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
      axios.post('/query-msg')
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.tableData = res.data.data;
          for (let i = 0; i < this.tableData.length; i++){
            console.log(this.tableData[i].msg_time);
          }
        }
      })
    },
    deleteMsg(row) {
      this.$confirm('是否确认删除该留言', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              "id": row.id,
            }
      axios.post('/delete-msg',params)
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