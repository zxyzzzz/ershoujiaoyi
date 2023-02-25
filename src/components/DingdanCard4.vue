<template>
  <div class="container" style="height: 100%">
    <el-container>
      <el-aside style="width: 300px">
        <img style="width: 210px" :src="tableData.img" />
      </el-aside>
      <el-main
        style="word-break: break-all; word-wrap: break-word; margin-left: 20px"
      >
        <div class="name">{{ tableData.name }}</div>
        <el-divider></el-divider>
        <div style="margin-top: 20px">
          <span class="title">分类：</span> {{ tableData.classify }}
        </div>
        <div style="margin-top: 20px">
          <span class="title">价格：</span>{{ tableData.price }}
        </div>
        <div style="margin-top: 20px">
          <span class="title">详细信息：</span>{{ tableData.details }}
        </div>
        <el-divider></el-divider>
        <button class="btn">联系卖家</button>
        <button class="btn" @click="open">确认收货</button>
      </el-main>
     
    </el-container>
    
  </div>
</template>
  
  <script>
export default {
  props: { tableData: { type: Object } },
  data() {
    return {

    };
  },
  mounted() {
    console.log(this.tableData);
  },
  methods:{
    open() {
        this.$confirm('是否确认收货?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已收货!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }
  }
};
</script>
  
  <style  scoped>
.title {
  font-size: 17px;
}
.name {
  font-size: 23px;
}
</style>>
  
  