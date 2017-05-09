var url;
function playPause() {
    var request = {
        jsonrpc: "2.0",
        id: 1,
        method: "Player.PlayPause"
    };
    sendRPC(request);
};
function stop() {
    var request = {
        jsonrpc: "2.0",
        id: 1,
        method: "Player.Stop"
    };
    sendRPC(request);
};
function playUrl() {
    var request = {
        jsonrpc: "2.0",
        id: 1,
        method: "Player.Open",
        params: {
            item: {
                file: url.value
            }
        }
    };
    sendRPC(request);
    url.focus();
    url.select();
};
function sendRPC(request) {
    $.ajax({
        url: "/jsonrpc?" + request.method,
        type: "POST",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { }
    });
};
function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
      return decodeURIComponent(results[1]);
    }
};
window.onload = function (e) {
    var param = urlParam("url");
    url = document.getElementById("url");
    url.focus();
    url.select();
    url.addEventListener("keypress", function (event) {
        if (event.keyCode == 13) {
            playUrl();
            event.preventDefault();
        }
    });
    if(param != null)
    {
        url.value = param;
        playUrl();
    }
}