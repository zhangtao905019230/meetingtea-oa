<template>
  <div class="dataset-manage">
    <el-button type="primary" @click="openDialogVisible()">
      创建
    </el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form>
        <el-form-item label="数据集名称">
          <el-input v-model="datasetName" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goTo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        dialogVisible:false,
        datasetName:''
      }
    },
    methods:{
      openDialogVisible(){
        this.dialogVisible=true
      },
      goTo(){
        this.$router.push({path:'object-detection'})
      }
    }
  }
</script>
