define(["jquery", "ajaxUtil"], function ($, ajaxUtil) {
  return function() {
    ajaxUtil("GET", "/currencyBank/totalAssets/retrieve/one")
      .then(function(jsonData){
        $(".bank").removeAttr("style");
        $(".space .coins span").append(jsonData.content["coins"]);
        $(".space .gems span").append(jsonData.content["gems"]);
      }, function() {
        $(".bankLogout").removeAttr("style");
      });
  };
});