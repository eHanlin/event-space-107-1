<<<<<<< HEAD
let confirmWindow=function(title,content,confrimFunction){return{title:"<h5>"+title+"</h5>",content:"<h2>"+content+"</h2>",useBootstrap:!1,theme:"supervan",buttons:{cancelButton:{text:"再想想",btnClass:"btn-blue",action:function(){}},confirmButton:{text:"確認",btnClass:"btn-blue",action:confrimFunction}}}},alertWindow=function(title,content,confirmCallBack){return confirmCallBack||(console.log(confirmCallBack),confirmCallBack=function(){}),{title:title,content:"<h2>"+content+"</h2>",useBootstrap:!1,theme:"supervan",buttons:{confirmButton:{text:"確認",btnClass:"btn-blue",action:confirmCallBack}}}},alertForAward=function(title,rank,quantity,needChestLv,introduction,notice,alertFunction){return alertFunction||(console.log(alertFunction),alertFunction=function(){}),{title:title,content:"<h1>寶箱等級："+rank+"<br>中獎名額："+quantity+"名<br>可獲取的寶箱："+needChestLv+"<br>"+introduction+"<br><br></h1><h2>小提醒："+notice+"</h2>",useBootstrap:!1,theme:"supervan",buttons:{confirmButton:{text:"確認",btnClass:"btn-blue",action:alertFunction}}}};
=======
var confirmWindow = function(title, content, confrimFunction) {
  return {
    title: "<h5>" + title + "</h5>",
    content: "<h2>" + content + "</h2>",
    useBootstrap: false,
    theme: "supervan",
    buttons: {
      cancelButton: {
        text: "再想想",
        btnClass: "btn-blue",
        action: function() {
          return;
        }
      },
      confirmButton: {
        text: "確認",
        btnClass: "btn-blue",
        action: confrimFunction
      }
    }
  };
};

var alertWindow = function(title, content, alertFunction) {
  if (!alertFunction) {
    console.log(alertFunction);
    alertFunction = function() {};
  }

  return {
    title: title,
    content: "<h2>" + content + "</h2>",
    useBootstrap: false,
    theme: "supervan",
    buttons: {
      confirmButton: {
        text: "確認",
        btnClass: "btn-blue",
        action: alertFunction
      }
    }
  };
};

var alertForAward = function(
  title,
  rank,
  quantity,
  needChestLv,
  introduction,
  notice,
  alertFunction
) {
  if (!alertFunction) {
    alertFunction = function() {};
  }

  return {
    title: title,
    content:
      "<h1>寶箱等級：" +
      rank +
      "<br>中獎名額：" +
      quantity +
      "名<br>可獲取的寶箱：" +
      needChestLv +
      "<br>" +
      introduction +
      "<br><br></h1><h2>小提醒：" +
      notice +
      "</h2>",
    useBootstrap: false,
    theme: "supervan",
    buttons: {
      confirmButton: {
        text: "確認",
        btnClass: "btn-blue",
        action: alertFunction
      }
    }
  };
};
>>>>>>> 92e43870c198e70026ba332c4f3fbcb2ae3beed6
