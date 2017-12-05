$(function () {
  getAwards();
});

let getAwards = function () {
  ajaxGet(
    "https://test.eahanlin.com.tw/chest/retrieve/award",
    null,
    function (jsonData) {
      console.log("成功抓取使用者獎勵累積！");
      for ( let i = 0; i < jsonData.length; i++ ) {
        jsonData[i].forEach(function (value, key) {
          console.log(value);
          console.log(key);
        });
      }

      var data = JSON.stringify(jsonData);
      console.log("data: " + data);

      $(".countingAwards ul li").append(data);
    },
    function () {
    }
  );
};
