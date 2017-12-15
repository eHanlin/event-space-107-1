define(["jquery", "ajaxUtil", "changeChestImage"], function ($, ajaxUtil, changeChestImage) {
  return function (chestId) {
    ajaxUtil(
      "PUT",
      "https://www.ehanlin.com.tw/chest/updateStatus/" + chestId,
      {
        status: "READY"
      }
    ).then(function () {
      let platFromTarget = $("#" + chestId);
      let chestTarget = platFromTarget.find(".chest");
      let level = platFromTarget.data("level");
      let chestImage = "readyChest" + level;
      let startButtonTarget = platFromTarget.find(".startButton");

      platFromTarget.find(".readyButton").fadeIn("slow");
      platFromTarget.find(".countdown").fadeOut("slow");

      startButtonTarget.attr("data-status", body.status);
      $(".container .space .startButton[data-status=LOCKED]").fadeIn("slow");

      changeChestImage(chestTarget, chestImage);
    });
  }
});