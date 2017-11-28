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
  return {
    title: title,
    content: content,
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