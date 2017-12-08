$(function () {
  ajaxGet(
    "https://test.ehanlin.com.tw/currencyBank/transaction/retrieve",
    null,
    function (jsonData) {
      let transactions = jsonData.content;
      let singleTransaction;
      let tbodyHtml = "", tds;

      for ( var i = 0; i < transactions.length; i++ ) {
        singleTransaction = transactions[i];
        let action = singleTransaction["action"];
        let transactionTime =
          moment.utc(singleTransaction["updateTime"]).format("YYYY-MM-DD HH:mm");

        let currencyQuantity = singleTransaction["currencyQuantity"];

        // 動作
        if ( action.indexOf("ADD") >= 0 ) {
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
        if ( singleTransaction.source.match("Chest") ) {
          tds += "<td>" + "寶箱" + "</td>";
        } else {
          tds += "<td>" + singleTransaction["source"] + "</td>";
        }

        // 時間
        tds += "<td>" + transactionTime + "</td>";

        tbodyHtml += "<tr>" + tds + "</tr>";
      }
      $(".responseTable tbody").append(tbodyHtml);
    },
    function () {
    }
  );
});
