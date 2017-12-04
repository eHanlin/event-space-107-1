$(function() {
  getAwards();
});

var getAwards = function() {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/retrieve/award",
    null,
    function(jsonData) {
      console.log("成功抓取使用者獎勵累積！");
      console.log(jsonData);
    },
    function() {}
  );
};
