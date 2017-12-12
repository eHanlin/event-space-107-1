$(function() {
  ajaxGet(
    "http://localhost:9090/currencyBank/totalAssets/retrieve/one?userSpecific=5950a1e077c81e5ef884dfd5",
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
