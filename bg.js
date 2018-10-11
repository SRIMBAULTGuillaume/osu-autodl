var songTab = [];

const site = 'https://osu.ppy.sh/beatmapsets';

browser.tabs.onUpdated.addListener((tabId, info, tab) => {

    var songId = tab.url.split('/')[4];

    if(!tab.url.startsWith(site) || songTab.includes(songId)){
        return;
    }
    songTab.push(songId);

    var dlLink = site + '/' + songId + '/download?noVideo=1';

    var downloading = browser.downloads.download({
        url : dlLink,
        filename : 'osu/' + songId + '.osz',
        conflictAction : 'overwrite'
    });

    browser.tabs.remove(tabId);
})
