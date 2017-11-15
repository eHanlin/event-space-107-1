$(function() {
  var user = "學生1號";
  ajaxGet("http://127.0.0.1:8080/chest/retrieve/" + user, null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！ (by user)");

    var goButton = $(".goButton");
    var readyButton = $(".readyButton");
    jsonData.content.forEach(function(chest) {
      determineStatus(chest, goButton, readyButton);
      // getChest(chest);
    }, this);

    $(".go").one("click", function() {
      var chestId = $(this)
        .parents(".goButton")
        .prop("id");
      $(this)
        .remove()
        .parents(".goButton");
      updateStatusIsUnlocking(chestId);
    });

    $(".upgradeButton").on("click", function() {
      var chestId = $(this)
        .parents(".goButton")
        .prop("id");
      var chestLevel = $(this)
        .parents(".goButton")
        .data("level");
      if (confirm("確定是否升級寶箱?")) {
        getUpgrade(chestId, chestLevel);
        location.reload();
      }
    });
  });
});

var determineStatus = function(chest, goButton, readyButton) {
  var chestId = chest.id;
  var level = chest.level;

  if (chest.status === "LOCKED") {
    console.log("status is locked");
    var newGoButton = goButton.clone();
    $(".book-intro .banner").after(newGoButton);
    newGoButton
      .removeAttr("style")
      .prop("id", chestId)
      .attr("data-level", level);
  } else if (chest.status === "UNLOCKING") {
    console.log("status is unlocking");
    coolDownTime(chestId);
  } else if (chest.status === "READY") {
    console.log("status is ready");
    var newGoReady = readyButton.clone();
    $(".book-intro .banner").after(newGoReady);
    newGoReady.removeAttr("style").prop("id", chestId);
  }
};
