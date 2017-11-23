var updateStatusIsOpen = function(chestId) {
  ajax(
    "PUT",
    "http://127.0.0.1:8080/chest/updateStatus/" + chestId,
    { status: "OPEN" },
    function(jsonData) {
      console.log("成功抓取updateStatusIsOpen資料！(Open)");

      var platformTarget = $("#" + chestId);
      platformTarget.find(".chest").hide();
      platformTarget.find(".readyButton").remove();
      $.alert(alertWindow("恭喜你獲得一台BMW X6M！"));
    }
  );
};
