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

        tds = "<td>" + singleTransaction["action"] + "</td>";
        tds += "<td>" + currencyQuantity["coins"] + "</td>";
        tds += "<td>" + currencyQuantity["gems"] + "</td>";
        tds += "<td>" + singleTransaction["detail"] + "</td>";
        tds += "<td>" + singleTransaction["source"] + "</td>";
        tds += "<td>" + singleTransaction["updateTime"] + "</td>";
        tbodyHtml += "<tr>" + tds + "</tr>";
      }
      $(".responstable tbody").append(tbodyHtml);
    }
  );
});
