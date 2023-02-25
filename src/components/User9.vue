<template>
  <div>
    <!-- 地址管理 -->
    <button @click="nvisible = true">新增地址</button>
    <el-table   :data="tableData" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="consignee" label="收货人" width="120">
      </el-table-column>
      <el-table-column prop="province" label="省" width="100">
      </el-table-column>
      <el-table-column prop="city" label="市" width="100">
      </el-table-column>
      <el-table-column prop="area" label="区/县" width="100">
      </el-table-column>
      <el-table-column prop="detail_addr" label="详细地址" width="215">
      </el-table-column>
      <el-table-column prop="tel" label="联系电话" width="150">
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="170" align="left">
        <template slot-scope="{ row }">
          <el-button
            type="info"
            plain
            id="czbtn"
            icon="el-icon-edit"
            @click="edit(row)"
          ></el-button>
          <el-button
            type="info"
            plain
            id="czbtn"
            icon="el-icon-delete"
            @click="deleteadd(row)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="default" label="设为默认" width="120">
        <template slot-scope="scope">
          <el-radio v-model="selectRadio" :label="scope.$index">&nbsp;</el-radio>
          <el-button  icon="el-icon-check" @click="setdefault(scope.row)"> </el-button>
        </template>
        
      </el-table-column> -->
    </el-table>

    <el-dialog title="新增地址" :visible.sync="nvisible">
      <add-dizhi @addSuccess="addsuccess" @update="close" v-show="nvisible" />
    </el-dialog>
    <el-dialog title="编辑地址" :visible.sync="uvisible">
      <address-edit @update="close" v-if="uvisible" :tableData="tableData1" />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import AddDizhi from "./AddDizhi.vue";
import AddressEdit from "./AddressEdit.vue";
export default {
  components: { AddressEdit, AddDizhi },
  data() {
    return {
      nvisible: false,
      uvisible: false,
      tableData: [
      
      ],
      tableData1:{},
      selectRadio: 0
    };
  },
  methods: {
   
//     showRow (row) {
//     this.selectRadio= this.timeOptions.indexOf(row)
//  },

    edit(row) {
      this.uvisible = true; // 打开“卡券详情”对话框
      this.tableData1 = row; // 把对应行数据赋值给data里的detailData
      console.log(row);
    },
    setdefault(row){
      console.log(row);
      
    },
    // deleteUser(index) {
    //   this.tableData.splice(index, 1);
    // },
    close() {
      this.nvisible = false;
      this.uvisible = false;
    },
    deleteadd(row) {
      this.$confirm('是否确认删除该地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              "id": row.id,
            }
      axios.post('/delete-addr',params)
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
  
    //查询
    query(){
      let params = {
        user_no:sessionStorage.getItem("user_no")
      };
      axios.post('/query-addr',params)
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
      .catch(res => {
        debugger
        this.$message({
            message: res.response.data.message,
            type: 'error'
          });
      })
    },
    addsuccess(){
      this.query();
    }

  },
  mounted(){
    this.query();
  }
  
};
</script>

<style scoped>
#czbtn {
  background: none;
  border: none;
  color: gray;
  font-size: 15px;
  cursor: pointer;
}

</style>