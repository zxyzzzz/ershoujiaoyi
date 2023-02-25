<template>
  <div class="containerjiesuan">
    <i
      class="el-icon-back"
      @click="goback"
      style="font-size: 15px; cursor: pointer; color: grey; padding: 20px"
      >返回</i
    >
    <p
      style="
    font-size: 25px;
        margin-left: 125px;
        color: grey;
        margin-top: -45px;
      "
    >
      确认订单信息
    </p>
    <div class="jiesuan">
      <p style="font-size: 20px; margin-left: 20px">商品信息</p>
      <el-container
        v-for="item in tableData"
        :key="item.index"
        style="margin-top: 40px"
      >
        <el-aside style="width: 400px">
          <img style="width: 200px; margin-left: 50px" :src="item.img" />
        </el-aside>
        <el-main>
          <div class="name">
            <span class="title">商品名：</span>{{ item.name }}
          </div>
          <el-divider></el-divider>
          <div style="margin-top: 10px">
            <span class="title">分类：</span> {{ item.classify }}
          </div>
          <div style="margin-top: 10px">
            <span class="title">价格：</span>{{ item.price }}
          </div>
          <div style="margin-top: 10px">
            <span class="title">详细信息：</span>{{ item.details }}
          </div>
        </el-main>
      </el-container>

      <p style="font-size: 20px; margin-left: 20px; padding-top: 20px">
        选择收货方式:
      </p>
      <el-radio style="margin-left: 60px" v-model="radio" label="1"
        >线下交货</el-radio
      >
      <el-radio v-model="radio" label="2">快递发货</el-radio>
      <div v-if="radio == 2">
        <p class="p" style="height: auto">
          选择地址：
          <el-table
            ref="table"
            @selection-change="handleSelectionChange"
            :data="adData"
            border
            style="width: 98%; margin-top: 20px"
          >
          <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column prop="consignee" label="收货人" width="100">
            </el-table-column>
            <el-table-column prop="province" label="所在地区" width="137">
            </el-table-column>
            <el-table-column prop="city" label="所在地区" width="140">
            </el-table-column>
            <el-table-column prop="area" label="所在地区" width="140">
            </el-table-column>
            <el-table-column prop="detail_addr" label="详细地址" width="230">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" width="130">
            </el-table-column>
          </el-table>
        
        </p>
      </div>
      <div v-if="radio == 1">
        <el-form :model="addrForm" ref="addrForm" style="margin-left:60px;margin-top: 20px;">
          <el-form-item style="font-size:16px" label="选择校内交易地点：">
          <el-input v-model="addr_detail" style="width:230px;" placeholder="请输入地址"></el-input>
        </el-form-item>
        
        </el-form>
       
      </div>
      <p style="font-size: 20px; margin-left: 20px">付款方式:</p>
      <div
        style="width: 250px;
          height: 100px;
          border: 1px solid brown;
          margin-left: 700px;"
      >
        <p style="margin-left:30px">实付款：</p>
        <p style="font-size:25px;margin-left:80px;color: brown;margin-top: -10px;">￥{{ price }}</p>
      </div>
      <el-button @click="submit1" class="submit" type="primary" plain>提交订单</el-button>
    </div>
    
  </div>
</template>
    
    <script>
import axios from "axios";
import AddDizhi from "./AddDizhi.vue";
export default {
  components: { AddDizhi },
  data() {
    return {
      addrForm:{
        addr_detail:""
      },
      addr_detail:"",
      nvisible: false,
      radio: "1",
      tableData: [],
      name: "",
      multipleSelection: [],
      adData: [
      // {
      //     consignee: "张三",
      //     user_no:"19161020238",
      //     province:"四川",
      //     city:"成都",
      //     area:"武侯",
      //     detail_addr: "xxxxxxxxxxxxxxxxx",
      //     tel: "13800000000",
      //     id:"1"
      //   },
      //   {
      //     consignee: "李四",
      //     user_no:"19161020223",
      //     province:"四川",
      //     city:"宜宾",
      //     area:"翠屏区",
      //     detail_addr: "xxxxxxxxxxxxxxxxx",
      //     tel: "13800000000",
      //     id:"2"
      //   },
      //   {
      //     consignee: "王五",
      //     user_no:"19161020223",
      //     province:"四川",
      //     city:"自贡市",
      //     area:"自流井区",
      //     detail_addr: "xxxxxxxxxxxxxxxxx",
      //     tel: "13800000000",
      //     id:"3"
      //   },
      ],
      price:''
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.tableData = this.$route.query.tableData;
    this.price = this.$route.query.price;
    window.jiesuan2=this;
    this.query();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    handleSelectionChange(val) {
      // 单选
      if (val.length > 1) {
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(val.pop());
      }
      this.multipleSelection = val;
    },
    close(e) {
      this.nvisible = e;
    },
    query(){
      let params = {
        user_no:sessionStorage.getItem("user_no")
      };
      axios.post('/query-addr',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.adData = res.data.data;
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
    },
    
    async submit1(){
      for(let i=0;i<this.tableData.length;i++){
        let item = this.tableData[i];
        let params = {
          "user_no":sessionStorage.getItem("user_no"),
          "goods_id":item.id,
          "order_status":"0",
          "receiving_method":this.radio,
          // "addr_id":,
          // "addr_detail":
        }
        if(params.receiving_method == 2){
          params.addr_id = this.multipleSelection[0].id;
        }else{
          params.addr_detail = this.addr_detail;
        }
        this.$router.push({path:'/'});
        axios.post('/add-order',params)
        .then( (res)=> {
          if(res.status ==200 && res.data.errorcode==0){
            this.$message({
              message: '结算成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '结算失败'+res.data.message,
              type: 'error'
            });
          }
        })
      }
    }
  },
};
</script>
    
    <style scoped>
.containerjiesuan {
  background-color: rgb(93, 176, 119, 0.2);
  width: 100%;
  height: auto;
  padding-bottom: 90px;
}
.jiesuan {
  border: 1px solid grey;
  margin-left: 128px;
  margin-top: 40px;
  width: 80%;
  background-color: white;
}
.name {
  font-size: 20px;
  margin-top: 0px;
}
.btn {
  margin-top: 30px;
  margin-left: 250px;
}
.title {
  font-size: 18px;
  margin-right: 20px;
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
.input {
  height: 25px;
  margin-left: 20px;
}
.ltitle {
  display: inline-block;
  width: 120px;
  font-size: 15px;
}
.p {
  height: 40px;
  margin-left: 50px;
}
.label {
  display: inline-block;
  width: 125px;
}
.submit {
  margin-left: 80%;
  margin-bottom: 80px;
  margin-top: 30px;
}
</style>