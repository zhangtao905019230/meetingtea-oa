<template>
  <div class="list-of-articles">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="index"
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
        prop="time"
        label="时间"
        >
      </el-table-column>
      <el-table-column
        prop="labels"
        label="标签"
        >
      </el-table-column>
    </el-table>
    <!--<span class="demonstration">大于 7 页时的效果</span>-->
    <el-pagination
      layout="prev, pager, next"
      :total="totalPages"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [],
        totalPages:0
      }
    },
    mounted(){
      axios.get(this.dataInterface + ":3030/articles/details",{params:{page:1}}).then(res=>{
        console.log(res)
        this.tableData = res.data.articleArr
        this.totalPages = (res.data.totalPages-1)*10
      })
    },
    methods:{
      handleCurrentChange(val) {
        // console.log(val);
        // this.currentPage = val

        axios.get(this.dataInterface + ":3030/articles",{params:{page:val}}).then(res=>{
          console.log(res)
          this.tableData = res.data.articleArr
          // this.totalPages = 1000
        })
      }
    },
  }
</script>
