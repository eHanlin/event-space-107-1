$(function() {
  getAwards();
});

var getAwards = function() {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/retrieve/award",
    null,
    function(jsonData) {
      console.log("成功抓取使用者獎勵累積！");
      var data = JSON.stringify(jsonData);
      console.log("data: " + data);

      for (var property in jsonData) {
        output += property + ": " + jsonData[property] + "; ";
      }
      console.log("output:" + output);
    },
    function() {}
  );
};
