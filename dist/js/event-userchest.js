$(function(){let determineStatus=function(chest,thisPlatformTarget,chestSatuts){let imgChestTarget=thisPlatformTarget.find("img.chest"),chestId=chest.id,chestLevel=chest.level;if(thisPlatformTarget.prop("id",chestId).attr("data-level",chestLevel),thisPlatformTarget.find(".startButton").attr("data-status",chest.status),6===chestLevel&&(thisPlatformTarget.find(".upgradeButton").hide(),thisPlatformTarget.find(".chest").addClass("lv6-chest")),5===chestLevel&&thisPlatformTarget.find(".chest").addClass("lv5-chest"),"LOCKED"===chestSatuts)determineLevel(imgChestTarget,chestLevel);else if("UNLOCKING"===chestSatuts)imgChestTarget.addClass("unlockingGray"),$(".container .space .startButton").hide(),thisPlatformTarget.find(".upgradeButton").hide(),determineLevel(imgChestTarget,chestLevel),ajaxGet("https://test.ehanlin.com.tw/chest/coolDownTime/"+chestId,null,function(jsonData){let seconds=jsonData.content;countDown(seconds,chestId,thisPlatformTarget)});else if("READY"===chestSatuts){let chestImage="readyChest"+chestLevel;thisPlatformTarget.find(".startButton").hide(),thisPlatformTarget.find(".upgradeButton").hide(),thisPlatformTarget.find(".readyButton").show(),changeChestImage(imgChestTarget,chestImage)}};ajaxGet("https://test.ehanlin.com.tw/chest/retrieve",null,function(jsonData){let indexPlatformTarget,chests=jsonData.content;for(let i=0;i<chests.length;i++){let chest=chests[i],colorPlatform=chest.colorPlatform;(indexPlatformTarget=$(".container #"+colorPlatform.toLowerCase()).find(".platform")).show(),determineStatus(chest,indexPlatformTarget,chest.status)}startBtnFunc(),upgradeBtnFunc(),readyBtnFunc()},function(){}),$(".space .bank").on("click",function(){return window.open("/event/space/currencyBank.html","雲端銀行"),!1}),$(".container .returnAwardBtn").on("click",function(){return window.open("/Events/winner_info.html?id=space","回傳資料領取贈品"),!1})});let startBtnFunc=function(){$(".container .space .startButton").on("click",function(event){let findParents,chestId;event.preventDefault(),(!$(this).data("lockedAt")||+new Date-$(this).data("lockedAt")>300)&&(chestId=(findParents=$(this).parents(".platform")).prop("id"),updateStatusIsUnlocking(chestId,$(this))),$(this).data("lockedAt",+new Date)})},upgradeBtnFunc=function(){$(".container .space .upgradeButton").on("click",function(event){let findParents,chestId,chestLevel;event.preventDefault(),(!$(this).data("lockedAt")||+new Date-$(this).data("lockedAt")>300)&&(chestId=(findParents=$(this).parents(".platform")).prop("id"),chestLevel=findParents.data("level"),getConditionChestLevel(chestId,chestLevel+1)),$(this).data("lockedAt",+new Date)})},readyBtnFunc=function(){$(".container .space .readyButton").on("click",function(event){let chestId;event.preventDefault(),(!$(this).data("lockedAt")||+new Date-$(this).data("lockedAt")>300)&&(chestId=$(this).parents(".platform").prop("id"),eventChest.updateStatusIsOpen(chestId,$(this))),$(this).data("lockedAt",+new Date)})},determineLevel=function(chestTarget,chestLevel){changeChestImage(chestTarget,"chest"+chestLevel)},changeChestImage=function(chestTarget,chestImage){chestTarget.prop("src","https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/chest/"+chestImage+".png")};