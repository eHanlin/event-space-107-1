var index = 1;
var getAwardMessage = function(index, introduction) {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/condition/one/award" + index,
    null,
    function(jsonData) {
      console.log("成功抓取獎品的資料描述！");
      var data = jsonData.content;
      var desc = data.desc;
      var introduction = data.content.introduction;
      $("#award .text").text(desc);
      $("#award img").attr(
        "src",
        "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/award/award" +
          index +
          ".png"
      );
      $(".dialogue #title").text(desc);
      $(".dialogue #detail").text(introduction);
    },
    function() {}
  );
};

$("#right-arrow").on("click", function() {
  index++;
  getAwardMessage(index);
  if (index >= 17) {
    index = 0;
  }
});

$("#left-arrow").on("click", function() {
  index--;
  if (index === 0) {
    index = 17;
  }
  getAwardMessage(index);
});

var alertFunc = function(desc, introduction) {
  var desc = $(".dialogue #title").text();
  var introduction = $(".dialogue #detail").text();
  $.alert(alertWindow(desc, introduction, ""));
};

$(".dialogue").on("click", function() {
  alertFunc();
});

$("#award .text").on("click", function() {
  alertFunc();
});
