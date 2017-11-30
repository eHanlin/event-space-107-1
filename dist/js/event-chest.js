var eventChest = {
  // 將寶箱狀態轉為開啟
  updateStatusIsOpen: function (chestId) {
    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
      {
        status: "OPEN"
      },
      function (jsonData) {
        console.log("成功抓取updateStatusIsOpen資料！(Open)");

        var platformTarget = $("#" + chestId);
        platformTarget.find(".chest").fadeOut("slow");
        platformTarget.find(".readyButton").fadeOut("slow");
        $.alert(alertWindow("恭喜你獲得一台BMW X6M！", ""));
      }
    );
  },

  // 將寶箱狀態轉為準備開啟
  updateStatusIsReady: function (chestId) {
    var body = { status: "READY" };

    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
      body,
      function (jsonData) {
        console.log("成功抓取updateStatusIsReady資料！");

        var platFromTarget = $("#" + chestId);
        var chestTarget = platFromTarget.find(".chest");
        var level = platFromTarget.data("level");
        var chestImage = "readyChest" + level;
        var startButtonTarget = platFromTarget.find(".startButton");

        platFromTarget.find(".readyButton").fadeIn("slow");
        platFromTarget.find(".countdown").fadeOut("slow");

        startButtonTarget.attr("data-status", body.status);
        $(".startButton[data-status=LOCKED]").fadeIn("slow");

        changeChestImage(chestTarget, chestImage);
      }
    );
  },

  // 將寶箱狀態轉為升級
  getUpgrade: function (chestId, chestLevel) {
    var putData = {
      level: chestLevel + 1
    };

    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/upgrade/" + chestId,
      putData,
      function (jsonData) {
        console.log("成功抓取升級的寶箱資料！");
        console.log(jsonData);

        let data = jsonData.content;

        // -------- 如果餘額不足，會回傳 finalCoins 和 finalGems
        let finalCoins = data.finalCoins;
        let finalGems = data.finalGems;
        // --------------------------------------------------

        let platformTarget = $("#" + chestId);
        let dataLevel = putData.level;
        let upgradeToTransaction;
        let upgradeAuditId;
        let determineBalance = function (finalCoins, finalGems) {
          let alertText = "";
          let isInsufficient = true;


          if ( finalCoins && finalCoins < 0 && finalGems >= 0 ) {
            alertText = "e幣不足！ 再努力一點，還差" + finalCoins * -1 + "元！";
            isInsufficient = false;
          } else if ( finalGems && finalGems < 0 && finalCoins >= 0 ) {
            alertText = "寶石不足！ 再努力一點，還差" + finalGems * -1 + "個寶石！";
            isInsufficient = false;
          } else if ( finalGems && finalGems ) {
            alertText = "e幣和寶石不足！ 再努力一點，還差" + finalCoins * -1 + "e幣";
            alertText += "和" + finalGems * -1 + "個寶石！";
          }

          $.alert(
            alertWindow(
              alertText,
              ""
            )
          );

          return isInsufficient;
        };

        if ( !determineBalance(finalCoins, finalGems) ) {
          return;
        }

        // 如果餘額足夠，則直接回傳 upgradeAuditId
        // 使用ajax deferred 的方式
        upgradeAuditId = data;
        upgradeToTransaction = function () {
          ajaxDeferred(
            "POST",
            "https://test.ehanlin.com.tw/currencyBank/transaction/upgrade",
            {
              upgradeAuditId: upgradeAuditId
            }
          ).then(function (jsonData) {
            return ajaxDeferred(
              "GET",
              "https://test.ehanlin.com.tw/currencyBank/totalAssets/retrieve/one"
            );
          }).then(function (jsonData) {
            console.log("current totalAssets: " + jsonData.content);

            $(".space .coins span")
              .empty()
              .append(jsonData.content.coins);
            $(".space .gems span")
              .empty()
              .append(jsonData.content.gems);
          });
        };

        $.alert(
          alertWindow(
            "升級成功",
            "<img src='./img/upgradeStatus/upgradeSuccess" +
            putData.level +
            ".gif'>",
            upgradeToTransaction
          )
        );

        platformTarget.data("level", dataLevel);
        determineLevel(platformTarget.find(".chest"), dataLevel);
      }
    );
  }
};
