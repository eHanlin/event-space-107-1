$(function () {
  ajaxGet(
    "/currencyBank/totalAssets/retrieve/one",
    null,
    function (jsonData) {
      let popupClosing = function () {
        $(".space-treasure-popup").show();
        setTimeout(function () {
          $(".space-treasure").addClass("space-treasure-show");
          $(".space-treasure .space-treasure-understand").on("click", function () {
            $(".space-treasure-popup").remove();
          });
        }, 500);
      };
      popupClosing();

      $(".bank").removeAttr("style");
      $(".space .coins span").append(jsonData.content["coins"]);
      $(".space .gems span").append(jsonData.content["gems"]);
    },

    function () {
      $(".bankLogout").removeAttr("style");
    }
  );
});
