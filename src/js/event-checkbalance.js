var getUpgrade = function(chestId, chestLevel) {
  ajax(
    "PUT",
    "http://127.0.0.1:8080/chest/upgrade/" + chestId,
    {
      user: "學生1號",
      level: chestLevel + 1
    },
    function(jsonData) {
      console.log("成功抓取升級的寶箱資料！");
      console.log(jsonData.content);
    }
  );
};

// var getChest = function(chest) {
//   var chestId = chest.id;
//   ajaxGet("http://127.0.0.1:8080/chest/retrieve/one/" + chestId, null, function(
//     jsonData
//   ) {
//     var level = jsonData.content.level;
//     var user = jsonData.content.user;
//     console.log("成功抓取學生寶箱資料！ (by id)");
//     getCondition(level);
//   });
// };

// var getCondition = function(chestLevel) {
//   var upgradeLevel = chestLevel + 1;
//   ajaxGet(
//     "http://127.0.0.1:8080/chest/condition/one/level" + upgradeLevel,
//     null,
//     function(jsonData) {
//       console.log("成功抓取寶箱升級條件！");
//       console.log(jsonData.content);
//     }
//   );
// };
