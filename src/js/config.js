define(function () {
  require.config({
    shim: {
      jqueryConfirm: ['jquery'],
      jqueryCountDown: ['jquery']
    },

    paths: {
      jquery: ['package/jquery-3.2.1.min'],
      jqueryConfirm: ['package/jquery-confirm.min'],
      jqueryCountDown: ['package/jquery-time-countdown.min'],
      ajaxUtil: ['module/ajax-util'],
      popup: ['module/popup'],
      award: ['module/event-award'],
      determineLevel: ['module/event-determine-level'],
      determineStatus: ['module/event-determine-status'],
      gainAward: ['module/event-gain-award'],
      retrieveTotalAssets: ['module/event-retrieve-total-assets'],
      countTransition: ['module/event-count-transition'],
      chestButton: ['module/event-chest-button'],
      chestChangeImg: ['module/event-chest-change-img'],
      chestUnlockCountDown: ['module/event-chest-unlock-countdown'],
      chestOpen: ['module/event-chest-open'],
      chestReady: ['module/event-chest-ready'],
      chestUpgrade: ['module/event-chest-upgrade']
    }
  })
})
