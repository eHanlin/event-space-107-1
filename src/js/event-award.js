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

        $(".space article .text").append(desc);
        $(".space .dialogue #notice").append(notice);
        $(".space .dialogue #needChestLv").append(needChestLv);
        $(".space .dialogue #quantity").append(quantity);
        // $(".space .dialogue #rank").text(rank);
        $(".space .dialogue #title").append(desc);
        $(".space .dialogue #introduction").append(introduction);
      },
      function() {}
    );
  };

  var alertFunc = function() {
    var notice = $(".dialogue #notice").append();
    var needChestLv = $(".dialogue #needChestLv").append();
    // var rank = $(".dialogue #rank").text();
    var quantity = $(".dialogue #quantity").append();
    var desc = $(".dialogue #title").append();
    var introduction = $(".dialogue #introduction").append();
    $.alert(
      alertForAward(desc, null, quantity, needChestLv, introduction, notice, "")
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

  $(".container article .detailBtn").on("click", function() {
    alertFunc();
  });
});
