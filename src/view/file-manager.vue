<template>
  <div id="elfinder">
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        PHP_interface: 'http://101.132.46.146:8080/elfinder/php/connector.minimal.php',
      }
    },
    mounted(){
      console.log(JSON.parse(localStorage.getItem('resData')))
      let user_info = JSON.parse(localStorage.getItem('resData'))
      let _this = this;
      $(function() {
        $('#elfinder').elfinder(
          {
            cssAutoLoad : false,
            baseUrl : './',
            url : _this.PHP_interface + '?username='+user_info.user_name,
            getFileCallback : function(file) {},
            handlers : {
              select : function(event, elfinderInstance) {
                axios.get(_this.PHP_interface,{params: {
                    cmd : 'info',
                    targets : event.data.selected
                  }})
              },
              getfile : function () {
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
    }
  }
</script>
