/**
 * Http Get by ajax
 */
var ajaxGet = function(url, data, success) {
  return $.ajax({
    type: "GET",
    url: url,
    data: data,
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

/**
 * Http Post, Put, Delete by ajax
 */
var ajax = function(type, url, data, success) {
  return $.ajax({
    type: type,
    url: url,
    data: JSON.stringify(data),
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
