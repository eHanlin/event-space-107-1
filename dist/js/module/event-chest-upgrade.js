define(["require", "jquery", "ajaxUtil"], function (require, $, ajaxUtil) {
  return function (chestId, upLevel) {
    let putData = {
      level: upLevel
    };

    ajaxUtil("PUT", `http://localhost:8080/chest/upgrade/${chestId}`, putData)
      .then(function (jsonData) {
        require("jqueryConfirm");
        let popup = require("popup");
        let upgradeContent = jsonData.content;
        let upgradeToTransaction = function (alertTitle, alertGif) {
          ajaxUtil(
            "POST", `http://localhost:9090/currencyBank/transaction/upgrade?userSpecific=596f1ce1e4b062375bdec803`,
            {
              upgradeAuditId: upgradeContent["upgradeAuditId"]
            }
          ).then(function () {
            return ajaxUtil("GET", `http://localhost:9090/currencyBank/totalAssets/retrieve/one?userSpecific=596f1ce1e4b062375bdec803`);
          }).then(function (jsonData) {
            $.alert(popup.alert(alertTitle, alertGif, function () {
                let countTransition = require("countTransition");
                let content = jsonData.content;
                let originalCoins = $(".space .coins #own-coins").text();
                let originalGems = $(".space .gems #own-gems").text();

                countTransition("own-coins", originalCoins, content["coins"]);
                countTransition("own-gems", originalGems, content["gems"]);
              })
            );
          });
        };

        if ( jsonData.message.indexOf("failure") >= 0 ) {
          let failLevel = upLevel - 1;
          let failureGif = `<img src='https://d220xxmclrx033.cloudfront.net
          /event-space/img/chest/upgradeStatus/upgradeFail${failLevel}.gif'>`;
          upgradeToTransaction("升級失敗", failureGif);
        } else {
          // -------- 如果餘額不足，會回傳 finalCoins 和 finalGems
          let insufficientCoins = upgradeContent["insufficientCoins"];
          let insufficientGems = upgradeContent["insufficientGems"];
          // --------------------------------------------------

          if ( insufficientCoins || insufficientGems ) {
            let alertText = "";

            if ( insufficientCoins < 0 && insufficientGems < 0 ) {
              alertText += `e 幣和寶石不足！ 再努力一點，還差 ${insufficientCoins * -1} 元，${insufficientGems * -1} 個寶石！`;
            } else if ( insufficientCoins < 0 ) {
              alertText += `e 幣不足！ 再努力一點，還差 ${insufficientCoins * -1} 元！`;
            } else if ( insufficientGems < 0 ) {
              alertText += `寶石不足！ 再努力一點，還差 " ${insufficientGems * -1} 個寶石！`;
            }

            $.alert(popup.alert("", alertText));
          } else {
            // 寶箱升級成功
            let chestChangeImg = require("chestChangeImg");
            let platformTarget = $("#" + chestId);
            let chestLevel = putData.level;

            let successGif = `<img src='https://d220xxmclrx033.cloudfront.net
            /event-space/img/chest/upgradeStatus/upgradeSuccess" 
            ${chestLevel}.gif'>`;

            let determineLevel = require("determineLevel");

            upgradeToTransaction("升級成功", successGif);

            determineLevel(platformTarget, chestLevel);
            platformTarget.attr("data-level", chestLevel);
            chestChangeImg(platformTarget.find(".chest"), chestLevel);
          }
        }
      });
  };
});
