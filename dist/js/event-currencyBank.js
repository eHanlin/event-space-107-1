$(function(){ajaxGet("https://test.ehanlin.com.tw/currencyBank/transaction/retrieve",null,function(jsonData){for(var singleTransaction,currencyQuantity,tbodyHtml,tds,transactions=jsonData.content,i=0;i<transactions.length;i++)currencyQuantity=(singleTransaction=transactions[i]).currencyQuantity,tds="REDUCE"==singleTransaction.action?"<td>消耗</td>":"<td>"+singleTransaction.action+"</td>",tds+="<td>"+(currencyQuantity.coins?currencyQuantity.coins:0)+"</td>",tds+="<td>"+(currencyQuantity.gems?currencyQuantity.gems:0)+"</td>",tds+="<td>"+singleTransaction.detail+"</td>",singleTransaction.source.match("Chest")?tds+="<td>寶箱</td>":tds+="<td>"+singleTransaction.source+"</td>",tbodyHtml+="<tr>"+(tds+="<td>"+singleTransaction.updateTime+"</td>")+"</tr>";$(".responstable tbody").append(tbodyHtml)},function(){})});