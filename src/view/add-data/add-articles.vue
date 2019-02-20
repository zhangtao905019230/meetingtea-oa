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

  .test{
    position: absolute;
    top: 0;
    left: 0;
    background-color: #2b569a;
  }
</style>
<template>
  <div class="add-articles">
    <!--<el-button type="primary" style=" margin-bottom: 14px" @click="previewArticle">预览</el-button>-->
    <!--<el-button type="primary" style=" margin-bottom: 14px" @click="uploadMd">上传md</el-button>-->
    <!--<el-button type="primary" style=" margin-bottom: 14px" @click="uploadArticle">上传文章</el-button>-->

    <!--<select-image @change="selectImageChange"></select-image>-->
    <!--<div class="wrap">-->
      <!--<div id="editor-area"></div>-->
      <!--<div id="article-display-area" v-html="articleDisplayAreaVal"></div>-->
    <!--</div>-->
    <el-form>
      <el-form-item label="文章标题" label-width="80px">
        <el-input style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="文章描述" label-width="80px">
        <el-input style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="文章描述" label-width="80px">
        <el-input style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="标签" label-width="80px">
        <el-input readonly style="width: 500px"></el-input>
        <el-button>添加</el-button>
      </el-form-item>
      <el-form-item label="内容" label-width="80px">
        <div :style="{width:w+'px',height:h+'px'}" class="test">

        </div>
        <!--<markdown-editor></markdown-editor>-->
      </el-form-item>
    </el-form>
    <!--<div id="editor-area"></div>-->
  </div>
</template>

<script>
  import marked from 'marked'
  import MarkdownEditor from './../../widget/markdown-editor'
  // import axios from 'axios'
  import ArticlesDbOperation from '../../service/articles-db-operation'
  import Utiles from '../../utiles'
  import SelectImage from '../../widget/select-image'
  export default {
    components:{
      'select-image': SelectImage,
      'markdown-editor': MarkdownEditor
    },
    data(){
      return{
        articleDisplayAreaVal:'',
        editor:'',
        dialogVisible:false,
        w:0,
        h:0
      }
    },
    mounted(){
      let _this = this
      window.onresize=function () {
        var w = document.documentElement.offsetWidth || document.body.offsetWidth
        var h = document.documentElement.offsetHeight || document.body.offsetHeight
        // console.log(h)
        _this.w=w
        _this.h=h
      }
    },
    methods:{

      // previewArticle(){
      //   this.articleDisplayAreaVal = marked(this.editor.getValue())
      // },
      // uploadArticle(){
      //   let req = {
      //     articleVal:this.editor.getValue(),
      //     createTime:Utiles.GetTime()
      //   }
      //   ArticlesDbOperation.AddArticle(this.dataInterface,req).then(res=>{
      //     console.log(res)
      //   })
      // },
      // uploadMd(){
      //
      // },
      // selectImageChange(val){
      //   this.editor.setValue(val)
      // }
    }
  }
</script>
