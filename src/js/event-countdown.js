var updateStatusIsUnlocking = function(chestId) {
  var body = { status: "UNLOCKING" };

  ajax(
    "PUT",
    "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
    body,
    function(jsonData) {
      console.log("成功抓取updateStatusIsUnlocking資料！");

      var startButtonTarget = $("#" + chestId).find(".startButton");
      var upgradeButtonTarget = $("#" + chestId).find(".upgradeButton");
      $(".startButton[data-status=LOCKED]").fadeOut("slow");
      upgradeButtonTarget.fadeOut("slow");

      startButtonTarget.attr("data-status", body.status);
      coolDownTime(chestId);
    }
  );
};

var coolDownTime = function(chestId) {
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

var countDown = function(jsonData, chestId) {
  console.log("計時中...");
  var seconds = jsonData.content;
  var countdownTarget = $("#" + chestId).find(".countdown");
  countdownTarget.countDown({
    timeInSecond: 10,
    displayTpl: "{hour}時{minute}分{second}秒",
    limit: "hour",
    callback: function() {
      eventChest.updateStatusIsReady(chestId);
    }
  });
};
