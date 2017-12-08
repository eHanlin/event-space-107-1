$(function() {
  ajaxGet(
    "https://test.ehanlin.com.tw/currencyBank/transaction/retrieve",
    null,
    function(jsonData) {
      var transactions = jsonData.content;
      var singleTransaction, transactionField;
      var currencyQuantity;
      var tbodyHtml, tds;

      for (var i = 0; i < transactions.length; i++) {
        singleTransaction = transactions[i];
        currencyQuantity = singleTransaction["currencyQuantity"];

        if (singleTransaction.action == "REDUCE") {
          tds = "<td>" + "消耗" + "</td>";
        } else if (singleTransaction.action == "ADD") {
          tds = "<td>" + "得到" + "</td>";
        } else {
          tds = "<td>" + singleTransaction["action"] + "</td>";
        }

        tds +=
          "<td>" +
          (currencyQuantity["coins"] ? currencyQuantity["coins"] : 0) +
          "</td>";
        tds +=
          "<td>" +
          (currencyQuantity["gems"] ? currencyQuantity["gems"] : 0) +
          "</td>";

        tds += "<td>" + singleTransaction["detail"] + "</td>";

        if (singleTransaction.source.match("Chest")) {
          tds += "<td>" + "寶箱" + "</td>";
        } else {
          tds += "<td>" + singleTransaction["source"] + "</td>";
        }

        tds += "<td>" + singleTransaction["updateTime"] + "</td>";
        tbodyHtml += "<tr>" + tds + "</tr>";
      }
      $(".responseTable tbody").append(tbodyHtml);
    },
    function() {}
  );
});
