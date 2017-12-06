<<<<<<< HEAD
$("#down-arrow").on("click",function(){$(this).hide(),$(".message .fadeMessage").removeAttr("style"),$(".background").attr("style","height:5900px"),$("#up-arrow").show()}),$("#up-arrow").on("click",function(){$(this).hide(),$(".message .fadeMessage").hide(),$(".background").attr("style","height:2950px"),$("#down-arrow").show()});
=======
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
>>>>>>> 92e43870c198e70026ba332c4f3fbcb2ae3beed6
