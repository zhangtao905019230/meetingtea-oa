import axios from 'axios'

function AddGoods(val,url) {
  return new Promise((resolve, reject) => {
    axios.get(url + ":3030/goods/addGoods",{params:val})
      .then(res => {
        if (res.data == 'ok'){
          resolve('ok')
        } else {
          reject('failed')
        }
      })
      .catch(err=>{
        reject(err)
      });
  });
}

function GetGoods(url) {
  return new Promise((resolve, reject) => {
    axios.get(url + ":3030/goods/getGoods")
      .then(res => {
        resolve(res.data)
      })
      .catch(err=>{
        reject(err)
      });
  });
}

function DelGoods(id,url) {
  return new Promise((resolve, reject) => {
    axios.get(url + ":3030/goods/delGoods",{params:id})
      .then(res => {
        resolve(res.data)
      })
      .catch(err=>{
        reject(err)
      });
  });
}

function UpdateGoods(id,val,url){
  return new Promise((resolve, reject) => {
    axios.get(url + ":3030/goods/updateGoods",{params:{id,val}})
      .then(res => {
        if (res.data == 'ok'){
          resolve('ok')
        } else {
          reject('failed')
        }
      })
      .catch(err=>{
        reject(err)
      });
  });
}

export default {
  AddGoods,
  GetGoods,
  DelGoods,
  UpdateGoods
}
