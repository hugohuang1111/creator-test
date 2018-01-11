cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        fbLoginText: 'login'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;

        if (cc.sys.isMobile) {
            this.testSdkbox();
        }
    },

    // called every frame
    update: function (dt) {

    },

    testSdkbox: function () {
        this.testFB();
        this.testAdMob();
    },

    // facebook begin
    testFB: function () {
        var self = this;

        sdkbox.PluginFacebook.init();
        sdkbox.PluginFacebook.setListener({
            onLogin: function(isLogin, msg) {
              if (isLogin) {
                self.label.string = "login successful";
              } else {
                self.label.string = "login failed";
              }
            },
            onSharedSuccess: function (msg) {
                self.label.string = msg;
                self.fbLoginText.string = "logout";
            },
            onSharedFailed: function (message) {
                self.label.string = msg;
                self.fbLoginText.string = "login";
            },
            onGetUserInfo: function (user) {
                self.label.string = "onGetUserInfo";

                console.log("Facebook > ", user.first_name);
                console.log("Facebook > ", user.id);
                console.log("Facebook > ", user.installed);
                console.log("Facebook > ", user.is_silhouette);
                console.log("Facebook > ", user.last_name);
                console.log("Facebook > ", user.name);
                console.log("Facebook > ", user.picture);
                console.log("Facebook > ", user.picture_url);
                console.log("Facebook > ", user.score);
            },
            onAPI: function (key, jsonData) {
                self.label.string = key + jsonData;
            },
            onFetchFriends: function (ok, msg) {
                self.label.string = "onFetchFriends" + msg;
            },
            onPermission: function (isLogin, msg) {
                self.label.string = "onPermission" + msg;
            }
        });
        if (sdkbox.PluginFacebook.isLoggedIn()) {
            this.fbLoginText.string = "logout";
        } else {
            this.fbLoginText.string = "login";
        }
    },
    clickFBLogin: function () {
        console.log("Facebook > clickFBLogin")

        if (sdkbox.PluginFacebook.isLoggedIn()) {
            this.PluginFacebook.logout();
        } else {
            sdkbox.PluginFacebook.login();
        }
    },
    clickFBLogout: function () {
        console.log("Facebook > clickFBLogout")
        sdkbox.PluginFacebook.logout();
    },
    clickFBShareLink: function () {
        console.log("Facebook > clickFBShareLink");

        var info = new Object();
        info.type  = "link";
        info.link  = "http://www.cocos2d-x.org";
        info.title = "cocos2d-x";
        info.text  = "Best Mobile Game Engine";
        info.image = "http://cocos2d-x.org/images/logo.png";
        sdkbox.PluginFacebook.share(info);
    },
    clickFBDialogLink: function () {
        console.log("Facebook > clickFBDialogLink");

        var info = new Object();
        info.type  = "link";
        info.link  = "http://www.cocos2d-x.org";
        info.title = "cocos2d-x";
        info.text  = "Best Mobile Game Engine";
        info.image = "http://cocos2d-x.org/images/logo.png";
        sdkbox.PluginFacebook.dialog(info);
    },
    clickFBInviteFriends: function () {
        sdkbox.PluginFacebook.inviteFriends(
         "https://fb.me/322164761287181",
         "http://www.cocos2d-x.org/attachments/801/cocos2dx_portrait.png");
    },
    clickFBGraphAPI: function () {
        var params = new Object();
        sdkbox.PluginFacebook.api("/me/friendlists", "GET", params, "/me/friendlists");

    },
    // Facebook end

    // AdMob
    testAdMob: function () {
        var self = this;
        sdkbox.PluginAdMob.init();
        sdkbox.PluginAdMob.setListener({
            adViewDidReceiveAd : function(name) {
                self.label.string = "AdMob adViewDidReceiveAd " + name;

                sdkbox.PluginAdMob.show(name);
            },
            adViewDidFailToReceiveAdWithError : function(name, msg) {
                self.label.string = "AdMob adViewDidFailToReceiveAdWithError " + name;
            },
            adViewWillPresentScreen : function(name) {
                self.label.string = "AdMob adViewWillPresentScreen " + name;
            },
            adViewDidDismissScreen : function(name) {
                self.label.string = "AdMob adViewDidDismissScreen " + name;
            },
            adViewWillDismissScreen : function(name) {
                self.label.string = "AdMob adViewWillDismissScreen " + name;
            },
            adViewWillLeaveApplication : function(name) {
                self.label.string = "AdMob adViewWillLeaveApplication " + name;
            }
        });
    },
    clickShowAdMobBanner: function () {
        sdkbox.PluginAdMob.show("home");
    },
    clickShowAdMobInterstital: function () {
        sdkbox.PluginAdMob.show("gameover");
    },
    clickShowAdMobVideo: function () {
        sdkbox.PluginAdMob.show("rewarded");
    },
    clickHideAdMobBanner: function () {
        sdkbox.PluginAdMob.hide("home");
    },
    clickHideAdMobInterstital: function () {
        sdkbox.PluginAdMob.hide("gameover");
    },
    clickHideAdMobVideo: function () {
        sdkbox.PluginAdMob.hide("rewarded");
    },
});
