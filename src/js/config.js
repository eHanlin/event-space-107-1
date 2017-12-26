define(function () {
  require.config({
    shim: {
      jqueryConfirm: {
        deps: ['jquery'],
        exports: "jqueryConfirm"
      },

      jqueryCountDown: {
        deps: ["jquery"],
        exports: "jqueryCountDown"
      },
    },

    paths: {
      jquery: ["package/jquery-3.2.1.min.js"],
      jqueryConfirm: ["package/jquery-confirm.min.js"],
      jqueryCountDown: ["package/jquery.countdown.min.js"],
      ajaxUtil: ["module/ajax-util"],
      popup: ["module/popup"],
      award: ["module/event-award"],
      determineLevel: ["module/event-determine-level"],
      determineStatus: ["module/event-determine-status"],
      gainAward: ["module/event-gain-award"],
      totalAssets: ["module/event-total-assets"],
      countTransition: ["module/event-count-transition"],
      chestButton: ["module/event-chest-button"],
      chestChangeImg: ["module/event-chest-change-img"],
      chestUnlockCountDown: ["module/event-chest-unlock-countdown"],
      chestOpen: ["module/chestOpen"],
      chestReady: ["module/chestReady"],
      chestUpgrade: ["module/chestUpgrade"],
    }
  });
});
