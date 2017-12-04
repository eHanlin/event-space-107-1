$(function() {
  ajaxGet(
    "https://test.ehanlin.com.tw/currencyBank/totalAssets/retrieve/one",
    null,
    function(jsonData) {
      console.log("成功抓取使用者資產！");
      $(".bank").removeAttr("style");
      $(".space .coins span").append(jsonData.content.coins);
      $(".space .gems span").append(jsonData.content.gems);
    },

    function() {
      $(".bankLogout").removeAttr("style");
    }
  );
});
