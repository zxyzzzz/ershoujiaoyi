<template>
  <div>
    <!-- 留言管理 -->
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" id="showbtn" @click="show(1)" :class="index === 1 ? 'active1' : ''" style="background:none">用户留言</el-menu-item>
      <el-menu-item index="2" id="showbtn" @click="show(2)" :class="index === 2 ? 'active1' : ''">用户重置密码申请</el-menu-item>
      
      </el-menu>
      <div class="tab_content">
          <keep-alive>
            <component :is="comp"  v-show="isShow"></component>
          </keep-alive>
        </div>
  </div>
</template>

<script>
import UserLiuyan from './UserLiuyan.vue'
import UserShenqing from './UserShenqing.vue'
export default {
  components:{UserLiuyan,UserShenqing},
  data(){
    return{
      activeIndex: "1",
      comp:'UserLiuyan',
      isShow: true,
      index: 1,
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    show(value) {
      if (this.index === value) {
        this.index = 0;
        this.isShow = !this.isShow;
      } else {
        this.index = value;
        this.isShow = true;
      }
      if (value === 1) {
        this.comp = "UserLiuyan";
      }
      if (value === 2) {
        this.comp = "UserShenqing";
      }
  },
}

}
</script>

<style>

</style>