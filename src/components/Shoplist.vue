<template>
  <div>
    <div class="lrow">
      <div class="list">
        <shoplist-1></shoplist-1>
      </div>
      <div class="list"></div>
      <div class="list"></div>
    </div>
    <div class="lrow">
      <div class="list"></div>
      <div class="list"></div>
      <div class="list"></div>
    </div>
  </div>
</template>

<script>
import Shoplist1 from './Shoplist1.vue';
export default {
  components: {  Shoplist1 },};
</script>

<style>
.list {
  margin-left: 23px;
  margin-right: 20px;
  margin-top: 30px;
  position: relative;
  float: left;
  width: 29%;
  height: 190px;
  background-color: white;
  border-radius: 10px;
}
.list:hover{
  background-color:rgb(93, 176, 119,0.1);
}
</style>