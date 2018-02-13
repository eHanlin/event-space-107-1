
$(function () {
  let getAwardMessage = function (index) {
    ajaxGet(
      '/chest/condition/one/award' + index,
      null,
      function (jsonData) {
        let data = jsonData.content

        let notice = data.content.notice
        let needChestLv = data.content.needChestLv
        let rank = data.content.rank
        let title = data.content.title
        let desc = data.desc
        let provide = data.content.provide
        let introduction = data.content.introduction

        // dialogue顯示
        $('.space article .text')
          .empty()
          .append(desc)

        $('.space .dialogue #notice').text(notice)
        $('.space .dialogue #needChestLv').text(needChestLv)
        $('.space .dialogue #quantity').text(provide)
        // $(".space .dialogue #rank").text(rank);
        $('.space .dialogue #title').text(title)
        $('.space .dialogue #introduction').text(introduction)
      },
      function () {}
    )
  }

  let alertFunc = function () {
    let notice = $('.dialogue #notice').text()
    let needChestLv = $('.dialogue #needChestLv').text()
    // var rank = $(".dialogue #rank").text();
    let provide = $('.dialogue #quantity').text()
    let title = $('.dialogue #title').text()
    let introduction = $('.dialogue #introduction').text()
    $.alert(
      alertForAward(title, null, provide, needChestLv, introduction, notice, '')
    )
  }

  let cycleAfter = function () {
    $('.container .space #award').on('cycle-after', function (
      event,
      optionHash,
      outgoingSlideEl,
      incomingSlideEl,
      forwardFlag
    ) {
      let index = incomingSlideEl.getAttribute('data-index')
      getAwardMessage(index)
    })
  }

  getAwardMessage(1)
  cycleAfter()

  $('.container article .detailBtn').on('click', function () {
    alertFunc()
  })
})
