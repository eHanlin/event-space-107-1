$(function() {
  ajax("GET", "http://127.0.0.1:8080/chest/retrieve/學生1號", null, function(
    jsonData
  ) {
    console.log("成功抓取學生寶箱資料！");

    var goButton = $(".goButton");
    jsonData.content.forEach(function(element) {
      console.log(element);
      determineStatus(element, goButton);
    }, this);

    $(".go").on("click", function() {
      var chestId = $(this)
        .parents(".goButton")
        .prop("id");
      alert(chestId);
      updateStatus(chestId);
    });
  });
});

var determineStatus = function(element, goButton) {
  if (element.status === "LOCKED") {
    var newGoButton = goButton.clone();
    $(".book-intro .banner").after(newGoButton);
    newGoButton.removeAttr("style").prop("id", element.id);
  }
};

// $(document).on("click", ".go", this, function(chestId) {
//   var chestId = $(this)
//     .parents(".goButton")
//     .prop("id");
//   $(this)
//     .remove()
//     .parents(".goButton");
//   updateStatus(chestId);
// });
