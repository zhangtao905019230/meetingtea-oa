import axios from 'axios'

function GetArticle(url,req) {
  return new Promise((resolve, reject) => {
    axios.get(url + ":3030/oa-articles/getTestArticle")
      .then(res => {
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      });
  });
}

function AddArticle(url,req) {
  return new Promise((resolve, reject) => {
    axios.get(url + ":3030/oa-articles/addArticle",{params:req})
      .then(res => {
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      });
  });
}

function DelArticle(url,req) {
  return new Promise((resolve, reject) => {
    axios.get(url + ":3030/oa-articles/delArticle",{params:req})
      .then(res => {
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      });
  });
}


export default {
  GetArticle,
  AddArticle,
  DelArticle
}
