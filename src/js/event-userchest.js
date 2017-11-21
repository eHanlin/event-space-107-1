$(function() {
  var user = "學生1號";
  ajaxGet("http://127.0.0.1:8080/chest/retrieve/" + user, null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！ (by user)");

    var button = $(".greenButton");
    var readyBtn = $(".greenReadyButton");
    jsonData.content.forEach(function(chest) {
      determineStatus(chest, button, readyBtn);
    }, this);

    $(".startButton").one("click", function() {
      var chestId = $(this)
        .parents(".greenButton")
        .prop("id");

      // $(this)
      //   .remove()
      //   .parents(".greenButton");
      location.reload();
      updateStatusIsUnlocking(chestId);
    });

    $(".upgradeButton").on("click", function() {
      var chestId, chestLevel;
      var greenFindParents = $(this).parents(".greenButton");
      if (confirm("確定是否升級寶箱?")) {
        chestId = greenFindParents.prop("id");
        chestLevel = greenFindParents.data("level");
        getUpgrade(chestId, chestLevel);
      }
    });

    $(".readyButton").one("click", function() {
      var chestId = $(this)
        .parents(".greenReadyButton")
        .prop("id");
      $(this)
        .remove()
        .parents(".greenReadyButton");
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
    //newGoButton = goButton.clone();
    //$(".book-intro").after(newGoButton);
    button
      .removeAttr("style")
      .prop("id", chest.id)
      .attr("data-level", chest.level);
  } else if (chest.status === "UNLOCKING") {
    console.log("=================================> status is unlocking");
    button
      .removeAttr("style")
      .prop("id", chest.id)
      .attr("data-level", chest.level);
    $(".upgradeButton").remove();
    $(".startButton").remove();
    coolDownTime(chest.id);
  } else if (chest.status === "READY") {
    console.log("=================================> status is ready");
    // newGoReady = readyButton.clone();
    // $(".book-intro").after(newGoReady);
    readyBtn.removeAttr("style").prop("id", chest.id);
  } else if (chest.status === "OPEN") {
    console.log("=================================> status is open");
  }
};
