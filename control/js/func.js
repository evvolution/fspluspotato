document.ready(function(){
    getCaptchas ()
});

function getCaptchas () {
    document.getElementById("usercaptchaCode").value = "";
    var captcha = ajax_get('https://server.foshanplus.com/captcha');
    // console.log(captcha)
    var result = JSON.parse(captcha).captcha;
    var img = result.captcha_img;
    var item_id = result.item_id;
    document.getElementById("captcha").src = 'data:image/png;base64,' + img;
    document.getElementById("useritemID").value = item_id;
}

function checkCaptchas (prj) {
    var userworkCode = document.getElementById("userworkCode").value;
    var usercaptchaCode = document.getElementById("usercaptchaCode").value;
    var useritemID = document.getElementById("useritemID").value;
    if(userworkCode == "") {
        alert("请填写作品码");
        return;
    }
    if(usercaptchaCode == "") {
        alert("请填写验证码");
        return;
    }
    var requesturl = 'https://server.foshanplus.com/check_api?code=' + usercaptchaCode + '&code_id=' + useritemID + '&exam_id=' + prj;
    var result = JSON.parse(ajax_get(requesturl));
    // console.log(result)
    if(result.is_error == true) {
        alert("验证码有误");
        window.location.href = window.location.href;
    }else {
        var list = result.data;
        var listarr = [];
        for (var i = 0; i < list.length; i++){
            listarr[i] = list[i].code;
        }
        // console.log(listarr)
        var isInDone = listarr.indexOf(userworkCode)
        if(isInDone == "-1") {
            alert("未找到作品");
            window.location.href = window.location.href;
        } else {
            var hidex = document.getElementsByClassName("content")[0];
            var showx = document.getElementsByClassName("infoContent")[0];
            hidex.style.display = "none";
            showx.style.display = "block";
            document.getElementById("info-name").innerText = '作品名：' + list[isInDone].title;
            document.getElementById("info-state").innerText = '审核状态：' + list[isInDone].status;
        }
    }
}