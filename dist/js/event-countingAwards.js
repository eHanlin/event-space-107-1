$(function() {
  getAwards();
});

var getAwards = function() {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/retrieve/award",
    null,
    function(jsonData) {
      console.log("成功抓取使用者獎勵累積！");
      var data = jsonData.content;
      console.log(data);

      data.forEach(function(value, key) {
        if (value % 2 === 1) {
          $(".countingAwards .odd .key").append(key);
          $(".countingAwards .odd .value").append(value);
        } else {
          $(".countingAwards .even .key").append(key);
          $(".countingAwards .even .value").append(value);
        }
      });
    },
    function() {}
  );
};

// var getConditionAwards = function(awardId) {
//   ajaxGet(
//     "https://test.ehanlin.com.tw/chest/condition/one/" + awardId,
//     null,
//     function(jsonData) {
//       console.log("成功抓取awardId資料！");
//       var awardName = jsonData.content.desc;
//       console.log("awardName: " + awardName);
//     },
//     function() {}
//   );
// };
