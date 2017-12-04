$(function() {
  getAwards();
});

var getAwards = function() {
  ajaxGet(
    "http://127.0.0.1:8080/chest/retrieve/award",
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
