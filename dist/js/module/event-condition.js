define(["require", "jquery"], function (require, $) {
  return {
    getChestLevel: function (chestId, upLevel) {
      let ajaxUtil = require("ajax-util");
      let chestUpgrade = require("chestUpgrade");

      ajaxUtil("GET", `/chest/condition/one/level${upLevel}`)
        .then(function (jsonData) {
          let data = jsonData.content.content;
          let needCoins = data["coins"];
          let needGems = data["gems"];

          $.confirm(
            confirmWindow(
              `升級寶箱需花費 ${needCoins} e幣與 ${needGems} 寶石`,
              "你確定要升級嗎？",
              chestUpgrade.bind(this, chestId, upLevel)
            )
          );
        });
    }
  };
});