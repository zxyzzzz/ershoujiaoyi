<template>
    <div>
      <!-- 已售出 -->
      <el-table
        :data="tableData"
        border
        @selection-change="selectChange"
        style="width: 100%"
        
      >
      <el-table-column prop="goods_img_url" label="图片" width="230">
        <template slot-scope="scope">
          <img :src="`/download?url=${scope.row.goods_img_url}`" style="height: 80px;margin-left: 20px;" />
        </template>
      </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="220">
        </el-table-column>
        <el-table-column prop="goods_type" label="分类" width="160">
        <template slot-scope="scope">
          {{ scope.row.goods_type|transformGoods_type }}
        </template>
       </el-table-column>
        <el-table-column prop="goods_price" label="价格" width="145">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template  slot-scope="{ row }">
           
            <el-button
              type="info"
              plain
              id="czbtn"
              icon="el-icon-delete"
              @click="deletegoods(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑" :visible.sync="uvisible">
        <upload-edit v-if="uvisible" :tableData="tableData"  />
      </el-dialog>
      
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import UploadEdit from "./UploadEdit.vue";
  export default {
    components: { UploadEdit },
    data() {
      return {
        uvisible:false,
        tableData: [
        // {
        //   img: require("../img/meizhuang5.jpg"),
        //   name: "Dior999",
        //   price: "￥199",
        //   classify:'个护美妆',
        //   details:'全新迪奥Dior烈焰蓝金口红999唇膏专柜同款自贸区直销手续齐全特惠价'  
        // },
        // {
        //   img: require("../img/shouji3.jpg"),
        //   name: "iPhoneX 64G",
        //   price: "￥1000",
        //   classify:'手机电脑',
        //   details:'iPhoneX 64G 白色 本人在用，处理，喜欢的随时可以联系我看  '
        // },
        ],
      };
    },
    filters:{
    transformGoods_type(value){
      if(value=="1"){
        return "手机电脑";
      }
      if(value=="2"){
        return "运动健身";
      }
      if(value=="3"){
        return "服饰鞋帽";
      }
      if(value=="4"){
        return "生活娱乐";
      }
      if(value=="5"){
        return "个护美妆";
      }
      if(value=="6"){
        return "图书教材";
      }
      if(value=="7"){
        return "交通出行";
      }
    },
  },
    mounted(){
    this.query();
  },
    methods: {
      query(){
      let params = {
        user_no:sessionStorage.getItem("user_no")
      };
      axios.post('/query-soldgoods',params)
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

        deletegoods(row) {
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
 
      selectChange() {},
      edit(row){
        this.uvisible = true; // 打开“卡券详情”对话框
        this.tableData = row; // 把对应行数据赋值给data里的detailData
      },
      
      },
     
  
      // showDialog(row) {
      //   // 调用子组件的方法
      //   this.$refs.uploadEdit.show(row);
      // },
  };
  </script>
  
  <style>
  #czbtn {
    background: none;
    border: none;
    color: gray;
    font-size: 15px;
    width: 80px;
    cursor: pointer;
  }
  </style>