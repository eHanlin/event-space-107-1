$(function() {
  var user = "學生1號";
  ajaxGet("http://127.0.0.1:8080/chest/retrieve/" + user, null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！ (by user)");

    var platformTarget = $(".greenPlatform");
    jsonData.content.forEach(function(chest) {
      determineStatus(chest, platformTarget);
    }, this);

    // 開始倒數按鈕
    $(".startButton").one("click", function() {
      var chestId = $(this)
        .parents(".greenPlatform")
        .prop("id");
      removeButton();
      updateStatusIsUnlocking(chestId);
    });

    // 升級按鈕
    $(".upgradeButton").on("click", function() {
      // var chestId, chestLevel;
      // var greenFindParents = $(this).parents(".greenPlatform");
      // if (confirm("確定是否升級寶箱?")) {
      //   chestId = greenFindParents.prop("id");
      //   chestLevel = greenFindParents.data("level");
      //   getUpgrade(chestId, chestLevel);
      // }
    });

    // 開啟按鈕
    $(".readyButton").one("click", function() {
      // var chestId = $(this)
      //   .parents(".greenReadyPlatForm")
      //   .prop("id");
      // $(this)
      //   .remove()
      //   .parents(".greenReadyPlatForm");
      // console.log(chestId);
      // if (confirm("確定要將寶箱開啟？")) {
      //   updateStatusIsOpen(chestId);
      //   readyBtn.remove();
      // } else {
      //   location.reload();
      // }
    });
  });
});

var determineStatus = function(chest, platformTarget) {
  var chestTarget = platformTarget.find(".chest");
  var chestId = chest.id;
  var chestLevel = chest.level;

  if (chest.status === "LOCKED") {
    console.log("=================================> status is locked");
    platformTarget
      .removeAttr("style")
      .prop("id", chestId)
      .attr("data-level", chestLevel);
    determineLevel(chestTarget, chestLevel);
  }

  if (chest.status === "UNLOCKING") {
    console.log("=================================> status is unlocking");
    platformTarget
      .removeAttr("style")
      .prop("id", chestId)
      .attr("data-level", chestLevel);

    determineLevel(chestTarget, chestLevel);
    coolDownTime(chestId);
  }

  if (chest.status === "READY") {
    console.log("=================================> status is ready");

    var chestImage = "readyChest" + chestLevel;
    changeChestImage(chestTarget, chestImage);
    //platformTarget.find(".readyButton").removeAttr("style");
    // greenReadyPlatFrom.removeAttr("style").prop("id", chest.id);
    // removeButton();
    // determineReadyStatus(chest);
  }

  if (chest.status === "OPEN") {
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

// var determineReadyStatus = function(chest) {
//   var chestStatus = chest.status;
//   var chestLevel = chest.level;
//   if (chestStatus === "READY") {
//     $(".greenReadyPlatForm").append(
//       "<img class='greenReadyChest' src='./img/readyChest" +
//         chestLevel +
//         ".png'>"
//     );
//     $(".greenReadyPlatForm").append(
//       "<button class='readyButton' type='button'> 開啟 </button>"
//     );
//   }
// };
