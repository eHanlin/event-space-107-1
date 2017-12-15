let updateStatusIsUnlocking = function(chestId, startBtnTarget) {
  let platformTarget = $("#" + chestId);
  let startButtonTarget = platformTarget.find(".startButton");
  let upgradeButtonTarget = platformTarget.find(".upgradeButton");

  $.confirm(
    confirmWindow("確定啟動寶箱嗎！？", "", function() {
      ajaxDeferred(
        "PUT",
        "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
        {
          status: "UNLOCKING"
        }
      )
        .then(function() {
          $(".container .space .startButton[data-status=LOCKED]").fadeOut(
            "slow"
          );
          upgradeButtonTarget.fadeOut("slow");
          startButtonTarget.attr("data-status", "UNLOCKING");
          startBtnTarget.attr("data-onlocked", "false");

          return ajaxDeferred(
            "GET",
            "https://test.ehanlin.com.tw/chest/coolDownTime/" + chestId
          );
        })
        .then(function(jsonData) {
          countDown(jsonData.content, chestId, platformTarget);
        });
    })
  );
};

let countDown = function(seconds, chestId, platformTarget) {
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

  // 立即開啟按鈕
  let openNowBtnFunc = function() {
    platformTarget.find(".openNowButton[data-onlocked=false]").off("click");

    console.log(platformTarget.find(".openNowButton[data-onlocked=false]"));

    platformTarget
      .find(".openNowButton[data-onlocked=false]")
      .on("click", function() {
        let chestId;
        let seconds;

        $(this).attr("data-onlocked", "true");
        chestId = $(this)
          .parents(".platform")
          .prop("id");

        ajaxDeferred(
          "GET",
          "https://test.ehanlin.com.tw/chest/coolDownTime/" + chestId
        )
          .then(function(jsonData) {
            seconds = jsonData.content;

            return ajaxDeferred(
              "GET",
              "https://test.ehanlin.com.tw/chest/condition/one/openImmediately"
            );
          })
          .then(function(jsonData) {
            let openImmediatelyData = jsonData.content;
            let consume = openImmediatelyData["content"];
            let everySecondsHour = 3600;
            let remainHours = Math.ceil(seconds / everySecondsHour);
            let deductGems = remainHours * consume.everyHourDeductGems;

            let openNowBtnTarget = $("#" + chestId).find(".openNowButton");
            let imgChestTarget = $("#" + chestId).find(".chest");

            $.confirm(
              confirmWindow(
                "立即開啟寶箱需要花費 " + deductGems + " 個寶石",
                "確定立即開啟寶箱嗎？",
                function() {
                  ajax(
                    "PUT",
                    "https://test.ehanlin.com.tw/chest/open/immediately/" +
                      chestId,
                    {
                      deductGems: deductGems
                    },
                    function(jsonData) {
                      let originalGems = $(".space .gems #own-gems").text();
                      let deductGems = jsonData.content.gems;
                      let finalGems = originalGems - deductGems * -1;
                      console.log("成功抓取 openImmediately !!!");

                      if (finalGems < 0) {
                        $.alert(
                          alertWindow(
                            "你的寶石不足" + finalGems * -1 + "個",
                            "",
                            ""
                          )
                        );
                        return;
                      }

                      if (finalGems === 0) {
                        $.alert(alertWindow("你的寶石不足", "", ""));
                        return;
                      }

                      countTrasition("own-gems", originalGems, finalGems);
                      countDownFunc(0);
                    }
                  );
                }
              )
            );
          });
      });
  };

  // 立即開啟按鈕
  openNowBtnFunc();
  countDownFunc(seconds);
};
