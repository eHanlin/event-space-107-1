var getConditionChestLevel = function(chestId, upLevel, upgradeBtnTarget) {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/condition/one/level" + upLevel,
    null,
    function(jsonData) {
      let data = jsonData.content.content;
      let needCoins = data["coins"];
      let needGems = data["gems"];

      $.confirm(
        confirmWindow(
          "升級寶箱需花費 " + needCoins + " e幣與 " + needGems + " 寶石",
          "你確定要升級嗎？",
          eventChest.getUpgrade.bind(this, chestId, upLevel, upgradeBtnTarget)
        )
      );
    },
    function() {}
  );
};

var getConditionOpenImmediately = function(remainHours, chestId) {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/condition/one/openImmediately",
    null,
    function(jsonData) {
      let data = jsonData.content.content;
      let everyHourDeductGems = data.everyHourDeductGems;
      let deductGems = remainHours * everyHourDeductGems;
      let openNowBtnTarget = $("#" + chestId).find(".openNowButton");
      let imgChestTarget = $("#" + chestId).find(".chest");
      console.log("deductGems:" + deductGems);

      $.confirm(
        confirmWindow(
          "立即開啟寶箱需要花費 " + deductGems + " 個寶石",
          "確定立即開啟寶箱嗎？",
          function() {
            getOpenChestImmediately(chestId);

            openNowBtnTarget.fadeOut();
            eventChest.updateStatusIsReady(chestId);
            imgChestTarget.removeClass("unlockingGray");
          }
        )
      );
    },
    function() {}
  );
};

let getOpenChestImmediately = function(chestId) {
  ajax(
    "PUT",
    "https://test.ehanlin.com.tw/chest/open/immediately/" + chestId,
    { status: "READY" },
    function(jsonData) {
      console.log("成功抓取 openImmediately !!!");
      console.log(jsonData.content);
    }
  );
};
