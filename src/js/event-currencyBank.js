$(function() {
  ajaxGet(
    "https://test.ehanlin.com.tw/currencyBank/transaction/retrieve",
    null,
    function(jsonData) {
      var transactions = jsonData.content;
      var singleTransaction, transactionField;
      var currencyQuantity;
      var tbodyHtml, tds;
      var longDateFormat = "dd/MM/yyyy HH:mm:ss";

      for (var i = 0; i < transactions.length; i++) {
        singleTransaction = transactions[i];
        currencyQuantity = singleTransaction["currencyQuantity"];

        // 動作
        if (singleTransaction.action == "REDUCE") {
          tds = "<td>" + "消耗" + "</td>";
        } else if (singleTransaction.action == "ADD") {
          tds = "<td>" + "增加" + "</td>";
        } else if (singleTransaction.action == "ADD_BY_CHEST") {
          tds = "<td>" + "增加" + "</td>";
        } else {
          tds = "<td>" + singleTransaction["action"] + "</td>";
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
        if (singleTransaction.source.match("Chest")) {
          tds += "<td>" + "寶箱" + "</td>";
        } else {
          tds += "<td>" + singleTransaction["source"] + "</td>";
        }

        // 時間
        tds +=
          "<td>" +
          singleTransaction["updateTime"].format(longDateFormat) +
          "</td>";

        tbodyHtml += "<tr>" + tds + "</tr>";
      }
      $(".responseTable tbody").append(tbodyHtml);
    },
    function() {}
  );
});
