define(['jquery', 'ajaxUtil'], function ($, ajaxUtil) {
  return function () {
    ajaxUtil('GET', `http://localhost:9090/currencyBank/totalAssets/retrieve/one?userSpecific=596f1ce1e4b062375bdec803`)
      .then(function (jsonData) {
        $('.bank').removeAttr('style')
        $('.space .coins span').append(jsonData.content['coins'])
        $('.space .gems span').append(jsonData.content['gems'])
      }, function () {
        $('.bankLogout').removeAttr('style')
      })
  }
})
