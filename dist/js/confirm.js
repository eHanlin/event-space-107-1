let confirmWindow=function(title,content,confrimFunction){return{title:"<h5>"+title+"</h5>",content:"<span style='font-size: 20px'>"+content+"</span>",useBootstrap:!1,theme:"supervan",buttons:{cancelButton:{text:"再想想",btnClass:"btn-blue",action:function(){}},confirmButton:{text:"確認",btnClass:"btn-blue",action:confrimFunction}}}},alertWindow=function(title,content,confirmCallBack){return confirmCallBack||(confirmCallBack=function(){}),{title:title,content:"<span style='font-size: 20px'>"+content+"</span>",useBootstrap:!1,theme:"supervan",boxWidth:"40%",buttons:{confirmButton:{text:"確認",btnClass:"btn-blue",action:confirmCallBack}}}},alertForAward=function(title,rank,quantity,needChestLv,introduction,notice,alertFunction){return alertFunction||(alertFunction=function(){}),{title:title,content:"<span style='font-size:22px;'><br>贈品數量："+quantity+"名<br><p style='color:yellow'>可獲取的寶箱：Lv. "+needChestLv+"</p><br>"+introduction+"<br><br></span><span style='font-size:16px;'>小提醒："+notice+"</span>",useBootstrap:!1,theme:"supervan",buttons:{confirmButton:{text:"確認",btnClass:"btn-blue",action:alertFunction}}}},writeAcceptanceInfo=function(content,totalCoins,totalGems){let awardAccepted=function(){let originalCoins=$(".space .coins #own-coins").text(),originalGems=$(".space .gems #own-gems").text();countTrasition("own-coins",originalCoins,totalCoins),countTrasition("own-gems",originalGems,totalGems),getAwards()};return{title:"",content:content,boxWidth:"42%",useBootstrap:!1,theme:"supervan",buttons:{cancelButton:{text:"下一步",btnClass:"btn-blue",action:function(){awardAccepted(),window.open("/Events/winner_info.html?id=space","填寫領獎資訊")}},confirmButton:{text:"確認",btnClass:"btn-blue",action:awardAccepted}}}};