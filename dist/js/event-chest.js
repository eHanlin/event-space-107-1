let eventChest={updateStatusIsOpen:function(chestId){$.confirm(confirmWindow("確定開啟寶箱嗎！？","",ajax.bind(this,"PUT","https://test.ehanlin.com.tw/chest/open/"+chestId,{status:"OPEN"},function(jsonData){console.log("成功抓取updateStatusIsOpen資料！(Open)");let data=jsonData.content,gainCoins=data.coins,gainGems=data.gems,totalCoins=data.totalCoins,totalGems=data.totalGems,gainAward=data.gainAward,gainAwardId=data.gainAwardId,platformTarget=$("#"+chestId),openChestGif="<div style='float: left; width: 240px; height:210px;background-image: url(https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/chest/open/openChest"+platformTarget.data("level")+".gif);background-size: contain;'></div>",awardText="",coinsText="",gemsText="";platformTarget.find(".chest").fadeOut("slow"),platformTarget.find(".readyButton").fadeOut("slow"),gainCoins&&(coinsText="<tr><td style='height: 36px; transform: translateY(-50%)'><div id='open-coins' class='award-coins'></div>"+gainCoins+" 金幣 </td></tr>");gainGems&&(gemsText="<tr><td style='height: 36px; transform: translateY(-50%)'><div id='open-gems' class='award-gems'></div>"+gainGems+" 寶石 </td></tr>");gainAward&&(awardText=gainAward+"<img style='width: 220px; height: 220px;' src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/award/"+gainAwardId+".png' ><br/>");$.alert(alertWindow("","<div style='width: 500px;'>"+openChestGif+"<div style='float: right; height: 300px; width: 220px;'><div style='height: 30px; font-size: 22px;'>恭喜你獲得</div><br/><table width='100%' style='table-layout:fixed; font-size: 25px;'>"+coinsText+gemsText+"</table>"+awardText+"</div></div>",function(){let originalCoins=$(".space .coins #own-coins").text(),originalGems=$(".space .gems #own-gems").text();countTrasition("own-coins",originalCoins,totalCoins),countTrasition("own-gems",originalGems,totalGems),getAwards()}))})))},updateStatusIsReady:function(chestId){let body;body={status:"READY"},ajax("PUT","https://test.ehanlin.com.tw/chest/updateStatus/"+chestId,body,function(){console.log("成功抓取 updateStatusIsReady 資料！");let platFromTarget=$("#"+chestId),chestTarget=platFromTarget.find(".chest"),chestImage="readyChest"+platFromTarget.data("level"),startButtonTarget=platFromTarget.find(".startButton");platFromTarget.find(".readyButton").fadeIn("slow"),platFromTarget.find(".countdown").fadeOut("slow"),startButtonTarget.attr("data-status",body.status),$(".container .space .startButton[data-status=LOCKED]").fadeIn("slow"),changeChestImage(chestTarget,chestImage)})},getUpgrade:function(chestId,upLevel){let putData={level:upLevel};ajax("PUT","https://test.ehanlin.com.tw/chest/upgrade/"+chestId,putData,function(jsonData){console.log("成功抓取升級的寶箱資料！"),console.log(jsonData);let upgradeContent=jsonData.content,upgradeToTransaction=function(alertTitle,alertGif){ajaxDeferred("POST","https://test.ehanlin.com.tw/currencyBank/transaction/upgrade",{upgradeAuditId:upgradeContent.upgradeAuditId}).then(function(jsonData){return ajaxDeferred("GET","https://test.ehanlin.com.tw/currencyBank/totalAssets/retrieve/one")}).then(function(jsonData){console.log("current totalAssets: "+jsonData.content),$.alert(alertWindow(alertTitle,alertGif,function(){console.log("current totalAssets: "+jsonData.content),$(".space .coins span").empty().append(jsonData.content.coins),$(".space .gems span").empty().append(jsonData.content.gems)}))})};if(jsonData.message.indexOf("failure")>=0){console.log("升級失敗");upgradeToTransaction("升級失敗","<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/chest/upgradeStatus/upgradeFail"+(upLevel-1)+".gif'>")}else{let finalCoins=upgradeContent.finalCoins,finalGems=upgradeContent.finalGems;if(finalCoins||finalGems){let alertText="";finalCoins<0&&finalGems<0?alertText+="e 幣和寶石不足！ 再努力一點，還差"+-1*finalCoins+"元！ "+-1*finalGems+"個寶石！":finalCoins<0?alertText+="e 幣不足！ 再努力一點，還差"+-1*finalCoins+"元！":finalGems<0&&(alertText+="寶石不足！ 再努力一點，還差"+-1*finalGems+"個寶石！"),$.alert(alertWindow("",alertText))}else{let platformTarget=$("#"+chestId),dataLevel=putData.level;upgradeToTransaction("升級成功","<img src='https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/chest/upgradeStatus/upgradeSuccess"+dataLevel+".gif'>"),6===dataLevel&&platformTarget.find(".upgradeButton").hide(),platformTarget.data("level",dataLevel),determineLevel(platformTarget.find(".chest"),dataLevel)}}})}};