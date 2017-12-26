define(["jquery"], function ($) {
  return {
    // 啟動按鈕
    incept: function () {
      $(".container .space .startButton").on("click", function (event) {
        let findParents, chestId;
        event.preventDefault();

        if ( !$(this).attr("data-lockedAt") || +new Date() - $(this).attr("data-lockedAt") > 1000 ) {
          findParents = $(this).parents(".platform");
          chestId = findParents.prop("id");

          updateStatusIsUnlocking(chestId);
        }
        // +new Date() 等於 new Date().getTime()
        $(this).attr("data-lockedAt", +new Date());
      });
    },

    // 升級按鈕
    upgrade: function () {
      $(".container .space .upgradeButton").on("click", function (event) {
        let findParents, chestId, chestLevel;
        event.preventDefault();

        if (
          !$(this).attr("data-lockedAt") || +new Date() - $(this).attr("data-lockedAt") > 1000
        ) {
          let chestUpgrade = require("chestUpgrade");

          findParents = $(this).parents(".platform");
          chestId = findParents.prop("id");
          chestLevel = +findParents.attr("data-level");

          // 預備提升寶箱的等級
          chestUpgrade(chestId, chestLevel + 1);
        }

        // +new Date() 等於 new Date().getTime()
        $(this).attr("data-lockedAt", new Date().getTime());
      });
    },

    // 開啟
    open: function () {
      $(".container .space .readyButton").on("click", function (event) {
        let chestId;
        event.preventDefault();
        if (
          !$(this).attr("data-lockedAt") || +new Date() - $(this).attr("data-lockedAt") > 300
        ) {
          chestId = $(this)
            .parents(".platform")
            .prop("id");

          eventChest.updateStatusIsOpen(chestId, $(this));
        }
        // +new Date() 等於 new Date().getTime()
        $(this).attr("data-lockedAt", +new Date());
      });
    },


  }
});