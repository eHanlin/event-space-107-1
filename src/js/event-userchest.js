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
      var chestId, chestLevel;
      var findParents = $(this).parents(".goButton");
      if (confirm("確定是否升級寶箱?")) {
        chestId = findParents.prop("id");
        chestLevel = findParents.data("level");
        getUpgrade(chestId, chestLevel);
      }
    });
  });
});

var determineStatus = function(chest, goButton, readyButton) {
  var chestId = chest.id;
  var level = chest.level;
  var newGoReady, newGoButton;

  if (chest.status === "LOCKED") {
    console.log("status is locked");
    newGoButton = goButton.clone();
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
    newGoReady = readyButton.clone();
    $(".book-intro .banner").after(newGoReady);
    newGoReady.removeAttr("style").prop("id", chestId);
  }
};
