<template>
  <div @click="sendMessage">
    <el-container >
  <el-aside width="190px">
    <img :src="src" style="width:160px;height: 160px;margin-top: 15px;margin-left: 15px;border-radius: 10px;"/>
  </el-aside>
  <el-main style="padding:0">
    <el-container>
  <el-header style="margin-top:25px;font-size: 17px;">{{ name }}</el-header>
  <el-main style="color: rgb(93, 176, 119);font-size: 25px;">{{ price }}</el-main>
</el-container>
  </el-main>
</el-container>

  </div>
</template>

<script>
import { eventBus } from '../main'
export default {
  data(){
    return{
      src:require('../img/img4.jpg'),
      name:'小兔花朵iPhone手机壳',
      price:'￥15'
    }
  },
  methods:{
    sendMessage(){
      this.$router.push({path:'/shangpin'})
      eventBus.$emit('sendname',this.name)
      eventBus.$emit('sendsrc',this.src)
      eventBus.$emit('sendprice',this.price)
    },
  },
 
}
</script>

<style>

</style>