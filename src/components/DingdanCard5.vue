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
        <button class="btn" @click="open">去评价</button>
      </el-main>
    </el-container>
    <el-dialog
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="text-panel">
        <textarea class="text-area" placeholder="请输入评价内容"></textarea>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  props: { tableData: { type: Object } },
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    console.log(this.tableData);
  },
  methods:{
    open() {
        this.$prompt('请输入评价', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
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
.text-area{
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid lightgrey;
  font-size: 16px;
  resize: none;
}
</style>>
  
  