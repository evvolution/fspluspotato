
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
        return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
            try { d.documentElement.doScroll('left'); run(); }
            catch (err) { setTimeout(arguments.callee, 0); }
        })();
        else if (wk)
        var t = setInterval(function () {
            if (/^(loaded|complete)$/.test(d.readyState))
            clearInterval(t), run();
        }, 0);
    };
})();

function ajax_get(url) {
    var xhr=new XMLHttpRequest();
    xhr.open('GET',url,false);
    xhr.onreadystatechange=function(){
        // readyState == 4
        if(xhr.readyState==4){
            if(xhr.status==200 || xhr.status==304){
                // console.log(xhr.responseText);
            }else {
                alert('system error+' + xhr.readyState);
                return;
            }
        }
    }
    xhr.send();
    return xhr.responseText;
}

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

var mainserverlink = 'https://server.foshanplus.com/';