let updateStatusIsUnlocking = function(chestId, startBtnTarget) {
  let body = { status: "UNLOCKING" };

  $.confirm(
    confirmWindow(
      "確定啟動寶箱嗎！？",
      "",
      ajax.bind(
        this,
        "PUT",
        "https://www.ehanlin.com.tw/chest/updateStatus/" + chestId,
        body,
        function() {
          let chestIdTarget = $("#" + chestId);
          let startButtonTarget = chestIdTarget.find(".startButton");
          let upgradeButtonTarget = chestIdTarget.find(".upgradeButton");
          $(".container .space .startButton[data-status=LOCKED]").fadeOut(
            "slow"
          );
          upgradeButtonTarget.fadeOut("slow");

          startButtonTarget.attr("data-status", body.status);
          coolDownTime(chestId);
          startBtnTarget.attr("data-onlocked", "false");
        }
      )
    )
  );
};

let coolDownTime = function(chestId) {
  let countDown = function(jsonData, chestId) {
    let seconds = jsonData.content;
    let platformTarget = $("#" + chestId);
    let imgChestTarget = platformTarget.find(".chest");
    let countdownTarget = platformTarget.find(".countdown");

    imgChestTarget.addClass("unlockingGray");

    countdownTarget.countDown({
      timeInSecond: seconds,
      displayTpl:
        "<i style='font-size:28px;color:yellow' class='fa'>&#xf254;</i>{hour}時{minute}分{second}秒",
      limit: "hour",
      callback: function() {
        eventChest.updateStatusIsReady(chestId);
        imgChestTarget.removeClass("unlockingGray");
      }
    });
  };

  ajaxGet(
    "https://www.ehanlin.com.tw/chest/coolDownTime/" + chestId,
    null,
    function(jsonData) {
      countDown(jsonData, chestId);
    },
    function() {}
  );
};
