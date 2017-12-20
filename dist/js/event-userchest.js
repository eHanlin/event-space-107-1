"use strict";$(function(){var determineStatus=function(chest,thisPlatformTarget,chestSatuts){var imgChestTarget=thisPlatformTarget.find("img.chest"),chestId=chest.id,chestLevel=chest.level;if(thisPlatformTarget.prop("id",chestId).attr("data-level",chestLevel),thisPlatformTarget.find(".startButton").attr("data-status",chest.status),6===chestLevel&&(thisPlatformTarget.find(".upgradeButton").hide(),thisPlatformTarget.find(".chest").addClass("lv6-chest")),5===chestLevel&&thisPlatformTarget.find(".chest").addClass("lv5-chest"),"LOCKED"===chestSatuts)determineLevel(imgChestTarget,chestLevel);else if("UNLOCKING"===chestSatuts)imgChestTarget.addClass("unlockingGray"),$(".container .space .startButton").hide(),thisPlatformTarget.find(".upgradeButton").hide(),determineLevel(imgChestTarget,chestLevel),ajaxGet("/chest/coolDownTime/"+chestId,null,function(jsonData){var seconds=jsonData.content;countDown(seconds,chestId,thisPlatformTarget)});else if("READY"===chestSatuts){var chestImage="readyChest"+chestLevel;thisPlatformTarget.find(".startButton").hide(),thisPlatformTarget.find(".upgradeButton").hide(),thisPlatformTarget.find(".readyButton").show(),changeChestImage(imgChestTarget,chestImage)}};ajaxGet("/chest/retrieve",null,function(jsonData){for(var indexPlatformTarget=void 0,chests=jsonData.content,i=0;i<chests.length;i++){var chest=chests[i],colorPlatform=chest.colorPlatform;(indexPlatformTarget=$(".container #"+colorPlatform.toLowerCase()).find(".platform")).show(),determineStatus(chest,indexPlatformTarget,chest.status)}startBtnFunc(),upgradeBtnFunc(),readyBtnFunc()},function(){}),$(".space .bank").on("click",function(){return window.open("/event/space/currencyBank.html","雲端銀行"),!1}),$(".container .returnAwardBtn").on("click",function(){return window.open("/Events/winner_info.html?id=space","回傳資料領取贈品"),!1})});var startBtnFunc=function(){$(".container .space .startButton").on("click",function(event){var chestId=void 0;event.preventDefault(),(!$(this).attr("data-lockedAt")||+new Date-$(this).attr("data-lockedAt")>1e3)&&(chestId=$(this).parents(".platform").prop("id"),updateStatusIsUnlocking(chestId)),$(this).attr("data-lockedAt",+new Date)})},upgradeBtnFunc=function(){$(".container .space .upgradeButton").on("click",function(event){var findParents=void 0,chestId=void 0,chestLevel=void 0;event.preventDefault(),(!$(this).attr("data-lockedAt")||+new Date-$(this).attr("data-lockedAt")>1e3)&&(chestId=(findParents=$(this).parents(".platform")).prop("id"),chestLevel=+findParents.attr("data-level"),getConditionChestLevel(chestId,chestLevel+1)),$(this).attr("data-lockedAt",(new Date).getTime())})},readyBtnFunc=function(){$(".container .space .readyButton").on("click",function(event){var chestId=void 0;event.preventDefault(),(!$(this).attr("data-lockedAt")||+new Date-$(this).attr("data-lockedAt")>300)&&(chestId=$(this).parents(".platform").prop("id"),eventChest.updateStatusIsOpen(chestId,$(this))),$(this).attr("data-lockedAt",+new Date)})},determineLevel=function(chestTarget,chestLevel){changeChestImage(chestTarget,"chest"+chestLevel)},changeChestImage=function(chestTarget,chestImage){chestTarget.prop("src","https://d220xxmclrx033.cloudfront.net/event-space/img/chest/"+chestImage+".png")};