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
      console.log(jsonData.content);
      console.log(jsonData);

      var data = jsonData.content;
      var finalCoins = data.finalCoins;
      var finalGems = data.finalGems;
      if (finalCoins < 0) {
        alert("金幣不足啦！ 升殺小 還差" + finalCoins * -1 + "元啦");
        return;
      }
      if (finalGems < 0) {
        alert("寶石不足啦！ 升殺小 還差" + finalGems * -1 + "個寶石啦");
        return;
      }

      var platformTarget = $("#" + chestId);
      var dataLevel = putData.level;
      platformTarget.data("level", dataLevel);
      determineLevel(platformTarget.find(".chest"), dataLevel);
    }
  );
};
