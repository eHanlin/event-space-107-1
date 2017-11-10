$(function() {
  ajaxGet("http://127.0.0.1:8080/chest/retrieve/學生1號", null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！");

    var goButton = $(".goButton");
    var chestId;
    jsonData.content.forEach(function(field) {
      chestId = field.id;
      determineStatus(field, goButton, chestId);
    }, this);

    $(".go").on("click", function() {
      var chestId = $(this)
        .parents(".goButton")
        .prop("id");
      $(this)
        .remove()
        .parents(".goButton");
      updateStatus(chestId);
    });
  });
});

var determineStatus = function(field, goButton, chestId) {
  if (field.status === "LOCKED") {
    var newGoButton = goButton.clone();
    $(".book-intro .banner").after(newGoButton);
    newGoButton.removeAttr("style").prop("id", chestId);
  } else if (field.status === "UNLOCKING") {
    console.log("status is unlocking");
    coolDownTime(chestId);
  } else if (field.status === "READY") {
    console.log("status is ready");
  }
};
