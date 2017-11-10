var ajaxGet = function(url, body, success) {
  return $.ajax({
    type: "GET",
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

var ajaxPost = function(url, body, success) {
  return $.ajax({
    type: "POST",
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

var ajaxPut = function(url, body, success) {
  return $.ajax({
    type: "PUT",
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

var ajaxDel = function(url, body, success) {
  return $.ajax({
    type: "DELETE",
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
