$(function() {
  ajaxGet(
    "http://localhost:9090/currencyBank/totalAssets/retrieve/one?userSpecific=5a279014e4b0a1c5c9d5a852",
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
