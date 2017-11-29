$(function() {
  getTotalAssets(user);
});

var getTotalAssets = function(user) {
  ajaxGet(
    "https://test.ehanlin.com.tw/currencyBank/totalAssets/retrieve/one"
    null,
    function(jsonData) {
      $(".space .coins span").append(jsonData.content.coins);
      $(".space .gems span").append(jsonData.content.gems);
    }
  );
};
