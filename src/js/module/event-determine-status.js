define(function (require) {
  return function (chest, platformTarget, chestStatus) {
    let imgChestTarget = platformTarget.find('img.chest')
    let chestId = chest.id
    let chestLevel = chest.level
    let determineLevel = require('determineLevel')
    let chestChangeImg = require('chestChangeImg')

    // 移除style 顯示，放入chestId, chestLevel
    platformTarget.prop('id', chestId).attr('data-level', chestLevel)
    platformTarget.find('.startButton').attr('data-status', chest.status)

    determineLevel(platformTarget, chestLevel)
    console.log(chest['colorPlatform'])
    if (chestStatus === 'LOCKED') {
      console.log(`chest${chestLevel}`)
      chestChangeImg(imgChestTarget, `chest${chestLevel}`)
    } else if (chestStatus === 'UNLOCKING') {
      imgChestTarget.addClass('unlockingGray')

      $('.container .space .startButton').hide()
      platformTarget.find('.upgradeButton').hide()
      chestChangeImg(imgChestTarget, `chest${chestLevel}`)

      require(['ajaxUtil', 'chestUnlockCountDown'], function (ajaxUtil, chestUnlockCountDown) {
        ajaxUtil('GET', `http://localhost:8080/chest/coolDownTime/${chestId}`)
          .then(function (seconds) {
            chestUnlockCountDown.start(seconds, chestId, platformTarget)
          })
      })
    } else if (chestStatus === 'READY') {
      platformTarget.find('.startButton').hide()
      platformTarget.find('.upgradeButton').hide()
      platformTarget.find('.readyButton').show()

      chestChangeImg(imgChestTarget, `readyChest${chestLevel}`)
    }
  }
})
