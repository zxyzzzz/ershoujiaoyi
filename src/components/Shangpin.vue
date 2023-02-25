<template>
  <el-dialog :visible.sync="dialogVisible"
    width="90%">
    <div class="container3">
    <i
      class="el-icon-back"
      @click="goback"
      style="font-size: 20px; cursor: pointer; color: grey; padding: 20px;"
      >返回</i
    >
    <div class="card">
      <el-container style="height: 100%">
        <el-aside width="350px">
          <el-container>
            <el-main><img :src="mainsrc" style="width: 290px" /></el-main>
            <el-footer>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  float: left;
                  width: 30%;
                "
              >
                <img @mouseover="showimg(1)" class="imgbtn" :src="src1" />
              </div>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  float: left;
                  width: 30%;
                  margin-left: 10px;
                "
              >
                <img @mouseover="showimg(2)" class="imgbtn" :src="src2" />
              </div>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  float: left;
                  width: 30%;
                  margin-left: 10px;
                "
              >
                <img @mouseover="showimg(3)" class="imgbtn" :src="src3" />
              </div>
            </el-footer>
          </el-container>
        </el-aside>
        <el-main
          style="
           word-break: break-all;
            word-wrap: break-word;
            margin-left: 20px;
          "
        >
          <div class="name">{{name }}</div>
          <el-divider></el-divider>
          <div class="classify">分类：{{ classify }}</div>
          <div class="price">{{ price }}</div>
          <div class="details">详细信息：{{ details }}</div>
          <el-divider></el-divider>
          <el-button type="success" plain class="btn">联系卖家</el-button>
          <el-button type="success" plain class="btn">立即购买</el-button>
        </el-main>
      </el-container>
    </div>
  </div>
  </el-dialog>
  
</template>

<script>
import { eventBus } from "../main";
export default {
  props: ["abc","name"],
  data() {
    return {
      dialogVisible: false,
      // tableData: [{ url: "", name: "", url: "" }],
      // mainsrc: require("../img/img4.jpg"),
      mainsrc: "",
      src1: require("../img/img4.jpg"),
      src2: require("../img/img4-1.jpg"),
      src3: require("../img/img4-2.jpg"),
      name: "",
      price: "￥15",
      classify: "",
      details:
        " 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。",
      index: 1,
      isShow: true,
    };
  },
  // mounted() {
  //   console.log("-------------------params", this.$route.params);
  //   this.mainsrc = this.$route.params.mainsrc;
  //   this.tableData = this.$route.params.tableData;
  //   console.log("-------------------query", this.$route.query);
  //   console.log("-------------------props", this.abc);
  //   eventBus.$on("sendname", (msg) => {
  //     console.log(msg);
  //     this.name = msg;
  //   });
  //   eventBus.$on("sendsrc", (msg1) => {
  //     console.log(msg1);
  //     this.mainsrc = msg1;
  //   });
  //   eventBus.$on("sendprice", (msg2) => {
  //     console.log(msg2);
  //     this.price = msg2;
  //   });
  // },
  methods: {
    show(obj) {
      this.dialogVisible = true;
    },
    goback() {
      this.$router.go(-1);
    },
    showimg(value) {
      if (this.index === value) {
        this.index = 0;
        this.isShow = !this.isShow;
      } else {
        this.index = value;
        this.isShow = true;
      }
      if (value === 1) this.mainsrc = this.src1;
      if (value === 2) this.mainsrc = this.src2;
      if (value === 3) this.mainsrc = this.src3;
    },
  },
};
</script>

<style>
.container3 {
  width: 100%;
  height: 100%;
  background-color: rgb(93, 176, 119, 0.1);
  position: fixed;
}
.card {
  margin-left: 15%;
  width: 70%;
  height: 450px;
  background-color: white;
}
.imgbtn {
  width: 90%;
}
.name {
  font-size: 30px;
}
.classify {
  margin-top: 20px;
}
.price {
  font-size: 25px;
  margin-top: 20px;
}
.details {
  margin-top: 20px;
}
.btn {
  margin-top: 30px;
  margin-left: 60px;
}
</style>