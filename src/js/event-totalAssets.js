$(function() {
  ajaxGet(
    "http://localhost:9090/currencyBank/totalAssets/retrieve/one?userParam=學生1號",
    null,
    function(jsonData) {
      console.log(jsonData.content);

      $(".space .coins span").append(jsonData.content.coins);
      $(".space .gems span").append(jsonData.content.gems);
    }
  );
});
