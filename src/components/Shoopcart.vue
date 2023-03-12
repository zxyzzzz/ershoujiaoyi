<template>
  <div>
    <Head></Head>
    <div class="shop">
      <p class="stitle">我的购物车</p>
    </div>
    <el-card class="crumbs-card">
      <el-container style="float: right; margin-right: 100px">
        <el-aside style="width: 180px"
          ><p style="font-size: 18px">
            已选商品：<span>￥{{ moneylisttotal }}</span>
          </p></el-aside
        >
        <el-main
          ><el-button type="danger" round @click="buy">结算</el-button></el-main
        >
      </el-container>
      <el-table
      :data="tableData"
        ref="multipleTable"
        border
        @selection-change="handleSelectionChange"
        style="width: 90%; margin-left: 60px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column width="190">
          <template slot-scope="{ row }">
            <!-- 详情按钮 -->
            <el-button type="info" plain id="czbtn" @click="handleDetail(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="封面" width="210">
          <template slot-scope="scope">
            <img :src="`/download?url=${scope.row.goods_img_url}`" style="width: auto; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="260">
        </el-table-column>
        <el-table-column prop="goods_price" label="价格" width="170">
        </el-table-column>
        <!-- <el-table-column prop="classify" label="分类" width="0">
        </el-table-column>
        <el-table-column prop="details" label="详细信息" width="0">
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="info"
              plain
              id="czbtn"
              icon="el-icon-delete"
              @click="deleteShopcart(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="商品详情" :visible.sync="scardvisible">
      <shopcart-card v-if="scardvisible" :tableData="goodsdetail" />
    </el-dialog>
  </div>
</template>

<script>
 import axios from "axios";
import Head from "./Head.vue";
import ShopcartCard from "./ShopcartCard.vue";

export default {
  components: { Head, ShopcartCard },
  data() {
    return {
      Bmsg: "",
      moneylist: [],
      moneylisttotal: 0,
      scardvisible: false,
      tableData: [
      ],
      goodsdetail:{},
      multipleSelection: [],
    };
  },
  mounted() {
    // this.$eventBus.on("changeMsg", this.getMsg);
    this.query();
    console.log(this.$route.query);
    this.tableData.push(this.$route.query.tableData)  ;
    
  },
  created() {
    this.handleUserList();
    this.$storage.setLocal(this.$route.query.tableData,'tableData')
    console.log(this.tableData+"222")
  },
  methods: {
    query(){
      let params = {
        user_no:sessionStorage.getItem("user_no")
      };
      axios.post('/query-shoppingcart',params)
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
      this.scardvisible = true; // 打开“卡券详情”对话框
      this.goodsdetail = row; // 把对应行数据赋值给data里的detailData
      console.log(this.goodsdetail+"111")
    },
    
    getMsg(msg) {
      this.Bmsg = msg;
      console.log(msg);
    },
    deleteShopcart(row) {
      this.$confirm('是否确认删除该商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
              "id": row.id,
            }
      axios.post('/delete-shoppingcart',params)
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
  
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      this.moneylist = this.$refs.multipleTable.selection.map(
        (item) => item.goods_price
      );
      // 计算总金额moneylisttotal
      // 如果moneylist.length的长度大于0 那么就return pre + cur;
      // 如果长度小于等于0 就 直接赋值 this.moneylisttotal = 0
      if (this.moneylist.length > 0) {
        this.moneylisttotal = this.moneylist.reduce((pre, cur) => {
          return parseFloat(pre) + parseFloat(cur);
        });
      } else {
        return (this.moneylisttotal = 0);
      }
    },

    deletesEvent() {
      this.$confirm("是否确认删除选中的" + this.ids.length + "条数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            ids: this.ids,
          };
          // console.info(obj)
          deleteByIds(obj).then((res) => {
            if (res.data === true) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getBooks();
            }
          });
        })
        .catch(() => {});
    },
    buy() {
      this.$router.push({
        path: "/jiesuan2",
        query: {
          tableData: this.multipleSelection,
          price: this.moneylisttotal,
        },
      });
    },
  },
};
</script>

<style scoped>
.shop {
  width: 100%;
  height: 100px;
  background-color: rgb(93, 176, 119);
  margin-top: -20px;
}
.stitle {
  font-size: 30px;
  color: aliceblue;
  margin-left: 50px;
  padding-top: 27px;
}
#czbtn {
  background: none;
  border: none;
  color: gray;
  font-size: 15px;
  width: 90px;
  cursor: pointer;
}
.p {
  margin-left: 44px;
}
.namep {
  font-size: 20px;
  margin-top: 0px;
}
.btn {
  margin-top: 30px;
  margin-left: 250px;
}
.ltitle {
  width: 100%;
}
.img {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  width: 30%;
  margin-left: 10px;
}
</style>