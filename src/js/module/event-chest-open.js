define(["jquery", "popup", "ajaxUtil"], function($, popup, ajaxUtil) {
  return function(chestId, readyBtnTarget) {
    let openSuccess = function(jsonData) {
      let data = jsonData.content;
      let gainCoins = data["coins"];
      let gainGems = data["gems"];
      let totalCoins = data["totalCoins"];
      let totalGems = data["totalGems"];
      let gainAward = data["gainAward"];
      let gainAwardId = data["gainAwardId"];
      let RangeRandomMapping = data["rangeRandomMapping"];

      let platformTarget = $("#" + chestId);
      let chestLevel = platformTarget.data("level");
      let openChestGif =
        "<div style='float: left; width: 245px; height:223px;" +
        "background-image: url(https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource" +
        "/event-space/img/chest/open/openChest" +
        chestLevel +
        ".gif);" +
        "background-size: contain;'></div>";

      let text =
        "<div style='position: absolute; top: 0; right: 140px; height: 80px; width: 210px;'>" +
        "<div style='height: 32px; font-size: 22px;'>恭喜你獲得</div><br/>" +
        "<table width='100%' style='table-layout:fixed; font-size: 25px;'>";
      let awardText = "",
        coinsText = "",
        gemsText = "";

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
          "src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/award/" +
          gainAwardId +
          ".png' >" +
          "<br/>";

        awardText = gainAward + awardImage;
      }

      $.alert(
        popup.alert(
          "",
          "<div style='height: 450px;'>" +
            openChestGif +
            text +
            coinsText +
            gemsText +
            "</tr>" +
            "</table>" +
            awardText +
            "</div>" +
            "</div>",
          function() {
            let originalCoins = $(".space .coins #own-coins").text();
            let originalGems = $(".space .gems #own-gems").text();

            countTrasition("own-coins", originalCoins, totalCoins);
            countTrasition("own-gems", originalGems, totalGems);
            getAwards();
          }
        )
      );
    };

    ajaxUtil("PUT", "https://www.ehanlin.com.tw/chest/open/" + chestId, {
      status: "OPEN"
    }).then(openSuccess);
  };
});
