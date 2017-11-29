var index = 1;
$("#right-arrow").on("click", function() {
  index++;
  textMessage(index);
  $("#award img").attr("src", "./img/award/award" + index + ".png");
  if (index >= 15) {
    index = 0;
  }
});

$("#left-arrow").on("click", function() {
  index--;
  if (index === 0) {
    index = 15;
  }
  textMessage(index);
  $("#award img").attr("src", "./img/award/award" + index + ".png");
});

var textMessage = function(index) {
  switch (index) {
    case 1:
      $("#award .text").text("Apple Watch Series 3");
      break;
    case 2:
      $("#award .text").text("ASUS ZenPad 10");
      break;
    case 3:
      $("#award .text").text("星際大戰白兵隨身碟");
      break;
    case 4:
      $("#award .text").text("TSUM TSUM 藍牙喇叭");
      break;
    case 5:
      $("#award .text").text("星巴克城市玻璃水瓶");
      break;
    case 6:
      $("#award .text").text("星空冰霸杯");
      break;
    case 7:
      $("#award .text").text("小米行動電源");
      break;
    case 8:
      $("#award .text").text("華納威秀電影票");
      break;
    case 9:
      $("#award .text").text("回眸仿真狗狗抱枕");
      break;
    case 10:
      $("#award .text").text("麥當勞點點卡");
      break;
    case 11:
      $("#award .text").text("雲端學院$100禮卷");
      break;
    case 12:
      $("#award .text").text("7-11$100元禮卷");
      break;
    case 13:
      $("#award .text").text("Line貼圖點數$60");
      break;
    case 14:
      $("#award .text").text("夢幻星空筆記本");
      break;
    case 15:
      $("#award .text").text("夢幻星空中性筆");
      break;
  }
};
