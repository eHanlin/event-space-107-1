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
    let seconds;
    let remainHours = Math.ceil(seconds / 3600);
    let platformTarget = $("#" + chestId);
    let imgChestTarget = platformTarget.find(".chest");
    let countdownTarget = platformTarget.find(".countdown");
    let openNowBtnTarget = platformTarget.find(".openNowButton");

    imgChestTarget.addClass("unlockingGray");
    openNowBtnTarget.removeAttr("style");

    let countDownFunc = function(seconds) {
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

                // openNowBtnTarget.fadeOut();
                // eventChest.updateStatusIsReady(chestId);
                // imgChestTarget.removeClass("unlockingGray");

                countDownFunc(0);
              }
            )
          );
        },
        function() {}
      );
    };

    // 立即開啟按鈕
    let openNowBtnFunc = function(remainHours) {
      $(".container .space .openNowButton[data-onlocked=false]").on(
        "click",
        function() {
          let chestId;
          $(this).attr("data-onlocked", "true");

          chestId = $(this)
            .parents(".platform")
            .prop("id");

          getConditionOpenImmediately(remainHours, chestId);
        }
      );
    };

    let getOpenChestImmediately = function(chestId) {
      ajax(
        "PUT",
        "https://test.ehanlin.com.tw/chest/open/immediately/" + chestId,
        {
          status: "READY"
        },
        function(jsonData) {
          console.log("成功抓取 openImmediately !!!");
          console.log(jsonData.content);
        }
      );
    };

    // 立即開啟按鈕
    openNowBtnFunc(remainHours);

    seconds = jsonData.content;
    countDownFunc(seconds);
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
