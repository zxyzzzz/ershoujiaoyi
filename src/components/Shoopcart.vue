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
            <img :src="scope.row.img" style="width: auto; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="260">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="170">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="info"
              plain
              id="czbtn"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination style="margin-left:300px;margin-top:40px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination> -->
    </el-card>
    <el-dialog title="商品详情" :visible.sync="scardvisible">
      <shopcart-card v-if="scardvisible" :tableData="goodsdetail" />
    </el-dialog>
  </div>
</template>

<script>
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
        {
          img: require("../img/yule2.jpg"),
          name: "圆号",
          price: "788",
          classify: "生活娱乐",
          details: "九成新圆号一把，一折价处理",
          id:"6"
        },
        
        {
          img: require("../img/meizhuang2.jpg"),
          name: "雅诗兰黛小棕瓶",
          price: "520",
          classify: "个护美妆",
          details:
            "雅诗兰黛小棕瓶100ML，全新未拆 购于免税店，两瓶套装。现在出一瓶。 100%正品",
            id:"9"
        },
        {
          img: require("../img/shouji1.jpg"),
          name: "iPhone12 128G",
          price: "2500",
          classify: "手机电脑",
          details:
            "iPhone12 128G 白色 国行双卡,全网通,二手原装,无拆修,99新外观很新,配件齐全,支持七天无理由退换,保修一年 ",
            id:"10"
        },
        {
          img: require("../img/traffic1.jpg"),
          name: "美利达领航300",
          price: "998 ",
          details:
            "美利达领航者300，全车原版，前叉减震，前后双碟刹，禧玛诺变速器，前后快拆轮毂。26圈，16寸车架，适合160cm到180cm人群骑行",
          classify: "交通出行",
          id:"11"
        },
      ],
      goodsdetail:{},
      multipleSelection: [],
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
    };
  },
  mounted() {
    // this.$eventBus.on("changeMsg", this.getMsg);
    console.log(this.$route.query);
    this.tableData.push(this.$route.query.tableData)  ;
    
  },
  created() {
    this.handleUserList();
    this.$storage.setLocal(this.$route.query.tableData,'tableData')
    console.log(this.tableData+"222")
  },
  methods: {
    handleDetail(row) {
      this.scardvisible = true; // 打开“卡券详情”对话框
      this.goodsdetail = row; // 把对应行数据赋值给data里的detailData
      console.log(this.goodsdetail+"111")
    },
    // // 初始页currentPage、初始每页数据数pagesize和数据data
    // handleSizeChange: function (size) {
    //   this.pagesize = size;
    //   console.log(this.pagesize); //每页下拉显示数据
    // },
    // handleCurrentChange: function (currentPage) {
    //   this.currentPage = currentPage;
    //   console.log(this.currentPage); //点击第几页
    // },
    handleUserList() {
      this.userList = tableData;
    },
    getMsg(msg) {
      this.Bmsg = msg;
      console.log(msg);
    },
    deleteUser(index) {
      this.tableData.splice(index, 1);
    },
  
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      this.moneylist = this.$refs.multipleTable.selection.map(
        (item) => item.price
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