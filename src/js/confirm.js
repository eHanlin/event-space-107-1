var confirmWindow = function(title, confrimFunction) {
  return {
    title: "<h2>" + title + "</h2>",
    content: "",
    useBootstrap: false,
    theme: "supervan",
    buttons: {
      confirmButton: {
        text: "確認",
        btnClass: "btn-blue",
        action: confrimFunction
      },

      cancelButton: {
        text: "取消",
        btnClass: "btn-blue",
        action: function() {
          return;
        }
      }
    }
  };
};

var alertWindow = function(title, content) {
  return {
    title: title,
    content: content,
    useBootstrap: false,
    theme: "supervan",
    buttons: {
      confirmButton: {
        text: "確認",
        btnClass: "btn-blue"
      }
    }
  };
};
