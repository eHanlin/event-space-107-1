$(function() {
  var user = "學生1號";
  ajaxGet("http://127.0.0.1:8080/chest/retrieve/" + user, null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！ (by user)");

    var button = $(".greenPlatform");
    var readyBtn = $(".greenReadyPlatFrom");
    jsonData.content.forEach(function(chest) {
      determineStatus(chest, button, readyBtn);
    }, this);

    $(".startButton").one("click", function() {
      var chestId = $(this)
        .parents(".greenPlatform")
        .prop("id");
      location.reload();
      updateStatusIsUnlocking(chestId);
    });

    $(".upgradeButton").on("click", function() {
      var chestId, chestLevel;
      var greenFindParents = $(this).parents(".greenPlatform");
      if (confirm("確定是否升級寶箱?")) {
        chestId = greenFindParents.prop("id");
        chestLevel = greenFindParents.data("level");
        getUpgrade(chestId, chestLevel);
      }
    });

    $(".readyButton").one("click", function() {
      var chestId = $(this)
        .parents(".greenReadyPlatFrom")
        .prop("id");
      $(this)
        .remove()
        .parents(".greenReadyPlatFrom");
      console.log(chestId);
      if (confirm("確定要將寶箱開啟？")) {
        updateStatusIsOpen(chestId);
        readyBtn.remove();
      } else {
        location.reload();
      }
    });
  });
});

var determineStatus = function(chest, button, readyBtn) {
  var newGoReady, newGoButton;

  if (chest.status === "LOCKED") {
    console.log("=================================> status is locked");
    button
      .removeAttr("style")
      .prop("id", chest.id)
      .attr("data-level", chest.level);
    determineLevel(chest);
  } else if (chest.status === "UNLOCKING") {
    console.log("=================================> status is unlocking");
    $("#green").append("<div class='countdown'></div>");
    button
      .removeAttr("style")
      .prop("id", chest.id)
      .attr("data-level", chest.level);
    $(".upgradeButton").remove();
    $(".startButton").remove();
    determineLevel(chest);
    coolDownTime(chest.id);
  } else if (chest.status === "READY") {
    console.log("=================================> status is ready");
    $(".upgradeButton").remove();
    $(".startButton").remove();
    determineReadyStatus(chest);
    readyBtn.removeAttr("style").prop("id", chest.id);
  } else if (chest.status === "OPEN") {
    console.log("=================================> status is open");
  }
};

var determineLevel = function(chest) {
  var chestLevel = chest.level;
  if (chestLevel === 1) {
    $(".greenPlatform").append("<img class='chest' src='./img/chest1.png'>");
  }
  if (chestLevel === 2) {
    $(".greenPlatform").append("<img class='chest' src='./img/chest2.png'>");
  }
  if (chestLevel === 3) {
    $(".greenPlatform").append("<img class='chest' src='./img/chest3.png'>");
  }
  if (chestLevel === 4) {
    $(".greenPlatform").append("<img class='chest' src='./img/chest4.png'>");
  }
  if (chestLevel === 5) {
    $(".greenPlatform").append("<img class='chest' src='./img/chest5.png'>");
  }
  if (chestLevel === 6) {
    $(".greenPlatform").append("<img class='chest' src='./img/chest6.png'>");
  }
};

var determineReadyStatus = function(chest) {
  var chestStatus = chest.status;
  var chestLevel = chest.level;
  if (chestStatus === "READY" && chestLevel === 1) {
    $(".greenReadyPlatFrom").append(
      "<img class='greenReadyChest' src='./img/readyChest1.png'>"
    );
    $(".greenReadyPlatFrom").append(
      "<button class='readyButton' type='button'> 開啟 </button>"
    );
  }
  if (chestStatus === "READY" && chestLevel === 2) {
    $(".greenReadyPlatFrom").append(
      "<img class='greenReadyChest' src='./img/readyChest2.png'>"
    );
    $(".greenReadyPlatFrom").append(
      "<button class='readyButton' type='button'> 開啟 </button>"
    );
  }
  if (chestStatus === "READY" && chestLevel === 3) {
    $(".greenReadyPlatFrom").append(
      "<img class='greenReadyChest' src='./img/readyChest3.png'>"
    );
    $(".greenReadyPlatFrom").append(
      "<button class='readyButton' type='button'> 開啟 </button>"
    );
  }
  if (chestStatus === "READY" && chestLevel === 4) {
    $(".greenReadyPlatFrom").append(
      "<img class='greenReadyChest' src='./img/readyChest4.png'>"
    );
    $(".greenReadyPlatFrom").append(
      "<button class='readyButton' type='button'> 開啟 </button>"
    );
  }
  if (chestStatus === "READY" && chestLevel === 5) {
    $(".greenReadyPlatFrom").append(
      "<img class='greenReadyChest' src='./img/readyChest5.png'>"
    );
    $(".greenReadyPlatFrom").append(
      "<button class='readyButton' type='button'> 開啟 </button>"
    );
  }
  if (chestStatus === "READY" && chestLevel === 6) {
    $(".greenReadyPlatFrom").append(
      "<img class='greenReadyChest' src='./img/readyChest6.png'>"
    );
    $(".greenReadyPlatFrom").append(
      "<button class='readyButton' type='button'> 開啟 </button>"
    );
  }
};
