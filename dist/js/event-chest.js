let eventChest={updateStatusIsOpen:function(chestId){ajax("PUT","/chest/open/"+chestId,{status:"OPEN"},function(jsonData){let data=jsonData.content,gainCoins=data.coins,gainGems=data.gems,totalCoins=data.totalCoins,totalGems=data.totalGems,gainAward=data.gainAward,gainAwardId=data.gainAwardId,platformTarget=$("#"+chestId),openChestGif="<div style='position: absolute; top: 0; left: 0; width: 245px; height:223px;background-image: url(https://d220xxmclrx033.cloudfront.net/event-space/img/chest/open/openChest"+platformTarget.attr("data-level")+".gif);background-size: contain;'></div>",awardText="",coinsText="",gemsText="",content="";platformTarget.find(".chest").fadeOut("slow"),platformTarget.find(".readyButton").fadeOut("slow"),gainCoins&&(coinsText="<tr><td style='height: 36px; transform: translateY(-50%)'><div id='svg-coins' class='icon-coins'></div>"+gainCoins+"</td>");gainGems&&(gemsText="<td style='height: 36px; transform: translateY(-50%)'><div id='svg-gems' class='icon-gems'></div>"+gainGems+"</td>");gainAward&&(awardText="<h2>"+gainAward+"</h2><img style='width: 200px; height: 200px;' src='https://d220xxmclrx033.cloudfront.net/event-space/img/award/"+gainAwardId+".png' ><br/>");content="<div style='height: 300px;'>"+openChestGif+"<div style='position: absolute; top: 0; right: 0; height: 80px; width: 210px;'><div style='height: 32px; font-size: 22px;'>恭喜你獲得</div><br/><table width='100%' style='table-layout:fixed; font-size: 25px;'>"+coinsText+gemsText+"</tr></table>"+awardText+"</div></div>",$.confirm(writeAcceptanceInfo(content,totalCoins,totalGems))})},updateStatusIsReady:function(chestId){let body;body={status:"READY"},ajax("PUT","/chest/updateStatus/"+chestId,body,function(){let platFromTarget=$("#"+chestId),chestTarget=platFromTarget.find(".chest"),chestImage="readyChest"+platFromTarget.attr("data-level"),startButtonTarget=platFromTarget.find(".startButton");platFromTarget.find(".readyButton").fadeIn("slow"),platFromTarget.find(".countdown").remove(),startButtonTarget.attr("data-status",body.status),$(".container .space .startButton[data-status=LOCKED]").fadeIn("slow"),changeChestImage(chestTarget,chestImage)})},getUpgrade:function(chestId,upLevel){let putData={level:upLevel};ajax("PUT","/chest/upgrade/"+chestId,putData,function(jsonData){let upgradeContent=jsonData.content,upgradeToTransaction=function(alertTitle,alertGif){ajaxDeferred("POST","/currencyBank/transaction/upgrade",{upgradeAuditId:upgradeContent.upgradeAuditId}).then(function(){return ajaxDeferred("GET","/currencyBank/totalAssets/retrieve/one")}).then(function(jsonData){$.alert(alertWindow(alertTitle,alertGif,function(){let content=jsonData.content,originalCoins=$(".space .coins #own-coins").text(),originalGems=$(".space .gems #own-gems").text();countTrasition("own-coins",originalCoins,content.coins),countTrasition("own-gems",originalGems,content.gems)}))})};if(jsonData.message.indexOf("failure")>=0){upgradeToTransaction("升級失敗","<img src='https://d220xxmclrx033.cloudfront.net/event-space/img/chest/upgradeStatus/upgradeFail"+(upLevel-1)+".gif'>")}else{let finalCoins=upgradeContent.finalCoins,finalGems=upgradeContent.finalGems;if(finalCoins||finalGems){let alertText="";finalCoins<0&&finalGems<0?alertText+="e 幣和寶石不足！ 再努力一點，還差"+-1*finalCoins+"元！ "+-1*finalGems+"個寶石！":finalCoins<0?alertText+="e 幣不足！ 再努力一點，還差"+-1*finalCoins+"元！":finalGems<0&&(alertText+="寶石不足！ 再努力一點，還差"+-1*finalGems+"個寶石！"),$.alert(alertWindow("",alertText))}else{let platformTarget=$("#"+chestId),dataLevel=putData.level;upgradeToTransaction("升級成功","<img src='https://d220xxmclrx033.cloudfront.net/event-space/img/chest/upgradeStatus/upgradeSuccess"+dataLevel+".gif'>"),5===dataLevel?platformTarget.find(".chest").addClass("lv5-chest"):6===dataLevel&&(platformTarget.find(".chest").addClass("lv6-chest"),platformTarget.find(".upgradeButton").hide()),platformTarget.attr("data-level",dataLevel),determineLevel(platformTarget.find(".chest"),dataLevel)}}})}};