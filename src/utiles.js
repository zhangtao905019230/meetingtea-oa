function FormatTime(time){
  return time["Y+"]+' '+time["M+"]+'-'+time["d+"]+' '+time["h+"]+':'+time["m+"]
}

function GetTime(){
  let oDate = new Date()
  var o = {
    "Y+" : oDate.getFullYear(), //year
    "M+" : oDate.getMonth()+1, //month
    "d+" : oDate.getDate(),    //day
    "h+" : oDate.getHours(),   //hour
    "m+" : oDate.getMinutes(), //minute
  }

  return o
}

export default {
  GetTime,
  FormatTime
}
