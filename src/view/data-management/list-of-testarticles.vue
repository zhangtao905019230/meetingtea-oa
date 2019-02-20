<template>
  <div class="list-of-articles">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="arctic_id"
        label="文章id"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="dec"
        label="描述"
      >
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="labels"
        label="标签"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import ArticlesDbOperation from '../../service/articles-db-operation'
  import Utiles from '../../utiles'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        ArticlesDbOperation.GetArticle(this.dataInterface).then(res=>{
          this.tableData = res.data
        })
      },
      handleDelete(index,row){
        ArticlesDbOperation.DelArticle(this.dataInterface,{_id:row._id}).then(res=>{
          this.init()
        })
      },
      handleCreateTime(time){
        time=JSON.parse(time)
        return Utiles.FormatTime(time)
      }
    },
  }
</script>
