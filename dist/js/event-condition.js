var getCondition = function(level, confrimFunction) {
  ajaxGet(
    "http://127.0.0.1:8080/chest/condition/one/level" + level,
    null,
    function(jsonData) {
      console.log("成功抓取寶箱升級條件！");
      var data = jsonData.content.content;
      var needCoins = data.coins;
      var needGems = data.gems;

      $.confirm(
        confirmWindow(
          "升級寶箱需花費 " + needCoins + " e幣與 " + needGems + " 寶石",
          "你確定要升級嗎？",
          confrimFunction
        )
      );
    }
  );
};
