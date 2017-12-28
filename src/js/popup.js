$(function () {
  if ( !Cookies.get("showSpaceTreasure") ) {
    let endOfDay, todayExpiredMilliseconds;
    $(".space-treasure-popup").show();

    moment.locale();
    endOfDay = moment().startOf("day").endOf("day");
    todayExpiredMilliseconds = endOfDay.diff(moment());
    console.log(todayExpiredMilliseconds);

    Cookies.set("showSpaceTreasure", "true", {
      expires: new Date(new Date().getTime() + todayExpiredMilliseconds),
      path: ""
    });

    setTimeout(function () {
      $(".space-treasure").addClass("space-treasure-show");
      $(".space-treasure .space-treasure-understand").on("click", function () {
        $(".space-treasure-popup").remove();
      });
    }, 500);
  }
});