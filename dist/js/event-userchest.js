$(function() {
  // 判斷寶箱狀態
  let determineStatus = function(chest, thisPlatformTarget, chestSatuts) {
    let imgChestTarget = thisPlatformTarget.find("img.chest");
    let chestId = chest.id;
    let chestLevel = chest.level;

    // 移除style 顯示，放入chestId, chestLevel
    thisPlatformTarget.prop("id", chestId).attr("data-level", chestLevel);

    thisPlatformTarget.find(".startButton").attr("data-status", chest.status);

    if (chestLevel === 6) {
      thisPlatformTarget.find(".upgradeButton").hide();
      thisPlatformTarget.find(".chest").addClass("lv6-chest");
    }

    if (chestLevel === 5 || chestLevel === 6) {
      thisPlatformTarget.find(".chest").addClass("lv5-chest");
    }

    if (chestSatuts === "LOCKED") {
      console.log("===============> status is locked <=================");
      determineLevel(imgChestTarget, chestLevel);
    } else if (chestSatuts === "UNLOCKING") {
      console.log("=============> status is unlocking <================");
      imgChestTarget.addClass("unlockingGray");

      $(".container .space .startButton").hide();
      thisPlatformTarget.find(".upgradeButton").hide();

      determineLevel(imgChestTarget, chestLevel);
      coolDownTime(chestId);
    } else if (chestSatuts === "READY") {
      console.log("=================> status is ready <================");

      let chestImage = "readyChest" + chestLevel;
      thisPlatformTarget.find(".startButton").hide();
      thisPlatformTarget.find(".upgradeButton").hide();
      thisPlatformTarget.find(".readyButton").show();

      changeChestImage(imgChestTarget, chestImage);
    }
  };

  ajaxGet(
    "https://test.ehanlin.com.tw/chest/retrieve",
    null,
    function(jsonData) {
      console.log("成功抓取學生寶箱資料！ (by user)");
      let indexPlatformTarget;
      let chests = jsonData.content;

      for (let i = 0; i < chests.length; i++) {
        let chest = chests[i];
        indexPlatformTarget = $(".container .space .platform:eq(" + i + ")");
        indexPlatformTarget.show();
        determineStatus(chest, indexPlatformTarget, chest.status);
      }

      // 雲端銀行
      $(".space .bank").on("click", function() {
        window.open("/event/space/currencyBank.html", "雲端銀行");
        return false;
      });

      // 啟動按鈕
      $(".container .space .startButton").on("click", function() {
        let findParents = $(this).parents(".platform");
        let chestId = findParents.prop("id");

        updateStatusIsUnlocking(chestId);
      });

      // 升級按鈕
      var upgradeBtnFunc = function() {
        $(".container .space .upgradeButton").one("click", function() {
          let findParents = $(this).parents(".platform");
          let chestId = findParents.prop("id");
          let chestLevel = findParents.data("level");

          // 預備提升寶箱的等級
          getCondition(chestId, chestLevel + 1);
        });
      };
      upgradeBtnFunc();

      // 開啟按鈕
      $(".readyButton").on("click", function() {
        let chestId = $(this)
          .parents(".platform")
          .prop("id");
        eventChest.updateStatusIsOpen(chestId);
      });
    },
    function() {}
  );
});

let determineLevel = function(chestTarget, chestLevel) {
  let chestImage = "chest" + chestLevel;
  changeChestImage(chestTarget, chestImage);
};

let changeChestImage = function(chestTarget, chestImage) {
  chestTarget.prop(
    "src",
    "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/chest/" +
      chestImage +
      ".png"
  );
};
