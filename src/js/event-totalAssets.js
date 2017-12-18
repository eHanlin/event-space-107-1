$(function() {
  ajaxGet(
    "/currencyBank/totalAssets/retrieve/one",
    null,
    function(jsonData) {
      $(".bank").removeAttr("style");
      $(".space .coins span").append(jsonData.content["coins"]);
      $(".space .gems span").append(jsonData.content["gems"]);
    },

    function() {
      $(".bankLogout").removeAttr("style");
    }
  );
});
