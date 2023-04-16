<template>
    <div>
            <div class="head_img">
              <img :src="goods_img_url_download" style="width:200px" />
            </div>
            <div class="setting_right" @click.stop="uploadHeadImg">
            </div>
            <input
              type="file"
              accept="image/*"
              @change="handleFile"
              class="hiddenInput"
              ref="goodsImg"
            />
            <el-button @click="submit()" style="margin-left: 45%;margin-top: 50px;">
                上传</el-button>
    </div>
</template>
<script>
import axios from "axios";
import commonUtils from "../utils/commonUtils"
export default{
    props: ["tableData"],
    data(){
        return{
            goods_img_base64:"",
            goods_img_url:"",
            cardvisible1:false
        }
    },
    computed:{
        goods_img_url_download(){
      // user/book.jpg
      if(this.goods_img_base64) return this.goods_img_base64;
      return "/download?url=" +this.goods_img_url;
    }
  },
    methods:{
        uploadHeadImg: function () {
      this.$el.querySelector(".hiddenInput").click();
    },
    // 将头像显示
    handleFile: function (e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = (data) => {
        let res = data.target || data.srcElement;
        this.goods_img_base64 = res.result;
      };
      reader.readAsDataURL(file);
    },
    async submit(){
        let files = this.$refs.goodsImg.files;
      let goods_img_url = "";
      if(files.length>0){
        let url = await commonUtils.upload(files[0],"apl");
        goods_img_url = url;
      }
      let params = {
        "user_no":sessionStorage.getItem("user_no"),
        "img_url":goods_img_url,
        "order_id":this.tableData.id,
        "apl_status":'0',
        "id":this.tableData.id
      }
      axios.post('/add-pay-apl',params)
        .then(res =>{
          if(res.status ==200 && res.data.errorcode==0){
            this.$message({message: '上传成功',type: 'success'});
          }else{
            this.$message({message: '上传失败',type: 'error'});
          }
        })
        this.$emit("update", this.cardvisible1);
        this.cardvisible1 = false;
    },
    }
}
</script>
<style scoped>

</style>