if (typeof DTbot === "undefined" || DTbot === null) {
        DTbot = {
                autodub: null,
                songinfo: [
                        null,
                        null
                ],
                currentdj: null,
                enabled: false,
                version: "v0.3.5.1",
                startUp: function () {
                        var messageJSON = new Dubtrack.Model.chat({
                                user: JSON.parse(`{
                                        "username": "dtbot",
                                        "status": 1,
                                        "roleid": 1,
                                        "dubs": 0,
                                        "created": 1445822278697,
                                        "lastLogin": 0,
                                        "userInfo": {
                                                "_id": "562d7f478e9cd10e00edfe07",
                                                "userid": "562d7f478e9cd10e00edfe06",
                                        "__v": 0
                                        },
                                        "_id": "562d7f478e9cd10e00edfe06",
                                        "profileImage": {
                                                "public_id": "qsaizgnbjjme8kpmb3ac",
                                                "version": 1447028797,
                                                "width": 150,
                                                "height": 150,
                                                "format": "png",
                                                "resource_type": "image",
                                                "tags": [],
                                                "bytes": 1862,
                                                "type": "upload",
                                                "etag": "ec13c8ac397b4880abed441e2b8885d0",
                                                "url": "http://res.cloudinary.com/hhberclba/image/upload/v1447028797/qsaizgnbjjme8kpmb3ac.png",
                                                "secure_url": "https://res.cloudinary.com/hhberclba/image/upload/v1447028797/qsaizgnbjjme8kpmb3ac.png"
                                        },
                                        "__v": 0
                                }`),
                                message: "DTbot " + DTbot.version + " started.",
                                time: Date.now(),
                                realTimeChannel: Dubtrack.room.model.get("realTimeChannel"),
                                type: "chat-message"
                        });
                        Dubtrack.room.chat.appendItem(messageJSON);
                        DTbot.initAutoDub();
                        DTbot.initSongUpdates();
                        DTbot.enabled = true;
                },
                initAutoDub: function () {
                        $("#main-menu-left").append('<a onclick="DTbot.AutoDub();" id="auto-dub-item">AutoDub</a>');
                },
                AutoDub: function () {
                        $("#auto-dub-item").text("Stop AutoDub");
                        $("#auto-dub-item").attr("onclick","DTbot.StopAutoDub();");
                        Dubtrack.playerController.voteUpAction();
                        Dubtrack.Events.bind("realtime:room_playlist-update", function(){Dubtrack.playerController.voteUpAction();});
                },
                StopAutoDub: function () {
                        $("#auto-dub-item").text("AutoDub");
                        $("#auto-dub-item").attr("onclick","DTbot.AutoDub();");
                        Dubtrack.Events.unbind("realtime:room_playlist-update", function(){Dubtrack.playerController.voteUpAction();});
                },
                initSongUpdates: function () {
                        $("#main-menu-left").append('<a onclick="DTbot.SongUpdates();" id="song-update-item">Song Updates</a>');
                },
                SongUpdates: function () {
                        $("#song-update-item").text("Stop Song Updates");
                        $("#song-update-item").attr("onclick","DTbot.StopSongUpdates();");
                        DTbot.SongUpdateStuff();
                        Dubtrack.Events.bind("realtime:room_playlist-update",DTbot.SongUpdateStuff);
                },
                SongUpdateStuff: function() {
                        try {
                                var message = Dubtrack.room.player.currentDjName.text() + ": " + Dubtrack.room.player.activeSong._previousAttributes.songInfo.name;
                        } catch (e) {var message = "null: null"}
                        if(message !== DTbot.songinfo[0]+": "+DTbot.songinfo[1]) {
                                DTbot.songinfo = [Dubtrack.room.player.currentDjName.text(),Dubtrack.room.player.activeSong._previousAttributes.songInfo.name];
                                var messageJSON = new Dubtrack.Model.chat({
                                        user: JSON.parse(`{
                                                "username": "dtbot",
                                                "status": 1,
                                                "roleid": 1,
                                                "dubs": 0,
                                                "created": 1445822278697,
                                                "lastLogin": 0,
                                                "userInfo": {
                                                        "_id": "562d7f478e9cd10e00edfe07",
                                                        "userid": "562d7f478e9cd10e00edfe06",
                                                        "__v": 0
                                                },
                                                "_id": "562d7f478e9cd10e00edfe06",
                                                "profileImage": {
                                                        "public_id": "qsaizgnbjjme8kpmb3ac",
                                                        "version": 1447028797,
                                                        "width": 150,
                                                        "height": 150,
                                                        "format": "png",
                                                        "resource_type": "image",
                                                        "tags": [],
                                                        "bytes": 1862,
                                                        "type": "upload",
                                                        "etag": "ec13c8ac397b4880abed441e2b8885d0",
                                                        "url": "http://res.cloudinary.com/hhberclba/image/upload/v1447028797/qsaizgnbjjme8kpmb3ac.png",
                                                        "secure_url": "https://res.cloudinary.com/hhberclba/image/upload/v1447028797/qsaizgnbjjme8kpmb3ac.png"
                                                },
                                                "__v": 0
                                        }`),
                                        message: message,
                                        time: Date.now(),
                                        realTimeChannel: Dubtrack.room.model.get("realTimeChannel"),
                                        type: "chat-message"
                                });
                                Dubtrack.room.chat.appendItem(messageJSON);
                        }
                },
                StopSongUpdates: function () {
                        $("#song-update-item").text("Song Updates");
                        $("#song-update-item").attr("onclick","DTbot.SongUpdates();");
                        Dubtrack.Events.unbind("realtime:room_playlist-update",DTbot.SongUpdateStuff);
                }
        }
        DTbot.startUp();
}