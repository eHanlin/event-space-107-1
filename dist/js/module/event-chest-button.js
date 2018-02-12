define(['require', 'jquery'], function (require, $) {
  return {
    // 啟動按鈕
    incept: function () {
      $('.container .space .startButton').on('click', function (event) {
        let currentTarget = event.currentTarget
        event.preventDefault()
        if (!$(currentTarget).attr('data-lockedAt') || +new Date() - $(currentTarget).attr('data-lockedAt') > 1000) {
          let findParents = $(currentTarget).parents('.platform')
          let chestId = findParents.prop('id')
          let chestUnlockCountDown = require('chestUnlockCountDown')
          chestUnlockCountDown.unlock(chestId)
        }
        // +new Date() 等於 new Date().getTime()
        $(this).attr('data-lockedAt', +new Date())
      })
    },

    // 升級按鈕
    upgrade: function () {
      $('.container .space .upgradeButton').on('click', function (event) {
        let currentTarget = event.currentTarget
        event.preventDefault()
        if (!$(currentTarget).attr('data-lockedAt') || +new Date() - $(currentTarget).attr('data-lockedAt') > 1000) {
          let findParents = $(currentTarget).parents('.platform')
          let chestId = findParents.prop('id')
          let chestLevel = +findParents.attr('data-level')
          let chestUpgrade = require('chestUpgrade')

          // 預備提升寶箱的等級
          chestUpgrade(chestId, chestLevel + 1)
        }

        // +new Date() 等於 new Date().getTime()
        $(currentTarget).attr('data-lockedAt', new Date().getTime())
      })
    },

    // 開啟
    open: function () {
      $('.container .space .readyButton').on('click', function (event) {
        let currentTarget = event.currentTarget
        event.preventDefault()
        if (!$(currentTarget).attr('data-lockedAt') || +new Date() - $(currentTarget).attr('data-lockedAt') > 300) {
          let chestId = $(currentTarget)
            .parents('.platform')
            .prop('id')

          require(['chestOpen'], function (chestOpen) {
            chestOpen(chestId, $(currentTarget))
          })
        }
        // +new Date() 等於 new Date().getTime()
        $(currentTarget).attr('data-lockedAt', +new Date())
      })
    }
  }
})
