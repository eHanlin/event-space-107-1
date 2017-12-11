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
        var title = data.content.title;
        var desc = data.desc;
        var provide = data.content.provide;
        var introduction = data.content.introduction;

        // dialogue顯示
        $(".space article .text")
          .empty()
          .append(desc);

        $(".space .dialogue #notice").text(notice);
        $(".space .dialogue #needChestLv").text(needChestLv);
        $(".space .dialogue #quantity").text(provide);
        // $(".space .dialogue #rank").text(rank);
        $(".space .dialogue #title").text(title);
        $(".space .dialogue #introduction").text(introduction);
      },
      function() {}
    );
  };

  var alertFunc = function() {
    var notice = $(".dialogue #notice").text();
    var needChestLv = $(".dialogue #needChestLv").text();
    // var rank = $(".dialogue #rank").text();
    var provide = $(".dialogue #quantity").text();
    var title = $(".dialogue #title").text();
    var introduction = $(".dialogue #introduction").text();
    $.alert(
      alertForAward(title, null, provide, needChestLv, introduction, notice, "")
    );
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

  $(".container .returnAwardBtn").on("click", function() {
    $.alert(alertWindow("", "將於12/18前開放回填資料，敬請期待", ""));
  });
});
