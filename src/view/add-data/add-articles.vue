<style>
  .add-articles{height: 100%}
  .add-articles>.wrap{
    display: flex;
    height: calc(100% - 50px);
  }
  #editor-area{
    width:50%;
  }
  #article-display-area{
    width: 50%;
    padding: 10px 20px;
    background-color: rgb(241,241,241);
    overflow-y: scroll;
  }
</style>
<template>
  <div class="add-articles">
    <el-button type="primary" style=" margin-bottom: 14px" @click="previewArticle">预览</el-button>
    <el-button type="primary" style=" margin-bottom: 14px" @click="uploadMd">上传md</el-button>
    <el-button type="primary" style=" margin-bottom: 14px" @click="uploadArticle">上传文章</el-button>

    <select-image @change="selectImageChange"></select-image>
    <div class="wrap">
      <div id="editor-area"></div>
      <div id="article-display-area" v-html="articleDisplayAreaVal"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  // import axios from 'axios'
  import ArticlesDbOperation from '../../service/articles-db-operation'
  import Utiles from '../../utiles'
  import SelectImage from '../../widget/select-image'
  export default {
    components:{
      'select-image': SelectImage
    },
    data(){
      return{
        articleDisplayAreaVal:'',
        editor:'',
      }
    },
    mounted(){
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


      // console.log(Utiles.FormatTime(Utiles.GetTime()))

    },
    methods:{
      previewArticle(){
        this.articleDisplayAreaVal = marked(this.editor.getValue())
      },
      uploadArticle(){
        let req = {
          articleVal:this.editor.getValue(),
          createTime:Utiles.GetTime()
        }
        ArticlesDbOperation.AddArticle(this.dataInterface,req).then(res=>{
          console.log(res)
        })
      },
      uploadMd(){

      },
      selectImageChange(val){
        this.editor.setValue(val)
      }
    }
  }
</script>
