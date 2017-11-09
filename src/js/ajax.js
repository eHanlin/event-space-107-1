var ajax = function(type, url, body, success) {
  return $.ajax({
    type: type,
    contentType: "application/json",
    dataType: "json",
    cache: false,
    crossDomain: true,
    success: success,
    url: url,
    data: body,
    xhrFields: {
      withCredentials: true
    }
  });
};

// var bodyVal = function(body) {
//   var bodyVal = "";
//   if (body != null) {
//     bodyVal = JSON.stringify({ value: body });
//   }
//   return bodyVal;
// };
