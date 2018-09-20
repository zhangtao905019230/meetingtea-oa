<style scoped>
  .logo-component{height: 113px;width: 253px;position: relative;margin: 0 auto}
  .logo-component>.baikuang0{width: 235px;height: 95px;border: 3px solid rgb(191, 202, 217);position: absolute;top: 0;left: 0;}
  .logo-component>.baikuang1{width: 235px;height: 95px;border: 3px solid rgb(191, 202, 217);position: absolute;top: 12px;left: 12px;}
  .logo-component>.logo_name{font-size: 35px;position: absolute;top: 13px;left: 32px;color: rgb(191, 202, 217)}
  .logo-component>.slogan{font-size: 16px;position: absolute;top: 65px;left: 70px;;color: rgb(191, 202, 217)}
</style>
<template>
  <div class="logo-component-wrap">
    <div class="logo-component" :style="{zoom:zoomVal}">
      <div class="baikuang0"></div>
      <div class="baikuang1"></div>
      <p class="logo_name">meetingtea</p>
      <p class="slogan">遇见茶，遇见你。</p>
    </div>
  </div>
</template>
<script>
  export default {
    props:['zoomVal']
  }
</script>
