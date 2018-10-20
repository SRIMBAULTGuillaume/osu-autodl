(function(){

    var songTab = [];
    var linkIdTab = [];

    const site = 'https://osu.ppy.sh/beatmapsets';
    
    var b = false;
    
    browser.tabs.onCreated.addListener(tab => {
    
        if (!tab.title.startsWith("osu.ppy.sh/b/"))
            return;

        var linkId = tab.title.split('/')[2];
        if (true || !linkIdTab.includes(linkId)){
            linkIdTab.push(linkId)
        }
    })
    
    
    
    browser.tabs.onUpdated.addListener((tabId, info, tab) => {
    
        var songId = tab.url.split('/')[4];
        var linkId = tab.url.split('/')[6];

        if (songTab.includes(songId))
            linkIdTab.splice(linkIdTab.indexOf(linkId), 1);

        if ( !tab.url.startsWith(site) || !linkIdTab.includes(linkId) || songTab.includes(songId))
            return;
    
        songTab.push(songId);
        linkIdTab.splice(linkIdTab.indexOf(linkId), 1);

        var dlLink = site + '/' + songId + '/download?noVideo=1';

        console.log('Download started: ' + dlLink);
    
        var downloading = browser.downloads.download({
            url : dlLink,
            filename : 'osu/' + songId + '.osz',
            conflictAction : 'overwrite'
        });
    
        browser.tabs.remove(tabId);
    })

})();
