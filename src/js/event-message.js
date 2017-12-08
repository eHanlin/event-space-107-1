$("#down-button").on("click", function() {
  $(this).hide();
  $(".message .fadeMessage").removeAttr("style");
  $(".background").attr("style", "height:4700px");
  $("#up-button").show();
});

$("#up-button").on("click", function() {
  $(this).hide();
  $(".message .fadeMessage").hide();
  $(".background").attr("style", "height:2750px");
  $("#down-button").show();
});
