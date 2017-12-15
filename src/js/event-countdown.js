let updateStatusIsUnlocking = function(chestId, startBtnTarget) {
  let body = {
    status: "UNLOCKING"
  };

  $.confirm(
    confirmWindow(
      "確定啟動寶箱嗎！？",
      "",
      ajax.bind(
        this,
        "PUT",
        "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
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
    let remainHours = Math.ceil(seconds / 3600);
    let platformTarget = $("#" + chestId);
    let imgChestTarget = platformTarget.find(".chest");
    let countdownTarget = platformTarget.find(".countdown");
    let openNowBtnTarget = platformTarget.find(".openNowButton");

    imgChestTarget.addClass("unlockingGray");
    openNowBtnTarget.removeAttr("style");

    // 立即開啟按鈕
    openNowBtnFunc(remainHours);

    let countDownFunc = function() {
      countdownTarget.countDown({
        timeInSecond: seconds,
        displayTpl:
          "<i style='font-size:28px;color:yellow' class='fa'>&#xf254;</i>{hour}時{minute}分{second}秒",
        limit: "hour",
        // 當倒數計時完畢後 callback
        callback: function() {
          openNowBtnTarget.fadeOut();
          eventChest.updateStatusIsReady(chestId);
          imgChestTarget.removeClass("unlockingGray");
        }
      });
    };
    countDownFunc();
  };

  ajaxGet(
    "https://test.ehanlin.com.tw/chest/coolDownTime/" + chestId,
    null,
    function(jsonData) {
      countDown(jsonData, chestId);
    },
    function() {}
  );
};
