$(function() {
  getAwards();
});

var getAwards = function() {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/retrieve/award",
    null,
    function(jsonData) {
      console.log("成功抓取使用者獎勵累積！");
      var awards = jsonData.content;

      var index = 0;
      for (let key in jsonData.content) {
        var value = awards[key];

        $(".countingAwards .awardBox li:eq(" + index + ")").append(
          "<span style='width:120px;'>" + key + "</span>"
        );

        $(".countingAwards .awardBox li:eq(" + index + ")").append(
          "<h1><span>" + value + "</span></h1>"
        );
        index++;
      }
    },
    function() {}
  );
};
