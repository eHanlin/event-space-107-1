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
      for (let i = 0; i < data.length; i++) {
        $(".countingAwards").append(data[i]);
        getConditionAwards(data[i]);
      }
    },
    function() {}
  );
};

var getConditionAwards = function(awardId) {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/condition/one/" + awardId,
    null,
    function(jsonData) {
      console.log("成功抓取awardId資料！");
      var awardName = jsonData.content.desc;
      console.log("awardName: " + awardName);
    },
    function() {}
  );
};
