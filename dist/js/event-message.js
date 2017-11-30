$("#down-arrow").on("click", function() {
  $(this).toggle("slow");
  $(".message .fadeMessage").removeAttr("style");
  $(".background").attr("style", "height:6550px");
  $("#up-arrow").toggle("slow");
});

$("#up-arrow").on("click", function() {
  $(this).fadeOut();
  $(".message .fadeMessage").fadeOut();
  $(".background").attr("style", "height:3000px");
  $("#down-arrow").show();
});
