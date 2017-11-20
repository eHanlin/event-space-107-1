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

    $(".ready").one("click", function() {
      var chestId = $(this)
        .parents(".readyButton")
        .prop("id");
      $(this)
        .remove()
        .parents(".readyButton");
      console.log(chestId);
      if (confirm("確定要將寶箱開啟？")) {
        updateStatusIsOpen(chestId);
      } else {
        location.reload();
      }
    });
  });
});

var determineStatus = function(chest, goButton, readyButton) {
  var newGoReady, newGoButton;

  if (chest.status === "LOCKED") {
    console.log("status is locked");
    newGoButton = goButton.clone();
    $(".book-intro .banner").after(newGoButton);
    newGoButton
      .removeAttr("style")
      .prop("id", chest.id)
      .attr("data-level", chest.level);
  } else if (chest.status === "UNLOCKING") {
    console.log("status is unlocking");
    coolDownTime(chest.id);
  } else if (chest.status === "READY") {
    console.log("status is ready");
    newGoReady = readyButton.clone();
    $(".book-intro .banner").after(newGoReady);
    newGoReady.removeAttr("style").prop("id", chest.id);
  } else if (chest.status === "OPEN") {
    console.log("status is open");
  }
};
