import axios from 'axios'

function ValidateLogon(url,val) {
  let data = 'user_name='+encodeURIComponent(val.user_name)+'&user_password='+encodeURIComponent(val.user_password)
  return new Promise((resolve, reject) => {
    axios.post(url+":3030/user/login",data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err=>{
        reject(err)
      });
  });
}

export default {
  ValidateLogon
}
