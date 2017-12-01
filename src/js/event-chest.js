var eventChest = {
  // 將寶箱狀態轉為開啟
  updateStatusIsOpen: function(chestId) {
    console.log("----------updateStatusIsOpen-----------");
    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/open/" + chestId,
      {
        status: "OPEN"
      },
      function(jsonData) {
        console.log("成功抓取updateStatusIsOpen資料！(Open)");
        console.log(chestId);
        console.log(jsonData);

        var platformTarget = $("#" + chestId);
        platformTarget.find(".chest").fadeOut("slow");
        platformTarget.find(".readyButton").fadeOut("slow");
        $.alert(alertWindow("恭喜你獲得一台BMW X6M！", ""));
      }
    );
  },

  // 將寶箱狀態轉為準備開啟
  updateStatusIsReady: function(chestId) {
    var body = { status: "READY" };

    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
      body,
      function(jsonData) {
        console.log("成功抓取 updateStatusIsReady 資料！");

        let platFromTarget = $("#" + chestId);
        let chestTarget = platFromTarget.find(".chest");
        let level = platFromTarget.data("level");
        let chestImage = "readyChest" + level;
        let startButtonTarget = platFromTarget.find(".startButton");

        platFromTarget.find(".readyButton").fadeIn("slow");
        platFromTarget.find(".countdown").fadeOut("slow");

        startButtonTarget.attr("data-status", body.status);
        $(".startButton[data-status=LOCKED]").fadeIn("slow");

        changeChestImage(chestTarget, chestImage);
      }
    );
  },

  // 將寶箱狀態轉為升級
  getUpgrade: function(chestId, upLevel) {
    let putData = {
      level: upLevel
    };

    let failLevel = putData.level - 1;

    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/upgrade/" + chestId,
      putData,
      function(jsonData) {
        console.log("成功抓取升級的寶箱資料！");
        console.log(jsonData);

        let upgradeContent = jsonData.content;

        if (jsonData.message.indexOf("failure") >= 0) {
          console.log("升級失敗");
          $.alert(
            alertWindow(
              "升級失敗",
              "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/upgradeStatus/upgradeFail" +
                failLevel +
                ".gif'>"
            )
          );
        } else {
          console.log("=================>進入");
          // -------- 如果餘額不足，會回傳 finalCoins 和 finalGems
          let finalCoins = upgradeContent.finalCoins;
          let finalGems = upgradeContent.finalGems;
          // --------------------------------------------------

          let platformTarget = $("#" + chestId);
          let dataLevel = putData.level;
          let upgradeToTransaction;
          let upgradeAuditId;

          if (finalCoins || finalGems) {
            let alertText = "";

            if (finalCoins && finalCoins < 0 && finalGems > 0) {
              alertText +=
                "e幣不足！ 再努力一點，還差" + finalCoins * -1 + "元！\n";
              $.alert(alertWindow("", alertText));
            }

            if (finalGems && finalGems < 0 && finalCoins > 0) {
              alertText +=
                "寶石不足！ 再努力一點，還差" + finalGems * -1 + "個寶石！";
              $.alert(alertWindow("", alertText));
            }

            if (finalCoins < 0 && finalGems < 0) {
              alertText +=
                "e幣和寶石不足！ 再努力一點，還差" +
                finalCoins * -1 +
                "元！\n" +
                finalGems * -1 +
                "個寶石！";
              $.alert(alertWindow("", alertText));
            }
          } else {
            console.log("=================>升級中");
            // 如果餘額足夠，則直接回傳 upgradeAuditId
            // 使用ajax deferred 的方式
            upgradeAuditId = upgradeContent;
            upgradeToTransaction = function() {
              ajaxDeferred(
                "POST",
                "https://test.ehanlin.com.tw/currencyBank/transaction/upgrade",
                {
                  upgradeAuditId: upgradeAuditId
                }
              )
                .then(function(jsonData) {
                  return ajaxDeferred(
                    "GET",
                    "https://test.ehanlin.com.tw/currencyBank/totalAssets/retrieve/one"
                  );
                })
                .then(function(jsonData) {
                  console.log("current totalAssets: " + jsonData.content);

                  if (dataLevel === 6) {
                    platformTarget.find(".upgradeButton").hide();
                  }

                  $.alert(
                    alertWindow(
                      "升級成功",
                      "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/upgradeStatus/upgradeSuccess" +
                        putData.level +
                        ".gif'>",
                      function() {
                        console.log("current totalAssets: " + jsonData.content);

                        $(".space .coins span")
                          .empty()
                          .append(jsonData.content.coins);
                        $(".space .gems span")
                          .empty()
                          .append(jsonData.content.gems);

                        platformTarget.data("level", dataLevel);
                        determineLevel(
                          platformTarget.find(".chest"),
                          dataLevel
                        );
                      }
                    )
                  );
                });
            };
            upgradeToTransaction();
          }
        }
      }
    );
  }
};
