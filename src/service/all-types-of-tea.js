import axios from 'axios'

// Get all small categories according to big classification
function getSmallclass(val) {
  return new Promise((resolve, reject) => {
    axios.get("/static/json/allTypesOfTea.json")
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
    {value: '03', label: '黑茶'},{value: '04', label: '乌龙茶'},{value: '05', label: '花茶'},
    {value: '06', label: '黄茶'},{value: '07', label: '药茶'}, {value: '08', label: '茶具'},
    {value: '09', label: '其它'}
    ]
}
function transferenceClass(val) {
  return new Promise((resolve, reject) => {
    axios.get("/static/json/allTypesOfTea.json")
      .then(res => {
        for (let i=0;i<res.data.length;i++){
          if (res.data[i].class_id == val.smallclass){
            resolve(res.data[i].largeclass+"/"+res.data[i].smallclass)
          }
        }
      })
      .catch(err=>{
        reject(err)
      });
  });
}

export default {
  getSmallclass,
  getLargeclass,
  transferenceClass
}
