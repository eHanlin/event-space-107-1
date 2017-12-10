var getCondition = function(chestId, upLevel) {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/condition/one/level" + upLevel,
    null,
    function(jsonData) {
      console.log("成功抓取寶箱升級條件！");
      let data = jsonData.content.content;
      let needCoins = data["coins"];
      let needGems = data["gems"];

      $.confirm(
        confirmWindow(
          "升級寶箱需花費 " + needCoins + " e幣與 " + needGems + " 寶石",
          "你確定要升級嗎？",
          eventChest.getUpgrade.bind(this, chestId, upLevel)
        )
      );
    },
    function() {}
  );
};
