$(function() {
  var user = "學生1號";
  ajaxGet("http://127.0.0.1:8080/chest/retrieve/" + user, null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！ (by user)");

    var platformTarget = $(".platform");
    jsonData.content.forEach(function(chest) {
      determineStatus(chest, platformTarget, chest.status);
    }, this);

    // 啟動按鈕
    $(".startButton").one("click", function() {
      var chestId = $(this)
        .parents(".platform")
        .prop("id");
      removeButton();
      updateStatusIsUnlocking(chestId);
    });

    // 升級按鈕
    $(".upgradeButton").on("click", function() {
      var chestId, chestLevel;
      var findParents = $(this).parents(".platform");

      var confrimFunction = function() {
        chest.getUpgrade(chestId, chestLevel, user);
      };

      chestId = findParents.prop("id");
      chestLevel = findParents.data("level");

      getCondition(chestLevel + 1, confrimFunction);
    });

    // 開啟按鈕
    $(".readyButton").on("click", function() {
      var chestId = $(this)
        .parents(".platform")
        .prop("id");
      chest.updateStatusIsOpen(chestId);
    });
  });
});

// 判斷寶箱狀態
var determineStatus = function(chest, platformTarget, chestSatuts) {
  var chestTarget = platformTarget.find("img.chest");
  var chestId = chest.id;
  var chestLevel = chest.level;

  if (chestSatuts === "LOCKED") {
    console.log("===============> status is locked <=================");
    platformTarget
      .removeAttr("style")
      .prop("id", chestId)
      .attr("data-level", chestLevel);
    determineLevel(chestTarget, chestLevel);
  }

  if (chestSatuts === "UNLOCKING") {
    console.log("=============> status is unlocking <================");
    platformTarget
      .removeAttr("style")
      .prop("id", chestId)
      .attr("data-level", chestLevel);
    removeButton();

    determineLevel(chestTarget, chestLevel);
    coolDownTime(chestId);
  }

  if (chestSatuts === "READY") {
    console.log("=================> status is ready <================");
    var chestImage;
    platformTarget
      .removeAttr("style")
      .prop("id", chestId)
      .attr("data-level", chestLevel);
    removeButton();

    platformTarget.find(".readyButton").removeAttr("style");
    chestImage = "readyChest" + chestLevel;
    changeChestImage(chestTarget, chestImage);
  }
};

var removeButton = function() {
  $(".upgradeButton").remove();
  $(".startButton").remove();
};

var determineLevel = function(chestTarget, chestLevel) {
  var chestImage = "chest" + chestLevel;
  changeChestImage(chestTarget, chestImage);
};

var changeChestImage = function(chestTarget, chestImage) {
  chestTarget.prop("src", "./img/chest/" + chestImage + ".png");
};
