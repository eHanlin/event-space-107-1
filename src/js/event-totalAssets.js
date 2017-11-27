$(function() {
  var user = "5a1b741c9253f2e34a1cfe4e";
  getTotalAssets(user);
});

var getTotalAssets = function(user) {
  ajaxGet(
    "http://localhost:9090/currencyBank/totalAssets/retrieve/one?userSpecific=" +
      user,
    null,
    function(jsonData) {
      console.log(jsonData.content);

      $(".space .coins span").append(jsonData.content.coins);
      $(".space .gems span").append(jsonData.content.gems);
    }
  );
};
