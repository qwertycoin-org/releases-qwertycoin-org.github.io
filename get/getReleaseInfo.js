function getLatestReleaseInfo(releaseType) {
    $.getJSON("https://api.github.com/repos/qwertycoin-org/qwertycoin-gui/releases/latest").done((data) => {
        var downloadUrl;
        var downloads;
        var lastUpdate;
        var assetName;
        var releaseName = data.name;

        for (asset in data.assets) {
            if (asset.name.indexOf(releaseType) !== -1) {
                downloadUrl = asset.browser_download_url;
                downloads = asset.download_count;
                lastUpdate = asset.updated_at;
                assetName = asset.name
            }
        }

        var hour = 60 * 60 * 1000;
        var day = 24 * hour;
        var timeDiff = new Date() - new Date(lastUpdate);
        var timeAgo;

        if (timeDiff < day) {
            timeAgo = (timeDiff / hour).toFixed(1) + " hours ago";
        } else {
            timeAgo = (timeDiff / day).toFixed(1) + " days ago";
        }

        var relInfo = `${assetName} was updated ${timeAgo} and downloaded ${downloads} times`;
        $(".download").attr("href", downloadUrl);
        $(".release-info").text(relInfo);
        
    })
}