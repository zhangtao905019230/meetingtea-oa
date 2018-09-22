import axios from 'axios'

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.Authorization = localStorage.getItem('token');
    }
    // console.log(111)
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  });

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
