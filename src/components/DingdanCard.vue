<template>
  <div class="container"  style="height:100%">
    <el-container>
        <el-aside style="width:300px">
        <img style="width:210px" :src="`/download?url=${tableData.goods_img_url}`"/>
    </el-aside>
    <el-main
          style="
      word-break: break-all;
            word-wrap: break-word;
            margin-left: 20px;
          "
        >
          <div class="name">{{tableData.goods_name }}</div>
          <el-divider></el-divider>
          <div style="margin-top: 20px;"><span class="title">分类：</span> {{tableData.goods_type|transformGoods_type }}</div>
          <div style="margin-top: 20px;"><span class="title">价格：</span>{{ tableData.goods_price }}</div>
          <div style="margin-top: 20px;"><span class="title">详细信息：</span>{{ tableData.goods_detail }}</div>
          <el-divider></el-divider>
        </el-main>
    </el-container>
    
  </div>
</template>

<script>
export default {
  props: {tableData:{type: Object,}},
  data() {
    return {
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
  mounted() {
    console.log(this.tableData);
  },
}
</script>

<style  scoped>
.title{
    font-size: 17px;
}
.name{
    font-size: 23px
}
</style>>

