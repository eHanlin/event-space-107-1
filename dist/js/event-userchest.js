$(function () {
  // 判斷寶箱狀態
  let determineStatus = function (chest, thisPlatformTarget, chestSatuts) {
    let imgChestTarget = thisPlatformTarget.find("img.chest");
    let chestId = chest.id;
    let chestLevel = chest.level;

    // 移除style 顯示，放入chestId, chestLevel
    thisPlatformTarget.prop("id", chestId).attr("data-level", chestLevel);

    thisPlatformTarget.find(".startButton").attr("data-status", chest.status);

    if ( chestLevel === 6 ) {
      thisPlatformTarget.find(".upgradeButton").hide();
      thisPlatformTarget.find(".chest").addClass("lv6-chest");
    }

    if ( chestLevel === 5 ) {
      thisPlatformTarget.find(".chest").addClass("lv5-chest");
    }

    if ( chestSatuts === "LOCKED" ) {
      console.log("===============> status is locked <=================");
      determineLevel(imgChestTarget, chestLevel);
    } else if ( chestSatuts === "UNLOCKING" ) {
      console.log("=============> status is unlocking <================");
      imgChestTarget.addClass("unlockingGray");

      $(".container .space .startButton").hide();
      thisPlatformTarget.find(".upgradeButton").hide();

      determineLevel(imgChestTarget, chestLevel);
      coolDownTime(chestId);
    } else if ( chestSatuts === "READY" ) {
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
    function (jsonData) {
      let indexPlatformTarget;
      let chests = jsonData.content;

      for ( let i = 0; i < chests.length; i++ ) {
        let chest = chests[i];
        let colorPlatform = chest["colorPlatform"];
        indexPlatformTarget = $(".container " + "#" + colorPlatform.toLowerCase()).find(".platform");
        //indexPlatformTarget = $(".container .space .platform:eq(" + i + ")");
        indexPlatformTarget.show();

        determineStatus(chest, indexPlatformTarget, chest.status);
      }

      // 啟動按鈕
      startBtnFunc();

      // 升級按鈕
      upgradeBtnFunc();

      // 開啟按鈕
      readyBtnFunc();
    },
    function () {
    }
  );

  // 雲端銀行按鈕
  $(".space .bank").on("click", function () {
    window.open("/event/space/currencyBank.html", "雲端銀行");
    return false;
  });
});

// 啟動按鈕
let startBtnFunc = function () {
  $(".container .space .startButton[data-onlocked=false]").on("click", function () {
    let findParents = $(this).parents(".platform");
    let chestId = findParents.prop("id");
    $(this).attr("data-onlocked", "true");
    updateStatusIsUnlocking(chestId, $(this));
  });
};

// 開啟按鈕
let upgradeBtnFunc = function () {
  $(".container .space .upgradeButton[data-onlocked=false]").on("click", function () {
    let findParents = $(this).parents(".platform");
    let chestId = findParents.prop("id");
    let chestLevel = findParents.data("level");
    $(this).attr("data-onlocked", "true");

    // 預備提升寶箱的等級
    getCondition(chestId, chestLevel + 1, $(this));
  });
};

// 開啟按鈕
let readyBtnFunc = function () {
  $(".container .space .readyButton[data-onlocked=false]").on("click", function () {
    let chestId = $(this)
      .parents(".platform")
      .prop("id");
    $(this).attr("data-onlocked", "true");
    eventChest.updateStatusIsOpen(chestId, $(this));
  });
};

let determineLevel = function (chestTarget, chestLevel) {
  let chestImage = "chest" + chestLevel;
  changeChestImage(chestTarget, chestImage);
};

let changeChestImage = function (chestTarget, chestImage) {
  chestTarget.prop(
    "src",
    "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/chest/" +
    chestImage +
    ".png"
  );
};
