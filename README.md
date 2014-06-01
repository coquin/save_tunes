Save tunes
==========

A node.js script to parse iTunes library xml file and get list of filepaths of tracks for specified playlist.

Usage
-----

First, install node.js. Clone repository, run `npm install` in the directory where you cloned it. Then run

    node save_tunes.js -p "Robert Johnson"

Script will find a playlist named "Robert Johnson" in your iTunes library, parse tracks records for that list and output filenames (with absolute file paths) for those tracks. For example, the command above will produce something like this:

    /Users/coquin/Music/iTunes/iTunes\ Media/Music/Robert\ Johnson/A\ Proper\ Introduction\ to\ Robert\ Johnson_\ Cross\ Road\ Blues/01\ Kindhearted\ Woman\ Blues.mp3
    /Users/coquin/Music/iTunes/iTunes\ Media/Music/Robert\ Johnson/A\ Proper\ Introduction\ to\ Robert\ Johnson_\ Cross\ Road\ Blues/02\ I\ Believe\ I\'ll\ Dust\ My\ Broom.mp3
    /Users/coquin/Music/iTunes/iTunes\ Media/Music/Robert\ Johnson/A\ Proper\ Introduction\ to\ Robert\ Johnson_\ Cross\ Road\ Blues/03\ Sweet\ Home\ Chicago.mp3
    /Users/coquin/Music/iTunes/iTunes\ Media/Music/Robert\ Johnson/A\ Proper\ Introduction\ to\ Robert\ Johnson_\ Cross\ Road\ Blues/04\ Rambling\ On\ My\ Mind.mp3
    /Users/coquin/Music/iTunes/iTunes\ Media/Music/Robert\ Johnson/A\ Proper\ Introduction\ to\ Robert\ Johnson_\ Cross\ Road\ Blues/05\ When\ You\ Got\ a\ Good\ Friend.mp3
    ...

The main idea is that you can pipe this list (with a little help of [xargs](http://unixhelp.ed.ac.uk/CGI/man-cgi?xargs) utility) to any UNIX terminal utility: `grep`, `cp`, `pbcopy`... For example, I want to copy all tracks from my "Trash Metal" playlist (a bunch of tracks from various artists, which iTunes will store in its crazy way with track filenames put at `artist_name/album_name/track_name.mp3` paths) in a Dropbox folder. This how I do it using this utility:

    node save_tunes.js -p "Trash Metal" | xargs -J % cp -n % ~/Dropbox/Music/

Job done!

FAQ
---

*What if my iTunes library is in a custom directory?*

Supply `-l` option followed with a path to your iTunes library (the default location is `~/Music/iTunes`). If you are not sure, check if you directory contains `iTunes Music Library.xml` file, this is what this script actually needs:

    node save_tunes.js -p "Playalong tracks" -l /Volumes/My\ External\ HDD/Music

