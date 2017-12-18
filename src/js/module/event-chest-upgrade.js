define(["require", "jquery", "ajaxUtil"], function(require, $, ajaxUtil) {
  return function(chestId, upLevel, upgradeBtnTarget) {
    ajaxUtil("PUT", "https://www.ehanlin.com.tw/chest/upgrade/" + chestId, {
      level: upLevel
    }).then(function(jsonData) {
      let upgradeContent, popup, upgradeToTransaction;
      require("jqueryConfirm");
      upgradeContent = jsonData.content;
      popup = require("popup");

      upgradeToTransaction = function(alertTitle, alertGif) {
        ajaxUtil(
          "POST",
          "https://www.ehanlin.com.tw/currencyBank/transaction/upgrade",
          {
            upgradeAuditId: upgradeContent["upgradeAuditId"]
          }
        )
          .then(function() {
            return ajaxUtil(
              "GET",
              "https://www.ehanlin.com.tw/currencyBank/totalAssets/retrieve/one"
            );
          })
          .then(function(jsonData) {
            $.alert(
              popup.alert(alertTitle, alertGif, function() {
                let content = jsonData.content;

                let originalCoins = $(".space .coins #own-coins").text();
                let originalGems = $(".space .gems #own-gems").text();

                countTrasition("own-coins", originalCoins, content["coins"]);
                countTrasition("own-gems", originalGems, content["gems"]);
              })
            );
          });
      };

      if (jsonData.message.indexOf("failure") >= 0) {
        let failLevel = upLevel - 1;
        let failureGif =
          "<img src='https://d220xxmclrx033.cloudfront.net" +
          "/event-space/img/chest/upgradeStatus/upgradeFail" +
          failLevel +
          ".gif'>";
        upgradeToTransaction("升級失敗", failureGif);
      } else {
        // -------- 如果餘額不足，會回傳 finalCoins 和 finalGems
        let finalCoins = upgradeContent["finalCoins"];
        let finalGems = upgradeContent["finalGems"];
        // --------------------------------------------------

        if (finalCoins || finalGems) {
          let alertText = "";

          if (finalCoins < 0 && finalGems < 0) {
            alertText +=
              "e 幣和寶石不足！ 再努力一點，還差 " +
              finalCoins * -1 +
              " 元，" +
              finalGems * -1 +
              " 個寶石！";
          } else if (finalCoins < 0) {
            alertText +=
              "e 幣不足！ 再努力一點，還差 " + finalCoins * -1 + " 元！";
          } else if (finalGems < 0) {
            alertText +=
              "寶石不足！ 再努力一點，還差 " + finalGems * -1 + " 個寶石！";
          }

          $.alert(popup.alert("", alertText));
        } else {
          // 寶箱升級成功
          let platformTarget = $("#" + chestId);
          let chestLevel = putData.level;

          let successGif =
            "<img src='https://d220xxmclrx033.cloudfront.net" +
            "/event-space/img/chest/upgradeStatus/upgradeSuccess" +
            chestLevel +
            ".gif'>";

          let determineLevel = require("determineLevel");

          upgradeToTransaction("升級成功", successGif);

          determineLevel(platformTarget, chestLevel);
          platformTarget.data("level", chestLevel);
          determineLevel(platformTarget.find(".chest"), chestLevel);
        }
      }
    });
  };
});
