$(function() {
  var user = "學生1號";
  ajaxGet("http://127.0.0.1:8080/chest/retrieve/" + user, null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！ (by user)");

    var platformTarget = $(".greenPlatform");
    jsonData.content.forEach(function(chest) {
      determineStatus(chest, platformTarget, chest.status);
    }, this);

    // 啟動按鈕
    $(".startButton").one("click", function() {
      var chestId = $(this)
        .parents(".greenPlatform")
        .prop("id");
      removeButton();
      updateStatusIsUnlocking(chestId);
    });

    // 升級按鈕
    $(".upgradeButton").on("click", function() {
      var chestId, chestLevel;
      var greenFindParents = $(this).parents(".greenPlatform");
      if (confirm("確定是否升級寶箱?")) {
        chestId = greenFindParents.prop("id");
        chestLevel = greenFindParents.data("level");
        getUpgrade(chestId, chestLevel);
      }
    });

    // 開啟按鈕
    $(".readyButton").on("click", function() {
      var chestId = $(this)
        .parents(".greenPlatform")
        .prop("id");
      console.log(chestId);
      if (confirm("確定要將寶箱開啟？")) {
        updateStatusIsOpen(chestId);
      }
    });
  });
});

var determineStatus = function(chest, platformTarget, chestSatuts) {
  var chestTarget = platformTarget.find("img.chest");
  var chestId = chest.id;
  var chestLevel = chest.level;

  if (chestSatuts === "LOCKED") {
    console.log("=================================> status is locked");
    platformTarget
      .removeAttr("style")
      .prop("id", chestId)
      .attr("data-level", chestLevel);
    determineLevel(chestTarget, chestLevel);
  }

  if (chestSatuts === "UNLOCKING") {
    console.log("=================================> status is unlocking");
    platformTarget
      .removeAttr("style")
      .prop("id", chestId)
      .attr("data-level", chestLevel);
    removeButton();

    determineLevel(chestTarget, chestLevel);
    coolDownTime(chestId);
  }

  if (chestSatuts === "READY") {
    console.log("=================================> status is ready");
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

  if (chestSatuts === "OPEN") {
    console.log("=================================> status is open");
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
  chestTarget.prop("src", "./img/" + chestImage + ".png");
};
