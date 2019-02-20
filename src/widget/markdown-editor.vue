<style>

</style>
<template>
  <div class="markdown-editor" style="height: 100%">
    <div class="wrap" style="width: 100%;height: 100%;display: flex">
      <div id="editor-area" style="height: 100%;width: 50%"></div>
      <div class="web-page-display" style="width: 50%;height:100%;background-color: seagreen"></div>
    </div>
  </div>
</template>
<script>
  import marked from 'marked'
  export default {
    data(){
      return{
        editor:''
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        let rendererMD = new marked.Renderer();
        marked.setOptions({
          renderer: rendererMD,
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        });

        this.editor = ace.edit('editor-area');
        this.editor.setFontSize(14);
        this.editor.setOption("wrap", "free")
      }
    }
  }
</script>
