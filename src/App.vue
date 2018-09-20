<template>
  <router-view></router-view>
</template>
<style>
  body,html{height: 100%}
  @font-face {
    font-family: 'iconfont';  /* project id 803857 */
    src: url('//at.alicdn.com/t/font_803857_qco7qk900h.eot');
    src: url('//at.alicdn.com/t/font_803857_qco7qk900h.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_803857_qco7qk900h.woff') format('woff'),
    url('//at.alicdn.com/t/font_803857_qco7qk900h.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_803857_qco7qk900h.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family:"iconfont" !important;
    font-style:normal;
    margin-right: 5px;
  }
  .iconfont:before{margin-right: 5px}

  .icon-shujuguanli:before{content: "\e609";}
  .icon-tianjiashuju:before{content: "\e6ac";}
  .icon-dingdan:before{content: "\e61a"}
  .icon-wenjianguanli:before{content: "\e619";}
  .icon-shezhi:before{content: "\e655";}
  .icon-shangpinliebiao:before{content: "\e60d";}
  .icon-tianjiayonghu:before{content: "\e608";}
  .icon-tianjiashangpin:before{content: "\e60a";}
</style>
<script>
  export default {
    mounted(){
      // console.log(this.process,'xsaxsaca')
    }
  }
</script>
