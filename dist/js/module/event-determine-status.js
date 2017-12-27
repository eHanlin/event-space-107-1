define(["jquery", "determineLevel", "chestChangeImg"],
  function ($, determineLevel, chestChangeImg) {
    return function (chest, platformTarget, chestSatuts) {
      let imgChestTarget = platformTarget.find("img.chest");
      let chestId = chest.id;
      let chestLevel = chest.level;

      // 移除style 顯示，放入chestId, chestLevel
      platformTarget.prop("id", chestId).attr("data-level", chestLevel);
      platformTarget.find(".startButton").attr("data-status", chest.status);

      determineLevel(platformTarget, chestLevel);

      if ( chestSatuts === "LOCKED" ) {
        chestChangeImg(imgChestTarget, `chest${chestLevel}`);
      } else if ( chestSatuts === "UNLOCKING" ) {
        let ajaxUtil = require("ajax-util");
        let chestUnlockCountDown = require("chestUnlockCountDown");
        imgChestTarget.addClass("unlockingGray");

        $(".container .space .startButton").hide();
        platformTarget.find(".upgradeButton").hide();
        chestChangeImg(imgChestTarget, `chest${chestLevel}`);

        ajaxUtil("GET", `http://localhost:8080/chest/coolDownTime/${chestId}`)
          .then(chestUnlockCountDown.start.bind(this, seconds, chestId, platformTarget));
      } else if ( chestSatuts === "READY" ) {
        platformTarget.find(".startButton").hide();
        platformTarget.find(".upgradeButton").hide();
        platformTarget.find(".readyButton").show();

        chestChangeImg(imgChestTarget, `readyChest${chestLevel}`);
      }
    };
  });