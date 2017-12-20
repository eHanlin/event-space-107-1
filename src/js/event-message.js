$("#down-button").on("click", function() {
  $(this).hide();
  $(".message .fadeMessage").removeAttr("style");
  $(".background").attr("style", "height:5500px");
  $("#up-button").show();
});

$("#up-button").on("click", function() {
  $(this).hide();
  $(".message .fadeMessage").hide();
  $(".background").attr("style", "height:2980px");
  $("#down-button").show();
});
