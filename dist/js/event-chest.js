var eventChest = {
  // 將寶箱狀態轉為開啟
  updateStatusIsOpen: function(chestId) {
    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/updateStatus/" + chestId,
      {
        status: "OPEN"
      },
      function(jsonData) {
        console.log("成功抓取updateStatusIsOpen資料！(Open)");

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
  getUpgrade: function(chestId, chestLevel, user) {
    var putData = {
      user: user,
      level: chestLevel + 1
    };

    ajax(
      "PUT",
      "https://test.ehanlin.com.tw/chest/upgrade/" + chestId,
      putData,
      function(jsonData) {
        console.log("成功抓取升級的寶箱資料！");
        console.log(jsonData);

        var data = jsonData.content;

        // -------- 如果餘額不足，會回傳 finalCoins 和 finalGems
        var finalCoins = data.finalCoins;
        var finalGems = data.finalGems;
        // --------------------------------------------------

        var platformTarget = $("#" + chestId);
        var dataLevel = putData.level;
        var upgradeToTransaction;
        var upgradeAuditId;

        if (jsonData.message.indexOf("failure") > 0) {
          $.alert(
            alertWindow(
              "升級失敗",
              "<img src='./img/upgradeStatus/upgradeFail" +
                chestLevel +
                ".gif'>"
            )
          );
          return;
        }

        if (putData.level === 6) {
          platformTarget.find(".upgradeButton").toggle();
        }

        if (finalCoins && finalCoins < 0) {
          $.alert(
            alertWindow(
              "e幣不足！ 再努力一點，還差" + finalCoins * -1 + "元！",
              ""
            )
          );
          return;
        }

        if (finalGems && finalGems < 0) {
          $.alert(
            alertWindow(
              "寶石不足！ 再努力一點，還差" + finalGems * -1 + "個寶石！",
              ""
            )
          );
          return;
        }

        if (finalCoins < 0 && finalGems < 0) {
          $.alert(
            alertWindow(
              "e幣和寶石不足！ 再努力一點，還差" +
                finalCoins * -1 +
                "e幣和" +
                finalGems * -1 +
                "個寶石！",
              ""
            )
          );
          return;
        }

        // 如果餘額足夠，則直接回傳 upgradeAuditId
        // 使用ajax deferred 的方式
        upgradeAuditId = data;
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
