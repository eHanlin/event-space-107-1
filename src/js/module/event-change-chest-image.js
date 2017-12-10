define(function () {
  let changeChestImage = function (chestTarget, chestImage) {
    chestTarget.prop(
      "src",
      "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/chest/" +
      chestImage +
      ".png"
    );
  };

  return changeChestImage;
});