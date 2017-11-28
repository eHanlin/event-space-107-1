var updateStatusIsUnlocking = function(chestId) {
  var body = { status: "UNLOCKING" };

  ajax(
    "PUT",
    "http://127.0.0.1:8080/chest/updateStatus/" + chestId,
    body,
    function(jsonData) {
      console.log("成功抓取updateStatusIsUnlocking資料！");

      var startButtonTarget = $("#" + chestId).find(".startButton");
      startButtonTarget.data("status", body.status);

      coolDownTime(chestId);
    }
  );
};

var coolDownTime = function(chestId) {
  ajaxGet("http://127.0.0.1:8080/chest/coolDownTime/" + chestId, null, function(
    jsonData
  ) {
    console.log("成功抓取coolDownTime資料！");
    countDown(jsonData, chestId);
  });
};

var countDown = function(jsonData, chestId) {
  console.log("計時中...");
  var seconds = jsonData.content;
  var countdownTarget = $("#" + chestId).find(".countdown");
  countdownTarget.countDown({
    timeInSecond: 5,
    displayTpl: "{hour}時{minute}分{second}秒",
    limit: "hour",
    callback: function() {
      eventChest.updateStatusIsReady(chestId);
    }
  });
};
