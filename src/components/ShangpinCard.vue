<template>
  <div class="cards">
    <div class="imgs">
      <img id="imgs" :src="tableData.goods_img_url" @click="dialogTableVisible1 = true" />
    </div>
    <div>
      <p class="names">{{ this.tableData.goods_name }}</p>
      <p class="prices">{{ this.tableData.goods_price }}</p>
    </div>
    <el-dialog title="商品详情" :visible.sync="dialogTableVisible1">
      <div class="card">
        <el-container style="height: 100%">
          <el-aside width="300px">
            <el-main><img :src="tableData.goods_img_url" style="width: 210px" /></el-main>
          </el-aside>
          <el-main
            style="
          word-break: break-all;
          word-wrap: break-word;
             margin-left: 20px;
            "
          >
            <div class="name">{{ this.tableData.goods_name }}</div>
            <el-divider></el-divider>
            <div style="margin-top: 20px">
              <span class="title">分类：</span> {{ this.tableData.goods_type }}
            </div>
            <div style="margin-top: 20px">
              <span class="title">价格：</span>{{ this.tableData.goods_price }}
            </div>
            <div style="margin-top: 20px">
              <span class="title">详细信息：</span>{{ this.tableData.goods_detail }}
            </div>
            <el-divider></el-divider>
            <button class="btn" :plain="true"  @click="addCart">加入购物车</button>
            <button class="btn" @click="buy">立即购买</button>
          </el-main>
        </el-container>
      
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["tableData"],
  data() {
    return {
      dialogTableVisible1: false,
      // tableData:'',
    };
  },
  methods: {
    open2() {
        
      },
    buy() {
      let user_no = sessionStorage.getItem("user_no");
      if(user_no){
        this.$router.push({ path: "/jiesuan", query: {tableData:this.tableData}});
      }else{
        this.$message({message: '请登录',type: 'error'});
      }
      
    },
    addCart(){
      let user_no = sessionStorage.getItem("user_no");
      if(user_no){
        let params = {
        "user_no":sessionStorage.getItem("user_no"),
        "goods_id":this.tableData.id
      }
      axios.post('/add-shoppingcart',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.$message({
            message: '已加入购物车',
            type: 'success'
          });
          this.$router.push({ path: "/shoopcart"});
        }else{
          this.$message({
            message: '添加失败'+res.data.message,
            type: 'error'
          });
        }
      })
      }else{
        this.$message({message: '请登录',type: 'error'});
      }
      
    }
  },
  mounted(){
  }
};
</script>

<style scoped>
.title {
  font-size: 17px;
}
.name {
  font-size: 23px;
}
.names {
  text-align: center;
}
.prices {
  text-align: center;
  color: gray;
}
.cards {
  background-color: rgb(237, 247, 250);
  border-radius: 10px;
  width: 210px;
  height: 300px;
  float: left;
  margin: 5px;
  padding: 10px;
}
.cards:hover {
  background-color: white;
}
.imgs {
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#imgs {
  max-width: 100%;
  max-height: 100%;
}
.el-dialog {
  width: 60%;
}
.closec {
  float: right;
  margin-top: -60px;
}
</style>