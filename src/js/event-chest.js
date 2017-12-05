var eventChest = {
  // 將寶箱狀態轉為開啟
  updateStatusIsOpen: function (chestId) {
    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/open/" + chestId,
      {
        status: "OPEN"
      },
      function (jsonData) {
        console.log("成功抓取updateStatusIsOpen資料！(Open)");
        let data = jsonData.content;
        let gainCoins = data.coins;
        let gainGems = data.gems;
        let totalCoins = data.totalcoins;
        let totalGems = data.totalgems;

        let platformTarget = $("#" + chestId);
        let text = "恭喜你 <br/>", coinsText, gemsText, awardText;

        platformTarget.find(".chest").fadeOut("slow");
        platformTarget.find(".readyButton").fadeOut("slow");

        if ( gainCoins ) {
          let coinSvg = "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/currencyBank/coin.svg'>";
          coinsText = coinSvg + " 獲得 " + gainCoins + " 金幣<br/>";
        }

        if ( gainGems ) {
          let gemSvg = "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/currencyBank/gem.svg'>";
          gemsText = gemSvg + " 獲得 " + gainGems + " 寶石<br/>";
        }

        if ( gainAward ) {
          let awardImage = "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/award/"
            + gainAwardId + ".png' ><br/>";
          awardText = awardImage + gainAward;
        }

        $.alert(
          alertWindow(
            text + coinsText + gemsText,
            awardText,
            function () {
              $(".space .coins span")
                .empty()
                .append(totalCoins);
              $(".space .gems span")
                .empty()
                .append(totalGems);
            }
          )
        );
      }
    );
  },

  // 將寶箱狀態轉為準備開啟
  updateStatusIsReady: function (chestId) {
    var body = {
      status: "READY"
    };

    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
      body,
      function (jsonData) {
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
  getUpgrade: function (chestId, upLevel) {
    let putData = {
      level: upLevel
    };

    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/upgrade/" + chestId,
      putData,
      function (jsonData) {
        console.log("成功抓取升級的寶箱資料！");
        console.log(jsonData);

        let upgradeContent = jsonData.content;
        let upgradeToTransaction = function (alertTitle, alertGif) {
          ajaxDeferred(
            "POST",
            "https://test.ehanlin.com.tw/currencyBank/transaction/upgrade",
            {
              upgradeAuditId: upgradeContent
            }
          )
            .then(function (jsonData) {
              return ajaxDeferred(
                "GET",
                "https://test.ehanlin.com.tw/currencyBank/totalAssets/retrieve/one"
              );
            })
            .then(function (jsonData) {
              console.log("current totalAssets: " + jsonData.content);

              $.alert(
                alertWindow(
                  alertTitle,
                  alertGif,
                  function () {
                    console.log("current totalAssets: " + jsonData.content);

                    $(".space .coins span")
                      .empty()
                      .append(jsonData.content.coins);
                    $(".space .gems span")
                      .empty()
                      .append(jsonData.content.gems);
                  }
                )
              );
            });
        };

        if ( jsonData.message.indexOf("failure") >= 0 ) {
          console.log("升級失敗");
          let failLevel = upLevel - 1;
          let failureGif = "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/upgradeStatus/upgradeFail" +
            failLevel +
            ".gif'>";
          upgradeToTransaction("升級失敗", failureGif);
        } else {
          // -------- 如果餘額不足，會回傳 finalCoins 和 finalGems
          let finalCoins = upgradeContent.finalCoins;
          let finalGems = upgradeContent.finalGems;
          // --------------------------------------------------
          if ( finalCoins || finalGems ) {
            let alertText = "";

            if ( finalCoins < 0 && finalGems < 0 ) {
              alertText +=
                "e幣和寶石不足！ 再努力一點，還差" +
                finalCoins * -1 +
                "元！\n" +
                finalGems * -1 +
                "個寶石！";
              $.alert(alertWindow("", alertText));
            } else if ( finalCoins < 0 ) {
              alertText +=
                "e幣不足！ 再努力一點，還差" + finalCoins * -1 + "元！\n";
              $.alert(alertWindow("", alertText));
            } else if ( finalGems < 0 ) {
              alertText +=
                "寶石不足！ 再努力一點，還差" + finalGems * -1 + "個寶石！";
              $.alert(alertWindow("", alertText));
            }
          } else {
            // 寶箱升級成功
            let platformTarget = $("#" + chestId);
            let dataLevel = putData.level;

            let successGif = "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/upgradeStatus/upgradeSuccess" +
              dataLevel +
              ".gif'>";

            upgradeToTransaction("升級成功", successGif);

            if ( dataLevel === 6 ) {
              platformTarget.find(".upgradeButton").hide();
            }

            platformTarget.data("level", dataLevel);
            determineLevel(
              platformTarget.find(".chest"),
              dataLevel
            );
          }
        }
      }
    );
  }
};
