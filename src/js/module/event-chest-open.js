define(["jquery", "popup", "ajaxUtil"], function ($, popup, ajaxUtil) {
  return function (chestId, readyBtnTarget) {
    let openSuccess = function (jsonData) {
      let data = jsonData.content;
      let gainCoins = data["coins"];
      let gainGems = data["gems"];
      let finalCoins = data["finalCoins"];
      let finalGems = data["finalGems"];
      let gainAward = data["gainAward"];
      let gainAwardId = data["gainAwardId"];


      let platformTarget = $("#" + chestId);
      let chestLevel = platformTarget.attr("data-level");
      let openChestGif =
        `<div style='float: left; width: 245px; height:223px;
        background-image: url(https://d220xxmclrx033.cloudfront.net
        /event-space/img/chest/open/openChest
        ${chestLevel}.gif);
        background-size: contain;'></div>`;

      let text = `<div style='position: absolute; top: 0; right: 140px; height: 80px; width: 210px;'>" +
        <div style='height: 32px; font-size: 22px;'>恭喜你獲得</div><br/>
        <table width='100%' style='table-layout:fixed; font-size: 25px;'>`;

      let awardText = "", coinsText = "", gemsText = "";

      platformTarget.find(".chest").fadeOut("slow");
      platformTarget.find(".readyButton").fadeOut("slow");

      if ( gainCoins ) {
        let coinsSvg = `<tr><td style='height: 36px; transform: translateY(-50%)'>
          <div id='svg-coins' class='icon-coins'></div>`;
        coinsText = `${coinsSvg}${gainCoins}</td>`;
      }

      if ( gainGems ) {
        let gemsSvg = `<td style='height: 36px; transform: translateY(-50%)'>
          <div id='svg-gems' class='icon-gems'></div>`;
        gemsText = `${gemsSvg}${gainGems}</td>`
      }

      if ( gainAward ) {
        let awardImage = `<img style='width: 200px; height: 200px;' 
           src='https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png' >
          <br/>`;

        awardText = `${gainAward}${awardImage}`;
      }

      $.alert(
        popup.alert(
          "",
          `<div style='height: 450px;'>${openChestGif}${text}${coinsText}${gemsText}</tr></table>${awardText}</div></div>`,
          function () {
            let originalCoins = $(".space .coins #own-coins").text();
            let originalGems = $(".space .gems #own-gems").text();

            countTrasition("own-coins", originalCoins, finalCoins);
            countTrasition("own-gems", originalGems, finalGems);
            getAwards();
          }
        )
      );
    };

    ajaxUtil("PUT", `https://www.ehanlin.com.tw/chest/open/${chestId}`, {
      status: "OPEN"
    }).then(openSuccess);
  };
});
