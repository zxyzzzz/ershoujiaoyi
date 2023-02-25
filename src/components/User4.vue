<template>
  <div>
    <!-- 用户管理 -->
    <div class="search">
      <input style="height:30px;margin-bottom:10px"  type="text" v-model="input"  placeholder="请输入搜索关键词" >
        <button class="searchbtn">
          <i @click="search"  class="el-icon-search"></i>
        </button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column slot-scope="{ row }">
        <el-button style="border: none"  @click="handleDetail(row)"
          >查看</el-button>
      </el-table-column> -->
      <el-table-column label="操作" width="136px" align="left">
        <template slot-scope="{ row }">
          <!-- 详情按钮 -->
          
          <el-button icon="el-icon-edit" type="info" plain id="czbtn" @click="edit(row)">
           
          </el-button>
          <el-button icon="el-icon-delete" type="info" plain id="czbtn"  @click="deleteUser(row)">
            
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="head_img_url" label="头像" width="150">
        <template slot-scope="scope">
          <img :src="`/download?url=${scope.row.head_img_url}`" style="height: 60px" />
        </template>
      </el-table-column>
     
      <el-table-column prop="user_name" label="用户名" width="140" >
      </el-table-column>
      <el-table-column prop="user_no" label="学号" width="180"> </el-table-column>
      <el-table-column prop="user_type" label="用户类型" width="110">
        <template slot-scope="scope">
          {{ scope.row.user_type|transformUserType }}
        </template> </el-table-column>
      <el-table-column prop="tel" label="联系电话" width="180">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="60">
        <template slot-scope="scope">
          {{ scope.row.sex|transformSex }}
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="uvisible">
      <user-edit   @update="close" v-if="uvisible" :uvisible="uvisible"/>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import UserEdit from './UserEdit.vue';
export default {
  components:{UserEdit},
  data() {
    return {
      uvisible:false,
      tableData: [
        // {
        //   user_name:'张三',
        //   user_no:'19161020237',
        //   sex:'1',
        //   tel:'13222222222',
        //   head_img_url:'xxxxx',
        //   user_type:'1',
        //   birth:'cccccccc'
        // },
        // {
        //   user_name:'李四',
        //   user_no:'19161020201',
        //   sex:'1',
        //   tel:'13222222233',
        //   head_img_url:'xxxxx',
        //   user_type:'1',
        //   birth:'cccccccc'
        // }
      ],
    };
  },
  mounted(){
    this.query();
  },
  filters:{
    transformUserType(value){
      if(value=="1"){
        return "普通用户";
      }else{
        return "管理员"
      }
    },
    transformSex(value){
      if(value=="1"){
        return "男";
      }else{
        return "女"
      }
    }
  },
  methods: {
    search() {
    let params = {
      "user_name": this.input,
    }
    console.log(this.input)
    axios.post('/search-user',params)
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
    selectChange() {},
    deleteUser(row) {
      this.$confirm('是否确认删除该用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              "id": row.id,
            }
      axios.post('/delete-user',params)
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
    edit(row) {
      this.$confirm('是否确认设为管理员', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              "id": row.id,
            }
      axios.post('/useredit',params)
        .then(res =>{
          if (res.status == 200 && res.data.errorcode == 0) {
            this.query();
            this.$message({message: '设置成功',type: 'success'});
          }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
      // this.uvisible = true; // 打开“卡券详情”对话框
      // this.tableData = row; // 把对应行数据赋值给data里的detailData
    },
    query(){
      axios.post('/query-alluser')
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.tableData = res.data.data;
          console.log(this.tableData)
        }
      })
    },
  },
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