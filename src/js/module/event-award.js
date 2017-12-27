define(["jquery", "ajaxUtil", "popup"], function ($, ajaxUtil, popup) {
  let dialogue =  $(".space .dialogue");
  let notice = dialogue.find("#notice");
  let needChestLv = dialogue.find("#needChestLv");
  let quantity = dialogue.find("#quantity");
  let title = dialogue.find("#title");
  let introduction = dialogue.find("#introduction");

  let getAwardMessage = function (index) {
    ajaxUtil("GET", `http://localhost:8080/chest/condition/one/award${index}`)
      .then(function (jsonData) {
        let awardConditionContent = jsonData.content.content;
        let desc = awardCondition.desc;

        // dialogue顯示
        $(".space article .text")
          .empty()
          .append(desc);

        notice.text(awardConditionContent["notice"]);
        needChestLv.text(awardConditionContent["needChestLv"]);
        quantity.text(["provide"]);
        title.text(["title"]);
        introduction.text(["introduction"]);
      });
  };

  let alertFunc = function () {
    let noticeTest = notice.text();
    let needChestLvText = needChestLv.text();
    let provideText = quantity.text();
    let titleText = title.text();
    let introductionText = introduction.text();

    let content = `<h1><br>贈品數量：${provideText} 名 <br><p style='color:yellow'>
      可獲取的寶箱：Lv.${needChestLvText}</p><br>${introductionText}<br><br></h1>
      <h2>小提醒：${noticeTest}</h2>`;

    $.alert(popup.alert(titleText, content));
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

});