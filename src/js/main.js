require(['config'], function () {
  require(['jquery', 'retrieveTotalAssets'], function ($, retrieveTotalAssets) {
    retrieveTotalAssets()
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

  require(['jquery', 'ajaxUtil', 'determineStatus'], function (
    $,
    ajaxUtil,
    determineStatus
  ) {
    ajaxUtil('GET', `http://localhost:8080/chest/retrieve`).then(function (
      jsonData
    ) {
      let indexPlatformTarget
      let chests = jsonData.content

      for (let i = 0; i < chests.length; i++) {
        let chest = chests[i]
        let colorPlatform = chest['colorPlatform']
        indexPlatformTarget = $(
          `.container #${colorPlatform.toLowerCase()}`
        ).find('.platform')
        // indexPlatformTarget = $(".container .space .platform:eq(" + i + ")");
        indexPlatformTarget.show()
        determineStatus(chest, indexPlatformTarget, chest.status)
      }

      require(['chestButton'], function (chestButton) {
        // 啟動按鈕
        chestButton.incept()

        // 升級按鈕
        chestButton.upgrade()

        // 開啟按鈕
        chestButton.open()
      })
    })
  })
})
