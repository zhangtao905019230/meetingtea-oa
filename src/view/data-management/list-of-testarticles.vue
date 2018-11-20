<template>
  <div class="list-of-articles">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="articleVal"
        label="文章内容"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{handleCreateTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
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
