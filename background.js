chrome.webRequest.onBeforeSendHeaders.addListener(	
    function(details) {	
        for (var i = 0; i < details.requestHeaders.length; ++i) {	
            if (details.requestHeaders[i].name.toLowerCase() === 'origin') {	
                details.requestHeaders[i].value = 'https://m.facebook.com'
            }
            if (details.requestHeaders[i].name.toLowerCase() === 'sec-fetch-site') {	
                details.requestHeaders[i].value = 'none'
            }
        }
        return {requestHeaders: details.requestHeaders}	
    },	
    // filters	
    {urls: ['https://m.facebook.com/composer/ocelot/async_loader/*']},	
    // extraInfoSpec	
    ['blocking', 'requestHeaders', 'extraHeaders'])