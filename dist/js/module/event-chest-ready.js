define(['require', 'jquery', 'ajaxUtil'], function (require, $, ajaxUtil) {
  return function (chestId) {
    let data = {
      status: 'READY'
    }
    ajaxUtil('PUT', `http://localhost:8080/chest/updateStatus/${chestId}`, data)
      .then(function () {
        let chestChangeImg = require('chestChangeImg')

        let platFromTarget = $('#' + chestId)
        let chestTarget = platFromTarget.find('.chest')
        let level = platFromTarget.attr('data-level')
        let chestImage = 'readyChest' + level
        let startButtonTarget = platFromTarget.find('.startButton')

        platFromTarget.find('.readyButton').fadeIn('slow')
        platFromTarget.find('.countdown').fadeOut('slow')

        startButtonTarget.attr('data-status', data.status)
        $('.container .space .startButton[data-status=LOCKED]').fadeIn('slow')

        chestChangeImg(chestTarget, chestImage)
      })
  }
})
