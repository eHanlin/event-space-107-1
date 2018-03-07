$(function () {
  // 判斷寶箱狀態
  let determineStatus = function (chest, thisPlatformTarget, chestSatuts) {
    let imgChestTarget = thisPlatformTarget.find('img.chest')
    let chestId = chest.id
    let chestLevel = chest.level

    // 移除style 顯示，放入chestId, chestLevel
    thisPlatformTarget.prop('id', chestId).attr('data-level', chestLevel)
    thisPlatformTarget.find('.startButton').attr('data-status', chest.status)

    if (chestLevel === 6) {
      thisPlatformTarget.find('.chest').addClass('lv6-chest')
    }

    if (chestLevel === 5) {
      thisPlatformTarget.find('.chest').addClass('lv5-chest')
    }

    if (chestSatuts === 'LOCKED') {
      determineLevel(imgChestTarget, chestLevel)
    } else if (chestSatuts === 'UNLOCKING') {
      imgChestTarget.addClass('unlockingGray')

      $('.container .space .startButton').hide()
      thisPlatformTarget.find('.upgradeButton').hide()

      determineLevel(imgChestTarget, chestLevel)

      ajaxGet('/chest/coolDownTime/' + chestId, null, function (jsonData) {
        let seconds = jsonData.content
        countDown(seconds, chestId, thisPlatformTarget)
      })
    } else if (chestSatuts === 'READY') {
      let chestImage = 'readyChest' + chestLevel
      thisPlatformTarget.find('.startButton').hide()
      thisPlatformTarget.find('.upgradeButton').hide()
      thisPlatformTarget.find('.readyButton').show()

      changeChestImage(imgChestTarget, chestImage)
    }
  }

  ajaxGet(
    '/chest/retrieve',
    null,
    function (jsonData) {
      let indexPlatformTarget
      let chests = jsonData.content

      for (let i = 0; i < chests.length; i++) {
        let chest = chests[i]
        let colorPlatform = chest['colorPlatform']
        indexPlatformTarget = $(
          '.container ' + '#' + colorPlatform.toLowerCase()
        ).find('.platform')
        // indexPlatformTarget = $(".container .space .platform:eq(" + i + ")");
        indexPlatformTarget.show()

        determineStatus(chest, indexPlatformTarget, chest.status)
      }

      // 啟動按鈕
      startBtnFunc()

      // 升級按鈕
      upgradeBtnFunc()

      // 開啟按鈕
      readyBtnFunc()
    },
    function () {}
  )

  // 雲端銀行按鈕
  $('.space .bank').on('click', function () {
    window.open('/event/space/currencyBank.html', '雲端銀行')
    return false
  })

  // 領取贈品按鈕
  $('.container .returnAwardBtn').on('click', function () {
    window.open('/Events/winner_info.html?id=space', '回傳資料領取贈品')
    return false
  })
})

// 啟動按鈕
let startBtnFunc = function () {
  $('.container .space .startButton').on('click', function (event) {
    let findParents, chestId
    event.preventDefault()

    if (!$(this).attr('data-lockedAt') ||
      +new Date() - $(this).attr('data-lockedAt') > 1000
    ) {
      findParents = $(this).parents('.platform')
      chestId = findParents.prop('id')

      updateStatusIsUnlocking(chestId)
    }
    // +new Date() 等於 new Date().getTime()
    $(this).attr('data-lockedAt', +new Date())
  })
}

// 升級按鈕
let upgradeBtnFunc = function () {
  $('.container .space .upgradeButton').on('click', function (event) {
    let findParents, chestId, chestLevel
    event.preventDefault()

    if (!$(this).attr('data-lockedAt') ||
      +new Date() - $(this).attr('data-lockedAt') > 1000
    ) {
      findParents = $(this).parents('.platform')
      chestId = findParents.prop('id')
      chestLevel = +findParents.attr('data-level')

      // 預備提升寶箱的等級
      getConditionChestLevel(chestId, chestLevel + 1)
    }

    // +new Date() 等於 new Date().getTime()
    $(this).attr('data-lockedAt', new Date().getTime())
  })
}

// 開啟按鈕
let readyBtnFunc = function () {
  $('.container .space .readyButton').on('click', function (event) {
    let chestId
    event.preventDefault()
    if (!$(this).attr('data-lockedAt') ||
      +new Date() - $(this).attr('data-lockedAt') > 300
    ) {
      chestId = $(this)
        .parents('.platform')
        .prop('id')

      eventChest.updateStatusIsOpen(chestId, $(this))
    }
    // +new Date() 等於 new Date().getTime()
    $(this).attr('data-lockedAt', +new Date())
  })
}

let determineLevel = function (chestTarget, chestLevel) {
  let chestImage = 'chest' + chestLevel
  changeChestImage(chestTarget, chestImage)
}

let changeChestImage = function (chestTarget, chestImage) {
  chestTarget.prop(
    'src',
    'https://d220xxmclrx033.cloudfront.net/event-space/img/chest/' +
    chestImage +
    '.png'
  )
}
