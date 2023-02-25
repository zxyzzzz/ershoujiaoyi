<template>
  <div>
    <!-- 待收货 -->
    <div class="search">
      <input style="height:30px;margin-bottom:10px"  type="text" v-model="input"  placeholder="请输入搜索关键词" >
        <button class="searchbtn">
          <i @click="search"  class="el-icon-search"></i>
        </button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="操作" width="150px" align="left">
        <template slot-scope="{ row }">
          <el-button type="info" plain id="czbtn" @click="handleDetail(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="img" label="封面" width="270">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="200">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="190"> </el-table-column>
      <el-table-column  width="145">
        <template slot-scope="{ row }">
          <el-button type="info" plain id="czbtn" @click="received(row)">
            确认收货
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="商品详情" :visible.sync="cardvisible">
      <dingdan-card-2 v-if="cardvisible" :tableData="tableData"/>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import DingdanCard2 from "./DingdanCard2.vue";
export default {
  components: { DingdanCard2 },
  data() {
    return {
      cardvisible: false,
      tableData: [
      ],
    };
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
    handleDetail(row) {
      this.cardvisible = true; // 打开“卡券详情”对话框
      this.tableData = row; // 把对应行数据赋值给data里的detailData
    },
    received(row) {
      this.$alert('是否确认收货？', {
          confirmButtonText: '确定',
          callback: action => {
            let params = {
              "id": row.id,
            }
      console.log(row)
      axios.post('/edit-order',params)
        .then(res =>{
          if (res.status == 200 && res.data.errorcode == 0) {
            this.query();
            this.$message({message: '修改成功',type: 'success'});
          }else{
            this.$message({message: '修改失败',type: 'error'});
          }
        })
          }
        });
    },
    async query(){
      let params = {
        user_no:sessionStorage.getItem("user_no")
      };
      axios.post('/query-notreceive_order',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){

          this.tableData = res.data.data.map(v=>{
            return {
              id:v.id,
              img:`/download?url=${v.goods_img_url}`,
              name:v.goods_name,
              price:v.goods_price,
              order_status:v.order_status,
              details:v.goods_detail,
              classify:v.goods_type,
            }
          });
        }else{
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
  },
};
</script>

<style scoped>
#czbtn {
  background: none;
  border: none;
  color: gray;
  font-size: 15px;
  width: 90px;
  cursor: pointer;
}
</style>