let eventChest = {
  // 將寶箱狀態轉為開啟
  updateStatusIsOpen: function (chestId) {
    let openSuccess = function (jsonData) {
      console.log("成功抓取updateStatusIsOpen資料！(Open)");
      let data = jsonData.content;
      let gainCoins = data["coins"];
      let gainGems = data["gems"];
      let totalCoins = data["totalCoins"];
      let totalGems = data["totalGems"];
      let gainAward = data["gainAward"];
      let gainAwardId = data["gainAwardId"];

      let platformTarget = $("#" + chestId);
      let chestLevel = platformTarget.data("level");
      let openChestGif = "<div style='float: left; width: 250px; height: 250px;"
        + "background-image: url(https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource"
        + "/event-space/img/chest/open/openChest"
        + chestLevel
        + ".gif);"
        + "background-size: contain;'></div>";

      let text = "<div style='float: right; height: 300px; width: 220px;'>"
        + "<div style='height: 30px; font-size: 20px;'>恭喜你獲得</div><br/>"
        + "<table width='100%' style='table-layout:fixed; font-size: 22px;'>";
      let awardText = "", coinsText = "", gemsText = "";
      let popup;

      platformTarget.find(".chest").fadeOut("slow");
      platformTarget.find(".readyButton").fadeOut("slow");

      if ( gainCoins ) {
        let openCoins = "<tr><td style='height: 30px; transform: translateY(-50%)'>"
          + "<div id='open-coins' class='award-coins'></div>";
        coinsText = openCoins + gainCoins + " 金幣 </td></tr>";
      }

      if ( gainGems ) {
        let openGems = "<tr><td style='height: 30px; transform: translateY(-50%)'>"
          + "<div id='open-gems' class='award-gems'></div>";
        gemsText = openGems + gainGems + " 寶石 </td></tr>";
      }

      if ( gainAward ) {
        let awardImage = "<img style='width: 200px; height: 200px;'"
          + " src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/award/"
          + gainAwardId + ".png' ><br/>";
        awardText = gainAward + awardImage;
      }

      $.alert(
        alertWindow(
          "",
          "<div style='width: 500px;'>"
          + openChestGif + text + coinsText + gemsText
          + "</table>" + awardText + "</div>"
          + "</div>",
          function () {
            let originalCoins = $(".space .coins #own-coins").text();
            let originalGems = $(".space .gems #own-gems").text();
            countTrasition("own-coins", originalCoins, totalCoins);
            countTrasition("own-coins", originalGems, totalGems);
          }
        )
      );
    };

    $.confirm(
      confirmWindow(
        "確定開啟寶箱嗎！？", "", ajax.bind(this,
          "PUT",
          "https://test.ehanlin.com.tw/chest/open/" + chestId,
          {
            status: "OPEN"
          },
          openSuccess
        )
      )
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
        $(".container .space .startButton[data-status=LOCKED]").fadeIn("slow");

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
              upgradeAuditId: upgradeContent["upgradeAuditId"]
            }
          ).then(function (jsonData) {
            return ajaxDeferred(
              "GET",
              "https://test.ehanlin.com.tw/currencyBank/totalAssets/retrieve/one"
            );
          }).then(function (jsonData) {
            console.log("current totalAssets: " + jsonData.content);

            $.alert(
              alertWindow(
                alertTitle,
                alertGif,
                function () {
                  console.log("current totalAssets: " + jsonData.content);

                  $(".space .coins span")
                    .empty()
                    .append(jsonData.content["coins"]);
                  $(".space .gems span")
                    .empty()
                    .append(jsonData.content["gems"]);
                }
              )
            );
          });
        };

        if ( jsonData.message.indexOf("failure") >= 0 ) {
          console.log("升級失敗");
          let failLevel = upLevel - 1;
          let failureGif = "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource" +
            "/event-space/img/chest/upgradeStatus/upgradeFail" +
            failLevel +
            ".gif'>";
          upgradeToTransaction("升級失敗", failureGif);
        } else {
          // -------- 如果餘額不足，會回傳 finalCoins 和 finalGems
          let finalCoins = upgradeContent["finalCoins"];
          let finalGems = upgradeContent["finalGems"];
          // --------------------------------------------------
          if ( finalCoins || finalGems ) {
            let alertText = "";

            if ( finalCoins < 0 && finalGems < 0 ) {
              alertText +=
                "e 幣和寶石不足！ 再努力一點，還差" +
                finalCoins * -1 + "元！ " + finalGems * -1 + "個寶石！";
            } else if ( finalCoins < 0 ) {
              alertText +=
                "e 幣不足！ 再努力一點，還差" + finalCoins * -1 + "元！";
            } else if ( finalGems < 0 ) {
              alertText +=
                "寶石不足！ 再努力一點，還差" + finalGems * -1 + "個寶石！";
            }

            $.alert(alertWindow("", alertText));
          } else {
            // 寶箱升級成功
            let platformTarget = $("#" + chestId);
            let dataLevel = putData.level;

            let successGif = "<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource" +
              "/event-space/img/chest/upgradeStatus/upgradeSuccess" +
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
