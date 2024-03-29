let updateStatusIsUnlocking = function (chestId) {
  let unlock = function () {
    $.confirm(
      confirmWindow('確定啟動寶箱嗎！？', '', function () {
        ajaxDeferred('PUT', '/chest/updateStatus/' + chestId, {
          status: 'UNLOCKING'
        })
          .then(function () {
            $('.container .space .startButton[data-status=LOCKED]').fadeOut(
              'slow'
            )
            upgradeButtonTarget.fadeOut('slow')
            startButtonTarget.attr('data-status', 'UNLOCKING')

            return ajaxDeferred('GET', '/chest/coolDownTime/' + chestId)
          })
          .then(function (jsonData) {
            countDown(jsonData.content, chestId, platformTarget)
          })
      })
    )
  }

  let platformTarget = $('#' + chestId)
  let startButtonTarget = platformTarget.find('.startButton')
  let upgradeButtonTarget = platformTarget.find('.upgradeButton')
  let chestLevel = platformTarget.attr('data-level')

  $.confirm(
    alertWindow('', '<h3>雲端銀河探險活動已結束，無法啟動任何寶箱了囉！<h3>')
  )
}

let countDown = function (seconds, chestId, platformTarget) {
  let imgChestTarget = platformTarget.find('.chest')
  let countdownTarget = platformTarget.find('.countdown')
  let openNowBtnTarget = platformTarget.find('.openNowButton')

  imgChestTarget.addClass('unlockingGray')
  openNowBtnTarget.removeAttr('style')

  let countDownFunc = function (seconds) {
    countdownTarget.countDown({
      timeInSecond: seconds,
      displayTpl: "<i style='font-size:28px;color:yellow' class='fa'>&#xf254;</i>{hour}時{minute}分{second}秒",
      limit: 'hour',
      // 當倒數計時完畢後 callback
      callback: function () {
        openNowBtnTarget.fadeOut()
        eventChest.updateStatusIsReady(chestId)
        imgChestTarget.removeClass('unlockingGray')
      }
    })
  }

  // 立即開啟按鈕
  let openNowBtnFunc = function () {
    platformTarget.find('.openNowButton').on('click', function (event) {
      event.preventDefault()
      // +new Date() 等於 new Date().getTime()
      if (!$(this).attr('data-lockedAt') ||
        +new Date() - +$(this).attr('data-lockedAt') > 1000
      ) {
        let seconds
        let chestId = $(this)
          .parents('.platform')
          .prop('id')

        ajaxDeferred('GET', '/chest/coolDownTime/' + chestId)
          .then(function (jsonData) {
            seconds = jsonData.content

            return ajaxDeferred('GET', '/chest/condition/one/openImmediately')
          })
          .then(function (jsonData) {
            let openImmediatelyData = jsonData.content
            let consume = openImmediatelyData['content']
            let everySecondsHour = 3600
            let remainHours = Math.ceil(seconds / everySecondsHour)
            let deductGems = remainHours * consume.everyHourDeductGems

            $.confirm(
              confirmWindow(
                '立即開啟寶箱需要花費 ' + deductGems + ' 個寶石',
                '確定立即開啟寶箱嗎？',
                function () {
                  ajax(
                    'PUT',
                    '/chest/open/immediately/' + chestId, {
                      deductGems: deductGems
                    },
                    function (jsonData) {
                      let originalGems = $('.space .gems #own-gems').text()
                      let insufficientGems =
                        jsonData.content['insufficientGems']
                      let finalGems

                      if (insufficientGems > 0) {
                        $.alert(
                          alertWindow(
                            '你的寶石不足' + insufficientGems + ' 個',
                            '',
                            ''
                          )
                        )
                        return
                      }

                      finalGems = jsonData.content['finalGems']
                      countTrasition('own-gems', originalGems, finalGems)
                      countDownFunc(0)
                    }
                  )
                }
              )
            )
          })
      }

      // +new Date() 等於 new Date().getTime()
      $(this).attr('data-lockedAt', +new Date())
    })
  }

  // 立即開啟按鈕
  openNowBtnFunc()
  countDownFunc(seconds)
}
