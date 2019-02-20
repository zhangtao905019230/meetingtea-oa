import axios from 'axios'

function ValidateLogon(url,val) {
  let data = 'user_name='+encodeURIComponent(val.user_name)+'&user_password='+encodeURIComponent(val.user_password)
  return new Promise((resolve, reject) => {
    axios.post(url+":3030/oa-user/login",data)
      .then(res => {
        // console.log(res)
        resolve(res.data)
      })
      .catch(err=>{
        reject(err)
      });
  });
}

function GetUsers(url,val) {
  // let data = 'user_name='+encodeURIComponent(val.user_name)+'&user_password='+encodeURIComponent(val.user_password)
  return new Promise((resolve, reject) => {
    axios.get(url+":3030/user/getUsers")
      .then(res => {
        // console.log(res,11111)
        resolve(res.data)
      })
      .catch(err=>{
        reject(err)
      });
  });
}

export default {
  ValidateLogon,
  GetUsers
}
