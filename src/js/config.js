define(function () {
  require.config({
    shim: {
      jqueryConfirm: {
        deps: ["jquery"],
        exports: "jqueryConfirm"
      },

      jqueryCondown: {
        deps: ["jquery"],
        exports: "jqueryCondown"
      }
    },

    paths: {
      jquery: ["package/jquery-3.2.1.min"],
      jqueryConfirm: ["package/jquery-confirm.min"],
      jqueryCondown: ["package/jquery.countdown.min"],
      countUp: ["package/countUp.min"],
      inspect: ["module/event-user-chest"],
      answer: ["module/answer"],
      questionsContents: ["module/questions-contents"],
      round: ["module/round"]
    }
  });
});