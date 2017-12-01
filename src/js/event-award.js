var index = 1;
var getAwardMessage = function(index, introduction) {
  ajaxGet(
    "https://test.ehanlin.com.tw/chest/condition/one/award" + index,
    null,
    function(jsonData) {
      console.log("成功抓取獎品的資料描述！");
      var data = jsonData.content;

      var notice = data.content.notice;
      var needChestLv = data.content.needChestLv;
      var rank = data.content.rank;
      var desc = data.desc;
      var quantity = data.content.quantity;
      var introduction = data.content.introduction;
      $("#award .text").text(desc);
      $("#award img").attr(
        "src",
        "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/award/award" +
          index +
          ".png"
      );

      $(".dialogue #notice").text(notice);
      $(".dialogue #needChestLv").text(needChestLv);
      $(".dialogue #quantity").text(quantity);
      $(".dialogue #rank").text(rank);
      $(".dialogue #title").text(desc);
      $(".dialogue #introduction").text(introduction);
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

var alertFunc = function() {
  var notice = $(".dialogue #notice").text();
  var needChestLv = $(".dialogue #needChestLv").text();
  var rank = $(".dialogue #rank").text();
  var quantity = $(".dialogue #quantity").text();
  var desc = $(".dialogue #title").text();
  var introduction = $(".dialogue #introduction").text();
  $.alert(
    alertForAward(desc, rank, quantity, needChestLv, introduction, notice, "")
  );
};

$(".dialogue").on("click", function() {
  alertFunc();
});

$("#award .text").on("click", function() {
  alertFunc();
});
