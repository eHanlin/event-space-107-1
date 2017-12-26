require(["config"], function (config) {
  $(function () {
    // 雲端銀行按鈕
    $(".space .bank").on("click", function () {
      window.open("/event/space/currencyBank.html", "雲端銀行");
      return false;
    });

    // 領取贈品按鈕
    $(".container .returnAwardBtn").on("click", function () {
      window.open("/Events/winner_info.html?id=space", "回傳資料領取贈品");
      return false;
    });
  });

  require("ajaxUtil", function (ajaxUtil) {
    ajaxUtil("GET", "/chest/retrieve")
      .then(function (jsonData) {
          let determineStatus = require("determineStatus");
          let chestButton = require("chestButton");

          let indexPlatformTarget;
          let chests = jsonData.content;

          for ( let i = 0; i < chests.length; i++ ) {
            let chest = chests[i];
            let colorPlatform = chest["colorPlatform"];
            indexPlatformTarget = $(
              ".container " + "#" + colorPlatform.toLowerCase()
            ).find(".platform");
            //indexPlatformTarget = $(".container .space .platform:eq(" + i + ")");
            indexPlatformTarget.show();

            determineStatus(chest, indexPlatformTarget, chest.status);
          }

          // 啟動按鈕
          chestButton.incept();

          // 升級按鈕
          chestButton.upgrade();

          // 開啟按鈕
          chestButton.open();
        },
      );
  });
});
