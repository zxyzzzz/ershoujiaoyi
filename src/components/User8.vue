<template>
  <div class="bd">
    <div>
      <form method="post">
          <div >
            <el-container>
              <el-aside style="width:200px">
                <div class="head_img">
              <img :src="head_img_url_download" style="width: 100px; margin-left: 40px" />
            </div>
              </el-aside>
              <el-main>
                <div class="setting_right" @click.stop="uploadHeadImg">
              <div class="caption">更改头像</div>
            </div>
            <input
              type="file"
              accept="image/*"
              @change="handleFile"
              class="hiddenInput"
              ref="headImage"
            />
              </el-main>
            </el-container>
            
           
          <p class="p">
            <label class="ltitle">用户名：<em>*</em></label>
            <input type="text" v-model="user_name" maxlength="25" class="input" />
          </p>
          <p class="p">
            <label class="ltitle">用户类型：<em>*</em></label>
            <label style="margin-left: 20px">{{ user_type|transformUserType }}</label>
          </p>
          <p class="p">
            <label class="ltitle">学号：<em>*</em></label>
            <input readonly v-model="user_no" maxlength="25" class="input" />
          </p>
          <p class="p">
            <label class="ltitle">电话号码：<em>*</em></label>
            <input v-model="tel" maxlength="25" class="input" />
          </p>
          <p class="p">
            <label class="ltitle">性别：</label>
            <el-radio style="margin-left: 60px" v-model="sex" label="1"
              >男</el-radio
            >
            <el-radio v-model="sex" label="2">女</el-radio>
          </p>
          <p class="p">
            <label class="ltitle">生日：</label>
            <select v-model="year" name="" id="birthdayYear" class="select">
              <option value="0" selected="selected">请选择：</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
              <option value="1999">1999</option>
              <option value="1998">1998</option>
              <option value="1997">1997</option>
              <option value="1996">1996</option>
              <option value="1995">1995</option>
              <option value="1994">1994</option>
              <option value="1993">1993</option>
              <option value="1992">1992</option>
              <option value="1991">1991</option>
              <option value="1990">1990</option>
              <option value="1989">1989</option>
              <option value="1988">1988</option>
              <option value="1987">1987</option>
              <option value="1986">1986</option>
              <option value="1985">1985</option>
              <option value="1984">1984</option>
              <option value="1983">1983</option>
              <option value="1982">1982</option>
              <option value="1981">1981</option>
              <option value="1980">1980</option>
            </select>
            <label>年</label>
            <select v-model="month" name="" id="birthdayMonth" class="select">
              <option value="0" selected="selected">请选择：</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <label>月</label>
            <select v-model="day" name="" id="birthdayDay" class="select">
              <option value="0" selected="selected">请选择：</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
            </select>
            <label>日</label>
          </p>
          <!-- <p class="p">
            地址
            <label style="margin-left: 50px">省:</label>
            <input class="input" style="width: 75px" />
            <label style="margin-left: 20px">市:</label>
            <input class="input" style="width: 75px" />
            <label style="margin-left: 20px">区/县:</label>
            <input class="input" style="width: 75px" />
            <label style="margin-left: 20px">详细地址:</label>
            <input class="input" style="width: 125px" />
          </p> -->
        </div>
        <div>
          <span class="save">
            <el-button
              @click="save"
              type="submit"
              style="width: 100px; height: 40px; margin-top: 10px"
              >保存</el-button
            >
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import commonUtils from "../utils/commonUtils"
export default {
  data() {
    return {
      radio: "1",
      src: require("../img/touxiang.jpg"),
      head_img_url:"",
      user_name:"",
      user_type:"",
      user_no:"",
      tel:"",
      sex:"",
      year:"",
      month:"",
      day:"", 
    };
  },
  computed:{
    head_img_url_download(){
      // user/book.jpg
      return "/download?url=" +this.head_img_url;
    }
  },
  methods: {
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
        this.src = res.result;
      };
      reader.readAsDataURL(file);
    },


    async query(){
      let params = {
        "user_no":sessionStorage.getItem("user_no")
      }
      axios.post('/user-query',params)
      .then( (res)=> {
        if(res.status ==200 && res.data.errorcode==0){
          let data = res.data.data[0];
          this.head_img_url = data.head_img_url;
          this.user_name = data.user_name;
          this.user_type = data.user_type;
          this.user_no = data.user_no;
          this.tel = data.tel;
          this.sex = data.sex;
          if(data.birth){//"2023-02-16T16:00:00.000Z"
            data.birth = data.birth.replace(/-/g,"").slice(0,8)
            this.year = data.birth.slice(0,4);
            this.month = data.birth.slice(4,6);
            this.day = data.birth.slice(6);
          }
          
        }
      })
    },
    async save(){
      let files = this.$refs.headImage.files;
      if(files.length>0){
        let url = await commonUtils.upload(files[0],"user/info");
        this.head_img_url = url;
      }
    
      let params = {
        "user_no":sessionStorage.getItem("user_no"),
        "user_name":this.user_name,
        "tel":this.tel,
        "head_img_url":this.head_img_url,
        "sex":this.sex,
        "birth":this.year+this.month+this.day
      }
      axios.post('/user-edit',params)
        .then(res =>{
          if(res.status ==200 && res.data.errorcode==0){
            this.$message({message: '修改成功',type: 'success'});
          }else{
            this.$message({message: '修改失败',type: 'error'});
          }
        })
    }
  },
  mounted(){
    this.query();
  },
  filters:{
    transformUserType(value){
      if(value=="1"){
        return "普通用户";
      }else{
        return "管理员"
      }
    }
  }
};
</script>

<style scoped>
.input {
  height: 25px;
  margin-left: 20px;
}
.select {
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
.save {
  margin-left: 300px;
}
</style>