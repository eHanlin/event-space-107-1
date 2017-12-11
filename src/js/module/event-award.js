define(["jquery", "ajaxUtil", "popup"], function ($, ajaxUtil, popup) {
  return function () {
    let getAwardMessage = function (index) {
      ajaxUtil("GET", "https://test.ehanlin.com.tw/chest/condition/one/award" + index)
        .done(function (jsonData) {
          console.log("成功抓取獎品的資料描述！");
          let awardCondition = jsonData.content;

          let notice = awardCondition.content.notice;
          let needChestLv = awardCondition.content.needChestLv;
          let title = awardCondition.content.title;
          let desc = awardCondition.desc;
          let provide = awardCondition.content.provide;
          let introduction = awardCondition.content.introduction;

          // dialogue顯示
          $(".space article .text")
            .empty()
            .append(desc);

          $(".space .dialogue #notice").text(notice);
          $(".space .dialogue #needChestLv").text(needChestLv);
          $(".space .dialogue #quantity").text(provide);
          $(".space .dialogue #title").text(title);
          $(".space .dialogue #introduction").text(introduction);
        });
    };

    let alertFunc = function () {
      let notice = $(".dialogue #notice").text();
      let needChestLv = $(".dialogue #needChestLv").text();
      let provide = $(".dialogue #quantity").text();
      let title = $(".dialogue #title").text();
      let introduction = $(".dialogue #introduction").text();

      let content = "<h1>" +
        "<br>贈品數量：" +
        provide +
        "名" +
        "<br><p style='color:yellow'>可獲取的寶箱：Lv. " +
        needChestLv +
        "</p>" +
        "<br>" +
        introduction +
        "<br>" +
        "<br></h1>" +
        "<h2>小提醒：" +
        notice +
        "</h2>";

      $.alert(popup.alert(title, content));
    };

    getAwardMessage(1);

    $(".container article .detailBtn").on("click", alertFunc);

    $(".container .space #award").on("cycle-after",
      function (event, optionHash, outgoingSlideEl, incomingSlideEl) {
        let index = incomingSlideEl.getAttribute("data-index");
        getAwardMessage(index);
      });

    $(".container .returnAwardBtn").on("click", function () {
      $.alert(popup.alert("", "將於12/18前開放回填資料，敬請期待"));
    });
  }
});