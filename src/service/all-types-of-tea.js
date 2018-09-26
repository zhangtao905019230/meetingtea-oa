import axios from 'axios'
import ClassificationOfTea from './../assets/js/classification-of-tea'

console.log(ClassificationOfTea,11111)
function getSmallclass(val) {
  return new Promise((resolve, reject) => {
    axios.get("/static/json/classification-of-tea.json")
      .then(res => {
        let arr = []
        for (let i=0;i<res.data.length;i++){
          if (res.data[i].class_id.slice(0,2) == val){
            arr.push({value: res.data[i].class_id,label: res.data[i].smallclass})
          }
        }
        resolve(arr)
      })
      .catch(err=>{
        reject(err)
      });
  });
}
function getLargeclass() {
  return [
    {value: '00', label: '红茶'},{value: '01',label: '绿茶'},{value: '02',label: '白茶'},
    {value: '03', label: '黑茶'},{value: '04', label: '乌龙茶'},{value: '05', label: '黄茶'},
    {value: '06', label: '花茶'},{value: '07', label: '茶具'}
    ]
}
function transferenceClass(val) {
  for (let i=0;i<ClassificationOfTea.length;i++){
    if (ClassificationOfTea[i].class_id == val.smallclass){
      return (ClassificationOfTea[i].largeclass+"/"+ClassificationOfTea[i].smallclass)
    }
  }
}

export default {
  getSmallclass,
  getLargeclass,
  transferenceClass
}
