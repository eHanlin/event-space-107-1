$("#down-button").on("click", function() {
  $(this).hide();
  $(".message .fadeMessage").removeAttr("style");
  $(".background").attr("style", "height:5540px");
  $("#up-button").show();
});

$("#up-button").on("click", function() {
  $(this).hide();
  $(".message .fadeMessage").hide();
  $(".background").attr("style", "height:3020px");
  $("#down-button").show();
});
