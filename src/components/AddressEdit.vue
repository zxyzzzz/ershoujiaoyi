<template>
  <div>
    <el-form :model="tableData"
        ref="tableData"
        :label-position="labelPosition"
        label-width="120px"
        style="margin-left: 30px">
      <el-form-item
          label="收货人"
          prop="consignee">
        <el-input style="width: 250px" v-model="tableData.consignee">
        </el-input>
      </el-form-item>
      <el-form-item
          label="学号"
          prop="user_no">
        <el-input style="width: 250px" v-model="tableData.user_no">
        </el-input>
      </el-form-item>
      <el-form-item
          label="省"
          prop="province">
        <el-input style="width: 250px" v-model="tableData.province">
        </el-input>
      </el-form-item>
      <el-form-item
          label="市"
          prop="city">
        <el-input style="width: 250px" v-model="tableData.city">
        </el-input>
      </el-form-item>
      <el-form-item
          label="区/县"
          prop="area">
        <el-input style="width: 250px" v-model="tableData.area">
        </el-input>
      </el-form-item>
      <el-form-item
          label="详细地址"
          prop="detail_addr">
        <el-input style="width: 250px" v-model="tableData.detail_addr">
        </el-input>
      </el-form-item>
      <el-form-item
          label="联系电话"
          prop="tel">
        <el-input style="width: 240px" v-model="tableData.tel">
        </el-input>
      </el-form-item>
    </el-form>
    <div style="margin-top:50px">
      <el-button style="margin-left: 220px" @click="cancel">取 消</el-button>
      <el-button @click="editaddr">保 存</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["tableData"],
  data() {
    return {
      labelPosition:"left",
      // tableData:[]
      uvisible:false
    };
  },
  methods: {
    cancel() {
      this.$emit("update", this.uvisible);
      this.uvisible = false;
      console.log(this.uvisible)
    },
    async editaddr(){
      this.$emit("update", this.uvisible);
      this.uvisible = false;
      let params = {
        "consignee":this.tableData.name,
        "user_no":this.tableData.user_no,
        "province":this.tableData.province,
        "city":this.tableData.city,
        "area":this.tableData.area,
        "detail_addr":this.tableData.detail_addr,
        "tel":this.tableData.tel,
        id:this.tableData.id
      }
      axios.post('/edit-addr',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }else{
          this.$message({
            message: '修改失败'+res.data.message,
            type: 'error'
          });
        }
      })
      .catch(res => {
        debugger
        this.$message({
            message: '修改失败'+res.response.data.message,
            type: 'error'
          });
        //注册失败
      })
    }
  },
};
</script>

<style scoped>
.input {
  height: 25px;
  margin-left: -50px;
}
.ltitle {
  display: inline-block;
  width: 120px;
  font-size: 15px;
}
.p {
  height: 40px;
  margin-left: 170px;
}
</style>