let updateStatusIsUnlocking=function(chestId,startBtnTarget){let platformTarget=$("#"+chestId),startButtonTarget=platformTarget.find(".startButton"),upgradeButtonTarget=platformTarget.find(".upgradeButton");$.confirm(confirmWindow("確定啟動寶箱嗎！？","",function(){ajaxDeferred("PUT","https://test.ehanlin.com.tw/chest/updateStatus/"+chestId,{status:"UNLOCKING"}).then(function(){return $(".container .space .startButton[data-status=LOCKED]").fadeOut("slow"),upgradeButtonTarget.fadeOut("slow"),startButtonTarget.attr("data-status","UNLOCKING"),startBtnTarget.attr("data-onlocked","false"),ajaxDeferred("GET","https://test.ehanlin.com.tw/chest/coolDownTime/"+chestId)}).then(function(jsonData){countDown(jsonData.content,chestId,platformTarget)})}))},countDown=function(seconds,chestId,platformTarget){let imgChestTarget=platformTarget.find(".chest"),countdownTarget=platformTarget.find(".countdown"),openNowBtnTarget=platformTarget.find(".openNowButton");imgChestTarget.addClass("unlockingGray"),openNowBtnTarget.removeAttr("style");let countDownFunc=function(seconds){countdownTarget.countDown({timeInSecond:seconds,displayTpl:"<i style='font-size:28px;color:yellow' class='fa'>&#xf254;</i>{hour}時{minute}分{second}秒",limit:"hour",callback:function(){openNowBtnTarget.fadeOut(),eventChest.updateStatusIsReady(chestId),imgChestTarget.removeClass("unlockingGray")}})};platformTarget.find(".openNowButton[data-onlocked=false]").off("click"),console.log(platformTarget.find(".openNowButton[data-onlocked=false]")),platformTarget.find(".openNowButton[data-onlocked=false]").on("click",function(){let chestId,seconds;$(this).attr("data-onlocked","true"),chestId=$(this).parents(".platform").prop("id"),ajaxDeferred("GET","https://test.ehanlin.com.tw/chest/coolDownTime/"+chestId).then(function(jsonData){return seconds=jsonData.content,ajaxDeferred("GET","https://test.ehanlin.com.tw/chest/condition/one/openImmediately")}).then(function(jsonData){let consume=jsonData.content.content,deductGems=Math.ceil(seconds/3600)*consume.everyHourDeductGems;$("#"+chestId).find(".openNowButton"),$("#"+chestId).find(".chest"),$.confirm(confirmWindow("立即開啟寶箱需要花費 "+deductGems+" 個寶石","確定立即開啟寶箱嗎？",function(){ajax("PUT","https://test.ehanlin.com.tw/chest/open/immediately/"+chestId,{deductGems:deductGems},function(jsonData){let originalGems=$(".space .gems #own-gems").text(),finalGems=originalGems- -1*jsonData.content.gems;console.log("成功抓取 openImmediately !!!"),finalGems<0?$.alert(alertWindow("你的寶石不足"+-1*finalGems+"個","","")):0!==finalGems?(countTrasition("own-gems",originalGems,finalGems),countDownFunc(0)):$.alert(alertWindow("你的寶石不足","",""))})}))})}),countDownFunc(seconds)};