<<<<<<< HEAD
var index=1,getAwardMessage=function(index,introduction){ajaxGet("https://test.ehanlin.com.tw/chest/condition/one/award"+index,null,function(jsonData){console.log("成功抓取獎品的資料描述！");var data=jsonData.content,notice=data.content.notice,needChestLv=data.content.needChestLv,rank=data.content.rank,desc=data.desc,quantity=data.content.quantity,introduction=data.content.introduction;$("#award .text").text(desc),$("#award img").attr("src","https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/award/award"+index+".png"),$(".dialogue #notice").text(notice),$(".dialogue #needChestLv").text(needChestLv),$(".dialogue #quantity").text(quantity),$(".dialogue #rank").text(rank),$(".dialogue #title").text(desc),$(".dialogue #introduction").text(introduction)},function(){})};$("#right-arrow").on("click",function(){getAwardMessage(++index),index>=17&&(index=0)}),$("#left-arrow").on("click",function(){0===--index&&(index=17),getAwardMessage(index)});var alertFunc=function(){var notice=$(".dialogue #notice").text(),needChestLv=$(".dialogue #needChestLv").text(),rank=$(".dialogue #rank").text(),quantity=$(".dialogue #quantity").text(),desc=$(".dialogue #title").text(),introduction=$(".dialogue #introduction").text();$.alert(alertForAward(desc,rank,quantity,needChestLv,introduction,notice,""))};$(".dialogue").on("click",function(){alertFunc()}),$("#award .text").on("click",function(){alertFunc()});
=======
$(function() {
  var getAwardMessage = function(index) {
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

        $(".space article .text").text(desc);
        $(".space .dialogue #notice").text(notice);
        $(".space .dialogue #needChestLv").text(needChestLv);
        $(".space .dialogue #quantity").text(quantity);
        $(".space .dialogue #rank").text(rank);
        $(".space .dialogue #title").text(desc);
        $(".space .dialogue #introduction").text(introduction);
      },
      function() {}
    );
  };

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
    cycleAfter();
  };

  var cycleAfter = function() {
    $(".container .space #award").on("cycle-after", function(
      event,
      optionHash,
      outgoingSlideEl,
      incomingSlideEl,
      forwardFlag
    ) {
      let index = incomingSlideEl.getAttribute("data-index");
      getAwardMessage(index);
    });
  };

  getAwardMessage(1);
  cycleAfter();

  $(".container article .seeDetail").on("click", function() {
    alertFunc();
  });
});
>>>>>>> 92e43870c198e70026ba332c4f3fbcb2ae3beed6
