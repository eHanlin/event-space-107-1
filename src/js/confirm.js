var confirmWindow = function(title, content, confrimFunction) {
  return {
    title: "<h4>" + title + "</h4>",
    content: "<h1>" + content + "</h1>",
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
    content: "<h1>" + content + "</h1>",
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
    console.log(alertFunction);
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
