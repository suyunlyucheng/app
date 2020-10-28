var imgFile = []; //文件流
var imgSrc = []; //图片路径
var imgName = []; //图片名字
var upload_num;
$(function () {
    $.getJSON("check-teammate-num.php", {}, function (result) {
        upload_num = result.num;
        alert("請上傳" + upload_num +"張圖片");
    })

    // 鼠标经过显示删除按钮
    $('.content-img-list').on('mouseover', '.content-img-list-item', function () {
        $(this).children('a').removeClass('hide');
    });
    // 鼠标离开隐藏删除按钮
    $('.content-img-list').on('mouseleave', '.content-img-list-item', function () {
        $(this).children('a').addClass('hide');
    });
    // 单个图片删除
    $(".content-img-list").on("click", '.content-img-list-item a', function () {
        var index = $(this).attr("index");
        imgSrc.splice(index, 1);
        imgFile.splice(index, 1);
        imgName.splice(index, 1);
        var boxId = ".content-img-list";
        addNewContent(boxId);
        if (imgSrc.length < upload_num) { //顯示上傳按鈕
            $('.content-img .file').show();
        }
    });
    //圖片上传
    $('#upload').on('change', function () {

        if (imgSrc.length >= upload_num) {
            return alert("上傳的照片數超過組員人數摟！");
        }
        var imgSize = this.files[0].size; //b
        //        if (imgSize > 1024 * 1024 * 1) { //1M
        //            return alert("上传图片不能超过1M");
        //        }
        console.log(this.files[0].type)
        if (this.files[0].type != 'image/png' && this.files[0].type != 'image/jpeg' && this.files[0].type != 'image/gif') {
            return alert("圖片上傳的格式不正確");
        }

        var imgBox = '.content-img-list';
        var fileList = this.files;
        for (var i = 0; i < fileList.length; i++) {
            var imgSrcI = getObjectURL(fileList[i]);
            imgName.push(fileList[i].name);
            imgSrc.push(imgSrcI);
            imgFile.push(fileList[i]);
        }
        if (imgSrc.length == upload_num) { //隐藏上传按钮
            $('.content-img .file').hide();
            $("#uploadbtn").show();
        }
        addNewContent(imgBox);
        this.value = null; //解决无法上传相同图片的问题
    })

    //提交请求
    $('#btn-submit-upload').on('click', function () {
        // FormData上傳图片
        var formFile = new FormData();
        //         formFile.append("type", type); 
        //         formFile.append("content", content); 
        //         formFile.append("mobile", mobile); 
        // 遍历图片imgFile添加到formFile里面
        $.getJSON("round-process-update.php", {
            round: 'CP3',
            SID: 'R3'
        }, function () {
            //                alert(php_script_response);
        })
        $("#nextcheck").show();


        $.each(imgFile, function (i, file) {
            formFile.append('myFile', file);

            console.log(imgFile)
            $.ajax({
                url: 'upload-img.php',
                type: 'POST',
                data: formFile,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (res) {
                    //                var msg = "上傳成功" + res.res1 + res.res2 + res.res3;
                    //                alert(msg);
                    //                alert(php_script_response);
                },
                error: function (request, status, error) {
//                    alert(request.responseText);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    this; // 呼叫本次AJAX請求時傳遞的options引數
                }
            })
        });
        alert("上傳完畢～")
    });

});

//刪除
function removeImg(obj, index) {
    imgSrc.splice(index, 1);
    imgFile.splice(index, 1);
    imgName.splice(index, 1);
    var boxId = ".content-img-list";
    addNewContent(boxId);
}

//圖片展示
function addNewContent(obj) {
    // console.log(imgSrc)
    $(obj).html("");
    for (var a = 0; a < imgSrc.length; a++) {
        var oldBox = $(obj).html();
        $(obj).html(oldBox + '<li class="content-img-list-item"><img src="' + imgSrc[a] + '" alt=""><a index="' + a + '" class="hide delete-btn"><i class="ico-delete"></i></a></li>');
    }
}

//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
