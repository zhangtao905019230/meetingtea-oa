<style>
  .add-goods .saleoff>li{width: 300px;display: flex;justify-content: space-between;margin-bottom: 14px}
  .add-goods .saleoff>li .el-input-number{width: 140px}
  .add-goods>.add-goods-form{width: 800px}
</style>
<template>
  <div class="add-goods">
    <el-form :model="addGoodsForm" :rules="addGoodsRules" ref="addGoodsForm" label-width="100px" class="add-goods-form">
      <el-form-item label="选择分类：" prop="classification">
        <el-select
          v-model="addGoodsForm.classification.largeclass" placeholder="请选择茶的大分类"
          @change="handleChange(addGoodsForm.classification.largeclass)">
          <el-option
            v-for="item in largeclassOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="addGoodsForm.classification.smallclass" placeholder="请选择茶的小分类">
          <el-option
            v-for="item in smallclassOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="中文标题：" prop="zh_title">
        <el-input v-model="addGoodsForm.zh_title" placeholder="请输入商品中文标题"></el-input>
      </el-form-item>
      <el-form-item label="中文描述：" prop="zh_desc">
        <el-input v-model="addGoodsForm.zh_desc" placeholder="请输入商品中文描述"></el-input>
      </el-form-item>
      <el-form-item label="英文标题：" prop="en_title">
        <el-input v-model="addGoodsForm.en_title" placeholder="Please enter the English title of the product"></el-input>
      </el-form-item>
      <el-form-item label="英文描述：" prop="en_desc">
        <el-input v-model="addGoodsForm.en_desc" placeholder="Please input English description of goods"></el-input>
      </el-form-item>
      <el-form-item label="折扣活动：" prop="saleoff">
        <ul class="saleoff">
          <li style="">
            <el-radio v-model="addGoodsForm.saleoff.saleoff_type" label="1" border>立减{{addGoodsForm.saleoff.saleoff_value['1']}}元</el-radio>
            <el-input-number v-model="addGoodsForm.saleoff.saleoff_value['1']" :step="1"></el-input-number>
          </li>
          <li>
            <el-radio v-model="addGoodsForm.saleoff.saleoff_type" label="2" border>享{{addGoodsForm.saleoff.saleoff_value['2']}}折</el-radio>
            <el-input-number v-model="addGoodsForm.saleoff.saleoff_value['2']" :step="1"></el-input-number>
          </li>
          <li>
            <el-radio v-model="addGoodsForm.saleoff.saleoff_type" label="3" border>新品</el-radio>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="折后价格：" prop="price">
        <el-input-number v-model="addGoodsForm.price" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="价格：" prop="no_discount_price">
        <el-input-number v-model="addGoodsForm.no_discount_price" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="选择图片：" prop="figure_img">
        <img :src="addGoodsForm.figure_img" alt="" width="200">
        <div>
          <span>路径：</span><el-input v-model="addGoodsForm.figure_img" style="width: 600px" disabled=""></el-input>
        </div>
        <select-image @change="selectImageChange"></select-image>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addGoodsForm')">{{submitBtn}}</el-button>
        <el-button @click="resetForm('addGoodsForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import AllTypesOfTea from '../../service/all-types-of-tea'
  import SelectImage from '../../widget/select-image'
  import GoodsDbOperation from '../../service/goods-db-operation'

  export default {
    components:{
      'select-image': SelectImage
    },
    data() {
      return {
        isEdit:false,
        id:"",
        largeclassOptions: [],
        smallclassOptions: [],
        addGoodsForm: {
          classification: {
            largeclass:'',
            smallclass:''
          },
          zh_title: '',
          zh_desc: '',
          en_title: '',
          en_desc: '',
          saleoff: {
            saleoff_type:'3',
            saleoff_value:{
              '1': '50',
              '2': '9'
            }
          },
          price: 0,
          no_discount_price: 0,
          figure_img: ''
        },
        addGoodsRules: {
          classification: [
            { required: true, message: '输入不能为空', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value.smallclass == ""){
                  callback(new Error("请商品选择分类"));
                }else {
                  callback();
                }
              }
            }],
          zh_title: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
          zh_desc: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
          zh_saleoff: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
          en_title: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
          en_desc: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
          en_saleoff: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
          price: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
          no_discount_price: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
          figure_img: [{ required: true, message: '图片不能为空', trigger: 'blur' }]
        }
      };
    },
    mounted(){
      this.initData()
      let params = JSON.stringify(this.$route.params)
      if (params == "{}"){
      } else {
        this.isEdit = true
        this.id = this.$route.params._id
        this.addGoodsForm.zh_title = this.$route.params.zh_title
        this.addGoodsForm.zh_desc = this.$route.params.zh_desc
        this.addGoodsForm.en_title = this.$route.params.en_title
        this.addGoodsForm.en_desc = this.$route.params.en_desc
        this.addGoodsForm.saleoff = JSON.parse(this.$route.params.saleoff)
        this.addGoodsForm.price = this.$route.params.price
        this.addGoodsForm.no_discount_price = this.$route.params.no_discount_price
        this.addGoodsForm.figure_img = this.$route.params.figure_img
      }
    },
    computed:{
      submitBtn(){
        if (this.isEdit){
          return "确认更新"
        } else {
          return "确认添加"
        }
      }
    },
    methods: {
      initData(){
        this.largeclassOptions = AllTypesOfTea.getLargeclass()
      },
      submitForm(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // add
            if (!_this.isEdit){
              GoodsDbOperation.AddGoods(this.addGoodsForm,_this.dataInterface).then(res => {
                if (res == 'ok'){
                  this.$message({
                    message: '商品已入库',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({name:'list-of-goods'})
                  },1500)
                }else {
                  this.$message.error('服务器错误！');
                }
              })
            } else {
              // del
              GoodsDbOperation.UpdateGoods(this.id,this.addGoodsForm,_this.dataInterface).then(res => {
                if (res == 'ok'){
                  this.$message({
                    message: '商品已更新',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({name:'list-of-goods'})
                  },1500)
                }else {
                  this.$message.error('服务器错误！');
                }
              })
            }
          } else {
            this.$message.error('表单校验未通过！');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleChange(val){
        AllTypesOfTea.getSmallclass(val)
          .then(res=>{
            this.smallclassOptions = res
            this.addGoodsForm.classification.smallclass = ""
          })
      },
      selectImageChange(val){
        this.addGoodsForm.figure_img = val
      }
    }
  }
</script>
