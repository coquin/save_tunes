var libxmljs = require("libxmljs");
var fs = require("fs");
var parseArgs = require("minimist");

var argv = parseArgs(process.argv.slice(2), {
    default: {
        l: process.env["HOME"] + "/Music/iTunes"
    }
});

var playListName = argv.p;
var libraryFile = argv.l + "/iTunes\ Music\ Library.xml"; 

if (!playListName) {
    console.log("No play list name specified.");
    console.log("usage: node save_tunes.js -p %playlist_name% -l %library_path%");
    process.exit(1);
}

fs.readFile(libraryFile, function(err, data) {
    if (err) {
        console.log("Cannot open iTunes library file (iTunes Music Library.xml).");
        return;
    }

    var doc = libxmljs.parseXmlString(data),
        tracksNode = doc.get("dict/key[text()='Tracks']/following-sibling::dict[1]"),
        playlistsNode = doc.get("dict/key[text()='Playlists']/following-sibling::array[1]"),
        targetPlayListNameNode = playlistsNode.get("dict/string[text()='" + playListName + "']"),
        targetPlayListNode,
        tracks, trackId, trackNode, trackName, trackPath;

    if (!targetPlayListNameNode) {
        console.log("Playlist not found.");
        return;
    }

    targetPlayListNode = targetPlayListNameNode.parent();
    tracks = targetPlayListNode.find("array/dict");

    for (var i = 0, iLen = tracks.length; i < iLen; i++) {
        trackId = tracks[i].get("integer").text();
        trackNode = tracksNode.get("key[text()='" + trackId + "']/following-sibling::dict[1]");

        if (trackNode) {
            trackName = trackNode.get("key[text()='Name']").nextSibling().text();
            trackPath = decodeURI(trackNode.get("key[text()='Location']").nextSibling().text()).replace("file://localhost", "").replace(/(["\s'$`\\])/g,'\\$1');

            console.log(trackPath);
        }
    }
});
