/**
 * Http Get by ajax
 */
var ajaxGet = function(url, param, success) {
  return $.ajax({
    type: "GET",
    url: url,
    data: param,
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    cache: false,
    crossDomain: true,
    success: success
    // xhrFields: {
    //   withCredentials: false
    // }
  });
};

/**
 * Http Post, Put, Delete by ajax
 */
var ajax = function(type, url, body, success) {
  return $.ajax({
    type: type,
    url: url,
    data: JSON.stringify(body),
    contentType: "application/json",
    dataType: "json",
    cache: false,
    crossDomain: true,
    success: success,
    xhrFields: {
      withCredentials: true
    }
  });
};

var ajaxDeferred = function(type, url, body) {
  return $.ajax({
    type: type,
    cache: false,
    crossDomain: true,
    url: url,
    data: JSON.stringify(body),
    contentType: "application/json; charset=UTF-8",
    dataType: "json"
  });
};
