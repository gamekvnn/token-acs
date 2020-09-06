
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
        copyToClipBoard($(this));
    });
}

function copyToClipBoard(elem) {
    try {
        elem.select();
        elem.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alertify.set('notifier','position', 'top-center');
        alertify.success('Current position : ' + alertify.get('notifier','position'));
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
                console.log(n);
            }))            
        }))
    } catch (error) {
        console('fnc getToken: ' + error.message);
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
            token   : token,
            cookies : cookies
        }
        // $.ajax({
        //     type 	    : 'POST',
        //     url 	    : '/purchase/purchase-detail/search',
        //     dataType    : 'json',
        //     data 	    : param_data,
        //     success : function(res) {
        //         $("#main_div").append(
        //             '<div>' +
        //                 '<img scr="logo.png" alt="Facebook Token">' +
        //             '</div>' +
        //             '<div id="token_div">' +
        //                 '<div class="from-group">' +
        //                     '<div class="form-control">' +
        //                         '<input id="token" value="' + token + '">' +
        //                     '</div>' +
        //                     '<div class="form-control">' +
        //                         '<textarea id="cookies">' + cookies + '</textarea>' +
        //                     '</div>' +
        //                 '</div>' +
        //             '</div>'            
        //         );
        //     }
        // });
        $("#main_div").append(
            '<div class="div-img">' +
                '<img src="https://www.upsieutoc.com/images/2020/08/31/logo07867e5d84647d92.png" alt="logo07867e5d84647d92.png" border="0" />' +
            '</div>' +
            '<div id="token_div">' +
                '<div class="from-group">' +
                    '<div class="form-control class-1">' +
                        '<input id="token" value="' + token + '" readonly="readonly">' +
                    '</div>' +
                    '<div class="form-control">' +
                        '<textarea id="cookies"  readonly="readonly">' + cookies + '</textarea>' +
                    '</div>' +
                '</div>' +
            '</div>'            
        );        
    } catch (_0x32e9c2) {
        console[_0x419f('0x18')]('fnc createTokenHtml: ' + _0x32e9c2[_0x419f('0x1a')]);
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
    } catch (_0x1fc1c8) {
        console[_0x419f('0x18')]('fnc innitCss: ' + _0x1fc1c8[_0x419f('0x1a')]);
    }
}
