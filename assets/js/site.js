SetTeamNav();


//Menu
$("#logout").click(function () {
    eraseCookie("TeamName");
    window.location.href = "Mainpage.html";
})

function GetTeamName() {
    return readCookie("TeamName");
}

function GetStage() {
    return readCookie("Stage");
}

function GotoStage() {
    var stage = readCookie("Stage").padStart(2, "0");
    location.href = "a" + stage + ".html";
}

function SetTeamNav() {
    var TeamName = GetTeamName();
    if (TeamName === null) {
        let target = document.getElementById("TeamNav");
        target.style.display = "none";
    } else {
        let target = document.getElementById("TeamName");
        target.innerText = "探險隊:" + TeamName;
    }

}

function SetStage(value) {
    var stage = readCookie("Stage");
    if (value >= stage) {
        createCookie("Stage", value );
    }
}

function FindTeamCookies() {
    var TeamName = GetTeamName();
    if (TeamName === null) {
        window.location.href = "index.html";
    }
}

// 建立cookie
function createCookie(name, value) {
    expire_days = 120; // 過期日期(天)
    var d = new Date();
    d.setTime(d.getTime() + (expire_days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires + ";";

}
//讀取
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
//刪除
function eraseCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}