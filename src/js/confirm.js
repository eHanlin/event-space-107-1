let confirmWindow = function (title, content, confrimFunction) {
  return {
    title: "<h5>" + title + "</h5>",
    content: "<span style='font-size: 20px'>" + content + "</span>",
    useBootstrap: false,
    theme: "supervan",
    buttons: {
      cancelButton: {
        text: "再想想",
        btnClass: "btn-blue",
        action: function () {
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

let alertWindow = function (title, content, confirmCallBack) {
  if ( !confirmCallBack ) {
    confirmCallBack = function () {
    };
  }

  return {
    title: title,
    content: "<span style='font-size: 20px'>" + content + "</span>",
    useBootstrap: false,
    theme: "supervan",
    boxWidth: "40%",
    buttons: {
      confirmButton: {
        text: "確認",
        btnClass: "btn-blue",
        action: confirmCallBack
      }
    }
  };
};

let alertForAward = function (title,
                              rank,
                              quantity,
                              needChestLv,
                              introduction,
                              notice,
                              alertFunction) {
  if ( !alertFunction ) {
    alertFunction = function () {
    };
  }

  return {
    title: title,
    content:
    "<span style='font-size:22px;'><br>贈品數量：" +
    quantity +
    "名<br><p style='color:yellow'>可獲取的寶箱：Lv. " +
    needChestLv +
    "</p><br>" +
    introduction +
    "<br><br></span><span style='font-size:16px;'>小提醒：" +
    notice +
    "</span>",
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
