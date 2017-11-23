(function($) {
  $.fn.extend({
    countDown: function(options) {
      var defaults = {
        timeInSecond: 60,
        displayTpl: "{hour}小时{minute}分{second}秒",
        limit: "hour",
        callback: function() {},
        loop: false
      };
      options = $.extend({}, defaults, options);
      this.each(function() {
        var This = $(this);
        function countDown(time, tpl) {
          var timer = setInterval(function() {
            if (time >= 1) {
              time -= 1;
              if (options.limit == "day") {
                var day = Math.floor(time / 3600 / 24);
                var hour = Math.floor((time / 3600) % 24);
                var minute = Math.floor((time / 60) % 60);
                var second = Math.floor(time % 60);
                This.html(
                  tpl
                    .replace("{day}", day)
                    .replace("{hour}", hour)
                    .replace("{minute}", minute)
                    .replace("{second}", second)
                );
              } else if (options.limit == "hour") {
                var hour = Math.floor(time / 3600);
                var minute = Math.floor((time / 60) % 60);
                var second = Math.floor(time % 60);
                This.html(
                  tpl
                    .replace("{day}", 0)
                    .replace("{hour}", hour)
                    .replace("{minute}", minute)
                    .replace("{second}", second)
                );
              } else if (options.limit == "minute") {
                var minute = Math.floor(time / 60);
                var second = Math.floor(time % 60);
                This.html(
                  tpl
                    .replace("{day}", 0)
                    .replace("{hour}", 0)
                    .replace("{minute}", minute)
                    .replace("{second}", second)
                );
              } else if (options.limit == "second") {
                var second = Math.floor(time);
                This.html(
                  tpl
                    .replace("{day}", 0)
                    .replace("{hour}", 0)
                    .replace("{minute}", 0)
                    .replace("{second}", second)
                );
              }
            } else {
              This.html(
                tpl
                  .replace("{day}", 0)
                  .replace("{hour}", 0)
                  .replace("{minute}", 0)
                  .replace("{second}", 0)
              );
              if (!options.loop) {
                clearInterval(timer);
                options.callback();
                return;
              } else {
                options.callback();
                time = options.timeInSecond + 1;
              }
            }
          }, 1000);
        }
        countDown(options.timeInSecond, options.displayTpl);
      });
    }
  });
})(jQuery);
