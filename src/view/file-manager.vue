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
            lang : 'zh_CN',
            commandsOptions: {
              edit: {
                editors : [
                  {
                    // ACE Editor
                    // `mimes` is not set for support everything kind of text file
                    load : function(textarea) {
                      var self = this,
                        dfrd = $.Deferred(),
                        cdn  = '//cdnjs.cloudflare.com/ajax/libs/ace/1.2.5',
                        init = function() {
                          if (typeof ace === 'undefined') {
                            self.fm.loadScript([
                              cdn+'/ace.js',
                              cdn+'/ext-modelist.js',
                              cdn+'/ext-settings_menu.js',
                              cdn+'/ext-language_tools.js'
                            ], start);
                          } else {
                            start();
                          }
                        },
                        start = function() {
                          var editor, editorBase, mode,
                            ta = $(textarea),
                            taBase = ta.parent(),
                            dialog = taBase.parent(),
                            id = textarea.id + '_ace',
                            ext = self.file.name.replace(/^.+\.([^.]+)|(.+)$/, '$1$2').toLowerCase(),
                            // MIME/mode map
                            mimeMode = {
                              'text/x-php'              : 'php',
                              'application/x-php'       : 'php',
                              'text/html'               : 'html',
                              'application/xhtml+xml'   : 'html',
                              'text/javascript'         : 'javascript',
                              'application/javascript'  : 'javascript',
                              'text/css'                : 'css',
                              'text/x-c'                : 'c_cpp',
                              'text/x-csrc'             : 'c_cpp',
                              'text/x-chdr'             : 'c_cpp',
                              'text/x-c++'              : 'c_cpp',
                              'text/x-c++src'           : 'c_cpp',
                              'text/x-c++hdr'           : 'c_cpp',
                              'text/x-shellscript'      : 'sh',
                              'application/x-csh'       : 'sh',
                              'text/x-python'           : 'python',
                              'text/x-java'             : 'java',
                              'text/x-java-source'      : 'java',
                              'text/x-ruby'             : 'ruby',
                              'text/x-perl'             : 'perl',
                              'application/x-perl'      : 'perl',
                              'text/x-sql'              : 'sql',
                              'text/xml'                : 'xml',
                              'application/docbook+xml' : 'xml',
                              'application/xml'         : 'xml'
                            };

                          // set basePath of ace
                          ace.config.set('basePath', cdn);

                          // set base height
                          taBase.height(taBase.height());

                          // detect mode
                          mode = ace.require('ace/ext/modelist').getModeForPath('/' + self.file.name).name;
                          if (mode === 'text') {
                            if (mimeMode[self.file.mime]) {
                              mode = mimeMode[self.file.mime];
                            }
                          }

                          // show MIME:mode in title bar
                          taBase.prev().children('.elfinder-dialog-title').append(' (' + self.file.mime + ' : ' + mode.split(/[\/\\]/).pop() + ')');

                          // TextArea button and Setting button
                          $('<div class="ui-dialog-buttonset"/>').css('float', 'left')
                            .append(
                              $('<button>TextArea</button>')
                                .button()
                                .on('click', function(){
                                  if (ta.data('ace')) {
                                    ta.removeData('ace');
                                    editorBase.hide();
                                    ta.val(editor.session.getValue()).show().focus();
                                    $(this).text('AceEditor');
                                  } else {
                                    ta.data('ace', true);
                                    editorBase.show();
                                    editor.setValue(ta.hide().val(), -1);
                                    editor.focus();
                                    $(this).text('TextArea');
                                  }
                                })
                            )
                            .append(
                              $('<button>Ace editor setting</button>')
                                .button({
                                  icons: {
                                    primary: 'ui-icon-gear',
                                    secondary: 'ui-icon-triangle-1-e'
                                  },
                                  text: false
                                })
                                .on('click', function(){
                                  editor.showSettingsMenu();
                                })
                            )
                            .prependTo(taBase.next());

                          // Base node of Ace editor
                          editorBase = $('<div id="'+id+'" style="width:100%; height:100%;"/>').text(ta.val()).insertBefore(ta.hide());

                          // Ace editor configure
                          ta.data('ace', true);
                          editor = ace.edit(id);
                          ace.require('ace/ext/language_tools');
                          ace.require('ace/ext/settings_menu').init(editor);
                          editor.$blockScrolling = Infinity;
                          editor.setOptions({
                            theme: 'ace/theme/monokai',
                            mode: 'ace/mode/' + mode,
                            fontSize: '14px',
                            wrap: true,
                            enableBasicAutocompletion: true,
                            enableSnippets: true,
                            enableLiveAutocompletion: false
                          });
                          editor.commands.addCommand({
                            name : "saveFile",
                            bindKey: {
                              win : 'Ctrl-s',
                              mac : 'Command-s'
                            },
                            exec: function(editor) {
                              self.doSave();
                            }
                          });
                          editor.commands.addCommand({
                            name : "closeEditor",
                            bindKey: {
                              win : 'Ctrl-w|Ctrl-q',
                              mac : 'Command-w|Command-q'
                            },
                            exec: function(editor) {
                              self.doCancel();
                            }
                          });

                          editor.resize();

                          dfrd.resolve(editor);
                        };

                      // init & start
                      init();

                      return dfrd;
                    },
                    close : function(textarea, instance) {
                      if (instance) {
                        instance.destroy();
                        $(textarea).show();
                      }
                    },
                    save : function(textarea, instance) {
                      instance && $(textarea).data('ace') && (textarea.value = instance.session.getValue());
                    },
                    focus : function(textarea, instance) {
                      instance && $(textarea).data('ace') && instance.focus();
                    },
                    resize : function(textarea, instance, e, data) {
                      instance && instance.resize();
                    }
                  }
                ]
              }
            }
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
