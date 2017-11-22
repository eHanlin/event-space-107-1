var updateStatusIsReady = function(chestId) {
  ajax(
    "PUT",
    "http://127.0.0.1:8080/chest/updateStatus/" + chestId,
    { status: "READY" },
    function(jsonData) {
      console.log("成功抓取updateStatusIsReady資料！");

      var greenPlatFromTarget = $("#" + chestId);
      greenPlatFromTarget.find(".readyButton").removeAttr("style");

      var chestTarget = greenPlatFromTarget.find(".chest");
      var level = greenPlatFromTarget.data("level");
      var chestImage = "readyChest" + level;
      changeChestImage(chestTarget, chestImage);
    }
  );
};
