var chest = {
  // 將寶箱狀態轉為開啟
  updateStatusIsOpen: function(chestId) {
    ajax(
      "PUT",
      "http://127.0.0.1:8080/chest/updateStatus/" + chestId,
      {
        status: "OPEN"
      },
      function(jsonData) {
        console.log("成功抓取updateStatusIsOpen資料！(Open)");

        var platformTarget = $("#" + chestId);
        platformTarget.find(".chest").hide();
        platformTarget.find(".readyButton").remove();
        $.alert(alertWindow("恭喜你獲得一台BMW X6M！", ""));
      }
    );
  },

  // 將寶箱狀態轉為準備開啟
  updateStatusIsReady: function(chestId) {
    ajax(
      "PUT",
      "http://127.0.0.1:8080/chest/updateStatus/" + chestId,
      {
        status: "READY"
      },
      function(jsonData) {
        console.log("成功抓取updateStatusIsReady資料！");

        var platFromTarget = $("#" + chestId);
        var chestTarget = platFromTarget.find(".chest");
        var level = platFromTarget.data("level");
        var chestImage = "readyChest" + level;

        platFromTarget.find(".readyButton").removeAttr("style");
        platFromTarget.find(".countdown").hide();
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
      "http://127.0.0.1:8080/chest/upgrade/" + chestId,
      putData,
      function(jsonData) {
        console.log("成功抓取升級的寶箱資料！");
        console.log(jsonData);

        var data = jsonData.content;
        var finalCoins = data.finalCoins;
        var finalGems = data.finalGems;
        var platformTarget = $("#" + chestId);
        var dataLevel = putData.level;

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

        if (finalCoins < 0) {
          $.alert(
            alertWindow(
              "金幣不足！ 再努力一點，還差" + finalCoins * -1 + "元！",
              ""
            )
          );
          return;
        }

        if (finalGems < 0) {
          $.alert(
            alertWindow(
              "寶石不足！ 再努力一點，還差" + finalGems * -1 + "個寶石！",
              ""
            )
          );
          return;
        }

        $.alert(
          alertWindow(
            "升級成功",
            "<img src='./img/upgradeStatus/upgradeSuccess" +
              putData.level +
              ".gif'>"
          )
        );

        platformTarget.data("level", dataLevel);
        determineLevel(platformTarget.find(".chest"), dataLevel);
      }
    );
  }
};
