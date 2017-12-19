define(function () {
  return function (chestTarget, chestImage) {
    chestTarget.prop(
      "src",
      "https://d220xxmclrx033.cloudfront.net/event-space/img/chest/" +
      chestImage +
      ".png"
    );
  };
});