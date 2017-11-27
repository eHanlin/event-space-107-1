$(function() {
  var user = "5a1b741c9253f2e34a1cfe4e";
  ajaxGet("http://127.0.0.1:8080/chest/retrieve/" + user, null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！ (by user)");

    var indexPlatformTarget;
    var chest;
    var chests = jsonData.content;
    for (let i = 0; i < chests.length; i++) {
      chest = chests[i];
      indexPlatformTarget = $(".platform:eq(" + i + ")");
      determineStatus(chest, indexPlatformTarget, chest.status);
    }

    // 啟動按鈕
    $(".startButton").one("click", function() {
      var findParents = $(this).parents(".platform");
      var chestId = findParents.prop("id");

      $(".startButton[data-status=LOCKED]").toggle("slow");
      findParents.find(".upgradeButton").toggle("slow");
      updateStatusIsUnlocking(chestId);
    });

    // 升級按鈕
    $(".upgradeButton").on("click", function() {
      var findParents = $(this).parents(".platform");
      var confrimFunction;
      var chestId = findParents.prop("id");
      var chestLevel = findParents.data("level");

      confrimFunction = function() {
        eventChest.getUpgrade(chestId, chestLevel, user);
      };
      getCondition(chestLevel + 1, confrimFunction);
    });

    // 開啟按鈕
    $(".readyButton").on("click", function() {
      var chestId = $(this)
        .parents(".platform")
        .prop("id");
      eventChest.updateStatusIsOpen(chestId);
    });
  });
});

// 判斷寶箱狀態
var determineStatus = function(chest, thisPlatformTarget, chestSatuts) {
  var chestTarget = thisPlatformTarget.find("img.chest");
  var chestId = chest.id;
  var chestLevel = chest.level;

  thisPlatformTarget
    .removeAttr("style")
    .prop("id", chestId)
    .attr("data-level", chestLevel);

  thisPlatformTarget.find(".startButton").attr("data-status", chest.status);

  if (chestSatuts === "LOCKED") {
    console.log("===============> status is locked <=================");
    determineLevel(chestTarget, chestLevel);
  } else if (chestSatuts === "UNLOCKING") {
    console.log("=============> status is unlocking <================");
    $(".startButton").toggle();
    thisPlatformTarget.find(".upgradeButton").toggle();

    determineLevel(chestTarget, chestLevel);
    coolDownTime(chestId);
  } else if (chestSatuts === "READY") {
    console.log("=================> status is ready <================");
    var chestImage;
    thisPlatformTarget.find(".startButton").toggle();
    thisPlatformTarget.find(".upgradeButton").toggle();

    thisPlatformTarget.find(".readyButton").removeAttr("style");
    chestImage = "readyChest" + chestLevel;
    changeChestImage(chestTarget, chestImage);
  }
};

var determineLevel = function(chestTarget, chestLevel) {
  var chestImage = "chest" + chestLevel;
  changeChestImage(chestTarget, chestImage);
};

var changeChestImage = function(chestTarget, chestImage) {
  chestTarget.prop("src", "./img/chest/" + chestImage + ".png");
};
