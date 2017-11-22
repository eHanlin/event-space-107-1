var updateStatusIsReady = function(chestId) {
  ajax(
    "PUT",
    "http://127.0.0.1:8080/chest/updateStatus/" + chestId,
    { status: "READY" },
    function(jsonData) {
      console.log("成功抓取updateStatusIsReady資料！");
      
      var platFromTarget = $("#" + chestId);
      var chestTarget = platFromTarget.find(".chest");
      var level = platFromTarget.data("level");
      var chestImage = "readyChest" + level;

      platFromTarget.find(".readyButton").removeAttr("style");
      platFromTarget.find(".countdown").hide();
      changeChestImage(chestTarget, chestImage);
    }
  );
};
