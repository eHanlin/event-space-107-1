define(['jquery', 'ajaxUtil'], function ($, ajaxUtil) {
  return function () {
    ajaxUtil('GET', `http://localhost:8080/chest/retrieve/award`)
      .then(function (jsonData) {
        let awards = jsonData.content
        let index = 0
        for (let award in awards) {
          let awardId = award.split('#')[0]
          let awardDesc = award.split('#')[1]
          let value = awards[award]
          let specificAward = $('.countingAwards li:eq(' + index + ')')
          let awardImage =
            `<img src='https://d220xxmclrx033.cloudfront.net
            /event-space/img/award/${awardId}.png />`

          specificAward.empty().append(awardImage)
          specificAward.append(`<span style='width:130px;'>${awardDesc}</span>`)
          specificAward.append(`<h1><span>${value}</span></h1>`)

          index++
        }

        $('.countingAwardsArticle .fa.fa-mail-forward').on('click', function () {
          $(this).hide()
          $('.countingAwards .awardBox').css('display', 'none')
          $('.countingAwards .awardBox2').removeAttr('style')
          $('.countingAwardsArticle .fa.fa-mail-reply').show()
        })

        $('.countingAwardsArticle .fa.fa-mail-reply').on('click', function () {
          $(this).hide()
          $('.countingAwards .awardBox').removeAttr('style')
          $('.countingAwards .awardBox2').hide()
          $('.countingAwardsArticle .fa.fa-mail-forward').show()
        })
      })
  }
})
