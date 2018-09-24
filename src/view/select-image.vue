<template>
  <div class="select-image">
    <el-button @click="openDialog">选择图片</el-button>
    <el-dialog
      title="选择商品展示图"
      :visible.sync="dialogVisible"
      width="61.8%"
      :before-close="handleClose">
      <div>
        <el-form>
          <el-form-item label="图片路径：">
            <el-input style="width: 60%;margin-bottom: 30px" v-model="selectImageUrl"></el-input>
            <el-button @click="getImageUrl" v-loading.fullscreen.lock="fullscreenLoading">显示该文件路径</el-button>
          </el-form-item>
        </el-form>
        <div id="elfinder"></div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        PHP_interface: 'http://101.132.46.146:8080/elfinder/php/connector.minimal.php',
        dialogVisible: false,
        selectImageUrl:'',
        currentlySelectedFiles:'',
        fullscreenLoading: false
      }
    },
    mounted(){

    },
    methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      initElfinder(){
        console.log(JSON.parse(localStorage.getItem('resData')))
        let user_info = JSON.parse(localStorage.getItem('resData'))
        let _this = this
        $(function() {
          $('#elfinder').elfinder(
            {
              cssAutoLoad : false,
              baseUrl : './',
              url : _this.PHP_interface + '?username='+user_info.user_name,
              getFileCallback : function(file) {},
              handlers : {
                select : function(event, elfinderInstance) {
                  _this.currentlySelectedFiles = event.data.selected
                }
              },
              lang : 'zh_CN'
            },
            function(fm, extraObj) {
              fm.bind('init', function() {
                delete fm.options.rawStringDecoder;
                if (fm.lang === 'ja') {
                  fm.loadScript(
                    [ fm.baseUrl + 'js/extras/encoding-japanese.min.js' ],
                    function() {
                      if (window.Encoding && Encoding.convert) {
                        fm.options.rawStringDecoder = function(s) {
                          return Encoding.convert(s,{to:'UNICODE',type:'string'});
                        };
                      }
                    },
                    { loadType: 'tag' }
                  );
                }
              });
              var title = document.title;
              fm.bind('open', function() {
                var path = '',
                  cwd  = fm.cwd();
                if (cwd) {
                  path = fm.path(cwd.hash) || null;
                }
                document.title = path? path + ':' + title : title;
              }).bind('destroy', function() {
                document.title = title;
              });
            }
          );
        });
      },
      openDialog(){
        this.dialogVisible = true
        setTimeout(()=>{
          this.initElfinder()
        },0)
      },
      getImageUrl(){
        let _this = this
        _this.fullscreenLoading = true;
        axios.get(_this.PHP_interface,{params: {
            username: JSON.parse(localStorage.getItem('resData')).user_name,
            cmd : 'info',
            targets : _this.currentlySelectedFiles
          }}).
        then(res => {
          _this.fullscreenLoading = false;
          _this.selectImageUrl = 'http://101.132.46.146:8080/elfinder/files/' + res.data.files[0].path.replace(/\\/g, '/')
        })
      },
      confirmSelect(){
        this.dialogVisible = false
        this.$emit("change",this.selectImageUrl)
      }
    }
  }
</script>
