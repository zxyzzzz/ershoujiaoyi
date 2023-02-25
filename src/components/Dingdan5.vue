<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="操作" width="120px" align="left">
        <template slot-scope="{ row }">
          <el-button type="info" plain id="czbtn" @click="handleDetail(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="img" label="封面" width="230">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="255">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="170"> </el-table-column>
      <el-table-column prop="state" label="订单状态" width="160">
      </el-table-column>
    </el-table>
    <el-dialog title="订单详情" :visible.sync="cardvisible">
      <dingdan-card-5 v-if="cardvisible" :tableData="tableData"/>
    </el-dialog>
  </div>
</template>

<script>
import DingdanCard5 from './DingdanCard5.vue';
export default {
  components: {  DingdanCard5 },
  data() {
    return {
      cardvisible: false,
      tableData: [
      {
          img: require("../img/shouji5.jpg"),
          name: "尼康较新款Z卡口800定焦镜头",
          price: "￥6500",
          classify:'手机电脑',
          state:"待评价",
          details:'58000+专配77毫米UV5000，镜徕图（Leofoto） LS-365C+PG-1悬臂镂空云台三脚架套装碳纤维大炮支架 徕图 LS-365C+PG-1，5200 '
        },
      ],
    };
  },
  methods: {
    handleDetail(row) {
      this.cardvisible = true; // 打开“卡券详情”对话框
      this.tableData = row; // 把对应行数据赋值给data里的detailData
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