var updateStatusIsUnlocking = function(chestId) {
  let body = { status: "UNLOCKING" };

  ajax(
    "PUT",
    "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
    body,
    function(jsonData) {
      console.log("成功抓取updateStatusIsUnlocking資料！");

      let chestIdTarget = $("#" + chestId);
      let startButtonTarget = chestIdTarget.find(".startButton");
      let upgradeButtonTarget = chestIdTarget.find(".upgradeButton");
      $(".container .space .startButton[data-status=LOCKED]").fadeOut("slow");
      upgradeButtonTarget.fadeOut("slow");

      startButtonTarget.attr("data-status", body.status);
      coolDownTime(chestId);
    }
  );
};

let coolDownTime = function(chestId) {
  let countDown = function(jsonData, chestId) {
    console.log("計時中...");
    let seconds = jsonData.content;
    let countdownTarget = $("#" + chestId).find(".countdown");
    countdownTarget.countDown({
      timeInSecond: 10,
      displayTpl: "{hour}時{minute}分{second}秒",
      limit: "hour",
      callback: function() {
        eventChest.updateStatusIsReady(chestId);
      }
    });
  };

  ajaxGet(
    "https://test.ehanlin.com.tw/chest/coolDownTime/" + chestId,
    null,
    function(jsonData) {
      console.log("成功抓取coolDownTime資料！");
      countDown(jsonData, chestId);
    },
    function() {}
  );
};
