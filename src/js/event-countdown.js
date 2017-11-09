var updateStatus = function(chestId) {
  ajax(
    "GET",
    "http://127.0.0.1:8080/chest/updateStatus/" + chestId,
    { status: "UNLOCKING" },
    function(jsonData) {
      console.log("成功抓取updateStatus資料！");
      console.log(jsonData);
      coolDownTime(chestId);
    }
  );

  // $.ajax({
  //   url: `http://127.0.0.1:8080/chest/updateStatus/${chestId}`,
  //   type: "GET",
  //   contentType: "application/json",
  //   dataType: "json",
  //   data: {
  //     status: "UNLOCKING"
  //   },
  //   cache: false,
  //   crossDomain: true,
  //   success: function(jsonData) {
  //     console.log("成功抓取updateStatus資料！");
  //     console.log(jsonData);
  //     coolDownTime(chestId);
  //   }
  // });
};

var coolDownTime = function(chestId) {
  $.ajax({
    url: `http://127.0.0.1:8080/chest/coolDownTime/${chestId}`,
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    cache: false,
    crossDomain: true,
    success: function(jsonData) {
      console.log("成功抓取coolDownTime資料！");
      console.log(jsonData.content);
      countDown(jsonData);
    }
  });
};

var countDown = function(jsonData) {
  console.log(jsonData.content);
  $(".countdown").countDown({
    timeInSecond: jsonData.content,
    displayTpl: "{hour}小時{minute}分{second}秒",
    limit: "hour",
    callback: function() {
      alert("寶箱可以開啟了！");
    }
  });
};
