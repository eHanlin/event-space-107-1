$(function() {
  ajaxDeferred(
    "GET",
    "https://www.ehanlin.com.tw/currencyBank/transaction/retrieve"
  )
    .then(function(jsonData) {
      let transactions = jsonData.content;
      let singleTransaction;
      let tbodyHtml = "",
        tds;

      for (var i = 0; i < transactions.length; i++) {
        singleTransaction = transactions[i];
        let action = singleTransaction["action"];
        let transactionTime = singleTransaction["updateTime"];
        let currencyQuantity = singleTransaction["currencyQuantity"];

        // 動作
        if (action.indexOf("ADD") >= 0) {
          tds = "<td>" + "增加" + "</td>";
        } else {
          tds = "<td>" + "消耗" + "</td>";
        }

        // e幣
        tds +=
          "<td>" +
          (currencyQuantity["coins"] ? currencyQuantity["coins"] : 0) +
          "</td>";

        // 寶石
        tds +=
          "<td>" +
          (currencyQuantity["gems"] ? currencyQuantity["gems"] : 0) +
          "</td>";

        // 來源
        tds += "<td>" + singleTransaction["detail"] + "</td>";

        // 事件
        if (singleTransaction.source.match("chest")) {
          tds += "<td>" + "寶箱" + "</td>";
        } else {
          tds += "<td>" + singleTransaction["source"] + "</td>";
        }

        moment.locale();

        // 時間
        tds += "<td>" + moment(transactionTime).format("lll") + "</td>";

        tbodyHtml += "<tr>" + tds + "</tr>";
      }
      $(".responseTable tbody").append(tbodyHtml);
    })
    .then(function() {
      $("table.responseTable").sortpaginate();
    });
});
