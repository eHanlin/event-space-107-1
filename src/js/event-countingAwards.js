$(function () {
  getAwards();
});

var getAwards = function () {
  ajaxGet(
    "/chest/retrieve/award",
    null,
    function (jsonData) {
      let awards = jsonData.content;

      let index = 0;
      for ( let award in awards ) {
        let awardId = award.split("#")[0];
        let awardDesc = award.split("#")[1];
        let value = awards[award];
        let specificAward = $(".countingAwards li:eq(" + index + ")");
        let awardImage =
          "<img src='https://d220xxmclrx033.cloudfront.net" +
          "/event-space/img/award/" +
          awardId +
          ".png' />";

        specificAward.empty().append(awardImage);
        specificAward.append(
          "<span style='width:130px;'>" + awardDesc + "</span>"
        );
        specificAward.append("<h1><span>" + value + "</span></h1>");

        index++;
      }

      $(".countingAwardsArticle .fa.fa-mail-forward").on("click", function () {
        $(this).hide();
        $(".countingAwards .awardBox:eq(0)").css("display", "none");
        $(".countingAwards .awardBox:eq(1)").removeAttr("style");
        $(".countingAwardsArticle .fa.fa-mail-reply").show();
      });

      $(".countingAwardsArticle .fa.fa-mail-reply").on("click", function () {
        $(this).hide();
        $(".countingAwards .awardBox:eq(0)").removeAttr("style");
        $(".countingAwards .awardBox:eq(1)").hide();
        $(".countingAwardsArticle .fa.fa-mail-forward").show();
      });
    },
    function () {
    }
  );
};
