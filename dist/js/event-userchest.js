$(function(){ajaxGet("https://test.ehanlin.com.tw/chest/retrieve",null,function(jsonData){console.log("成功抓取學生寶箱資料！ (by user)");var indexPlatformTarget,chest,chests=jsonData.content;$(".container .space .platform").hide();for(let i=0;i<chests.length;i++)chest=chests[i],(indexPlatformTarget=$(".container .space .platform:eq("+i+")")).show(),determineStatus(chest,indexPlatformTarget,chest.status);$(".startButton").one("click",function(){var chestId=$(this).parents(".platform").prop("id");updateStatusIsUnlocking(chestId)}),$(".upgradeButton").on("click",function(){let findParents=$(this).parents(".platform"),chestId=findParents.prop("id"),chestLevel=findParents.data("level");getCondition(chestId,chestLevel+1)}),$(".readyButton").on("click",function(){var chestId=$(this).parents(".platform").prop("id");eventChest.updateStatusIsOpen(chestId)})},function(){})});var determineStatus=function(chest,thisPlatformTarget,chestSatuts){var chestTarget=thisPlatformTarget.find("img.chest"),chestId=chest.id,chestLevel=chest.level;if(thisPlatformTarget.removeAttr("style").prop("id",chestId).attr("data-level",chestLevel),thisPlatformTarget.find(".startButton").attr("data-status",chest.status),6===chestLevel&&thisPlatformTarget.find(".upgradeButton").hide(),"LOCKED"===chestSatuts)console.log("===============> status is locked <================="),determineLevel(chestTarget,chestLevel);else if("UNLOCKING"===chestSatuts)console.log("=============> status is unlocking <================"),$(".startButton").hide(),thisPlatformTarget.find(".upgradeButton").hide(),determineLevel(chestTarget,chestLevel),coolDownTime(chestId);else if("READY"===chestSatuts){console.log("=================> status is ready <================");thisPlatformTarget.find(".startButton").hide(),thisPlatformTarget.find(".upgradeButton").hide(),thisPlatformTarget.find(".readyButton").show(),changeChestImage(chestTarget,"readyChest"+chestLevel)}else"OPEN"===chestSatuts&&(thisPlatformTarget.find(".startButton").hide(),thisPlatformTarget.find(".upgradeButton").hide())},determineLevel=function(chestTarget,chestLevel){changeChestImage(chestTarget,"chest"+chestLevel)},changeChestImage=function(chestTarget,chestImage){chestTarget.prop("src","https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/chest/"+chestImage+".png")};