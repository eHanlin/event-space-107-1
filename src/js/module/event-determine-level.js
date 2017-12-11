define(function () {
  return function(platformTarget, chestLevel) {
    if (chestLevel === 6) {
      platformTarget.find(".upgradeButton").hide();
      platformTarget.find(".chest").addClass("lv6-chest");
    } else if (chestLevel === 5) {
      platformTarget.find(".chest").addClass("lv5-chest");
    }
  };
});