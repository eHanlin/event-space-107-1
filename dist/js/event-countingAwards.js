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
      var countingAwards = data.award1;
      console.log(countingAwards);
      $(".countingAwards")
        .empty()
        .append(data);
    },
    function() {}
  );
};
