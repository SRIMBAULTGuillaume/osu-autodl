
    var loopCount = 0;
    var maxLoopCount = 500;

    var hasReceiveMessage = false;

    var link;
    var setLink = function() {
        link = a.href;
        console.log('Link is : ' + link);
    }

    var a = document.getElementsByClassName("js-beatmapset-download-link")[0];

    browser.runtime.onMessage.addListener(function(request) {
        if (hasReceiveMessage === true){
            return Promise.resolve({response: "No"});
        }
        hasReceiveMessage = true;
        let loop2 = () => {
            setTimeout(() => {
                console.log(link);
                if (link != undefined) {
                    console.log('Return promise')
                    return Promise.resolve({response: "Hi from content script", url: link});
                }
                else 
                    loop2();
            }, 50);
        };
        loop2();
    });

    var loop = () => {
        setTimeout(() => {
            loopCount++;
            a = document.getElementsByClassName("js-beatmapset-download-link")[0];
            if (a === undefined)
                loop();
            else if (loopCount<maxLoopCount)
            setLink();
        }, 10)
    }

    if (a === undefined)
        loop();
    else
        setLink();
