$("#down-arrow").on("click", function() {
  $(this).hide();
  $(".message .fadeMessage").removeAttr("style");
  $(".background").attr("style", "height:4600px");
  $("#up-arrow").show();
});

$("#up-arrow").on("click", function() {
  $(this).hide();
  $(".message .fadeMessage").hide();
  $(".background").attr("style", "height:2650px");
  $("#down-arrow").show();
});
