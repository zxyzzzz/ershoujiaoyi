<template>
<div>
  <RouterView keep-alive></RouterView>
</div>
</template>

<script>
import Home from './components/Home.vue';
import Shangpin from './components/Shangpin.vue';
import Shoplist1 from './components/Shoplist1.vue';
export default {
  components:{Home,Shangpin,Shoplist1}
}
</script>

<style>
html,body,#app {
    height:100%;
}
</style>
