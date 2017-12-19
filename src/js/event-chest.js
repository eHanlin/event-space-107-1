let eventChest = {
  // 將寶箱狀態轉為開啟
  updateStatusIsOpen: function(chestId) {
    let openSuccess = function(jsonData) {
      let data = jsonData.content;
      let gainCoins = data["coins"];
      let gainGems = data["gems"];
      let totalCoins = data["totalCoins"];
      let totalGems = data["totalGems"];
      let gainAward = data["gainAward"];
      let gainAwardId = data["gainAwardId"];

      let platformTarget = $("#" + chestId);
      let chestLevel = platformTarget.attr("data-level");
      let openChestGif =
        "<div style='position: absolute; top: 0; left: 0; width: 245px; height:223px;" +
        "background-image: url(https://d220xxmclrx033.cloudfront.net" +
        "/event-space/img/chest/open/openChest" +
        chestLevel +
        ".gif);" +
        "background-size: contain;'></div>";

      let text =
        "<div style='position: absolute; top: 0; right: 0; height: 80px; width: 210px;'>" +
        "<div style='height: 32px; font-size: 22px;'>恭喜你獲得</div><br/>" +
        "<table width='100%' style='table-layout:fixed; font-size: 25px;'>";

      let awardText = "",
        coinsText = "",
        gemsText = "",
        content = "";

      platformTarget.find(".chest").fadeOut("slow");
      platformTarget.find(".readyButton").fadeOut("slow");

      if (gainCoins) {
        let coinsSvg =
          "<tr><td style='height: 36px; transform: translateY(-50%)'>" +
          "<div id='svg-coins' class='icon-coins'></div>";
        coinsText = coinsSvg + gainCoins + "</td>";
      }

      if (gainGems) {
        let gemsSvg =
          "<td style='height: 36px; transform: translateY(-50%)'>" +
          "<div id='svg-gems' class='icon-gems'></div>";
        gemsText = gemsSvg + gainGems + "</td>";
      }

      if (gainAward) {
        let awardImage =
          "<img style='width: 200px; height: 200px;' " +
          "src='https://d220xxmclrx033.cloudfront.net/event-space/img/award/" +
          gainAwardId +
          ".png' >" +
          "<br/>";

        awardText = "<h2>" + gainAward + "</h2>" + awardImage;
      }

      content =
        "<div style='height: 300px;'>" +
        openChestGif +
        text +
        coinsText +
        gemsText +
        "</tr>" +
        "</table>" +
        awardText +
        "</div>" +
        "</div>";

      $.confirm(writeAcceptanceInfo(content, totalCoins, totalGems));
    };

    ajax(
      "PUT",
      "/chest/open/" + chestId,
      {
        status: "OPEN"
      },
      openSuccess
    );
  },

  // 將寶箱狀態轉為準備開啟
  updateStatusIsReady: function(chestId) {
    let body;
    body = {
      status: "READY"
    };

    ajax(
      "PUT",
      "/chest/updateStatus/" + chestId,
      body,
      function() {
        let platFromTarget = $("#" + chestId);
        let chestTarget = platFromTarget.find(".chest");
        let level = platFromTarget.attr("data-level");
        let chestImage = "readyChest" + level;
        let startButtonTarget = platFromTarget.find(".startButton");

        platFromTarget.find(".readyButton").fadeIn("slow");
        platFromTarget.find(".countdown").remove();

        startButtonTarget.attr("data-status", body.status);
        $(".container .space .startButton[data-status=LOCKED]").fadeIn("slow");

        changeChestImage(chestTarget, chestImage);
      }
    );
  },

  // 將寶箱狀態轉為升級
  getUpgrade: function(chestId, upLevel) {
    let putData = {
      level: upLevel
    };

    ajax("PUT", "/chest/upgrade/" + chestId, putData, function(jsonData) {
      let upgradeContent = jsonData.content;
      let upgradeToTransaction = function(alertTitle, alertGif) {
        ajaxDeferred("POST", "/currencyBank/transaction/upgrade", {
          upgradeAuditId: upgradeContent["upgradeAuditId"]
        })
          .then(function() {
            return ajaxDeferred(
              "GET",
              "/currencyBank/totalAssets/retrieve/one"
            );
          })
          .then(function(jsonData) {
            $.alert(
              alertWindow(alertTitle, alertGif, function() {
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
        // 餘額不足
        if (finalCoins || finalGems) {
          let alertText = "";

          if (finalCoins < 0 && finalGems < 0) {
            alertText +=
              "e 幣和寶石不足！ 再努力一點，還差" +
              finalCoins * -1 +
              "元！ " +
              finalGems * -1 +
              "個寶石！";
          } else if (finalCoins < 0) {
            alertText +=
              "e 幣不足！ 再努力一點，還差" + finalCoins * -1 + "元！";
          } else if (finalGems < 0) {
            alertText +=
              "寶石不足！ 再努力一點，還差" + finalGems * -1 + "個寶石！";
          }

          $.alert(alertWindow("", alertText));
        } else {
          // 寶箱升級成功
          let platformTarget = $("#" + chestId);
          let dataLevel = putData.level;

          let successGif =
            "<img src='https://d220xxmclrx033.cloudfront.net" +
            "/event-space/img/chest/upgradeStatus/upgradeSuccess" +
            dataLevel +
            ".gif'>";

          upgradeToTransaction("升級成功", successGif);

          if (dataLevel === 5) {
            platformTarget.find(".chest").addClass("lv5-chest");
          } else if (dataLevel === 6) {
            platformTarget.find(".chest").addClass("lv6-chest");
            platformTarget.find(".upgradeButton").hide();
          }

          platformTarget.attr("data-level", dataLevel);
          determineLevel(platformTarget.find(".chest"), dataLevel);
        }
      }
    });
  }
};
