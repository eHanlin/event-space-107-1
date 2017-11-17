var updateStatusIsOpen = function(chestId) {
  ajax(
    "PUT",
    "http://127.0.0.1:8080/chest/updateStatus/" + chestId,
    { status: "OPEN" },
    function(jsonData) {
      console.log("成功抓取updateStatusIsOpen資料！(Open)");
      console.log(jsonData);
      if (confirm("什麼都沒拿到呀 笨蛋！")) {
      }
    }
  );
};
