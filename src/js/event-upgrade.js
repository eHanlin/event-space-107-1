var getUpgrade = function(chestId, chestLevel) {
  var putData = {
    user: "學生1號",
    level: chestLevel + 1
  };

  ajax(
    "PUT",
    "http://127.0.0.1:8080/chest/upgrade/" + chestId,
    putData,
    function(jsonData) {
      console.log("成功抓取升級的寶箱資料！");

      var data = jsonData.content;
      var finalCoins = data.finalCoins;
      var finalGems = data.finalGems;
      var platformTarget = $("#" + chestId);
      var dataLevel = putData.level;

      if (finalCoins < 0) {
        $.alert(
          alertWindow("金幣不足！ 再努力一點，還差" + finalCoins * -1 + "元！")
        );
        return;
      }
      if (finalGems < 0) {
        $.alert(
          alertWindow(
            "寶石不足！ 再努力一點，還差" + finalGems * -1 + "個寶石！"
          )
        );
        return;
      }

      platformTarget.data("level", dataLevel);
      determineLevel(platformTarget.find(".chest"), dataLevel);
    }
  );
};