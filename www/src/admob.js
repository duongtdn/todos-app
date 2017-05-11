"use strict"

/* Admob ID, use test id curently */
let admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-2164395546527370/4306537844',
        interstitial: 'ca-app-pub-2164395546527370/7260004243'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-2164395546527370/5922871844',
        interstitial: 'ca-app-pub-2164395546527370/1353071444'
    };
}

export default {

  getEvents(){
    if (admob) {
      return admob.events;
    } else {
      return null;
    }
  },

  initAdmob() {
    if (admob) {      
        admob.setOptions({ 
          publisherId: admobid.banner, 
          autoShowBanner: true,
          autoShowInterstitial: false,
          adSize: admob.AD_SIZE.SMART_BANNER,
          overlap: false,
          offsetStatusBar: true,
          isTesting: false, 
        });
    }
  },

  showTopBanner() {
    admob.createBannerView({ bannerAtTop: true });
  },

  showBottomBanner() {
    admob.createBannerView({ bannerAtTop: false });
  },

  showBanner() {
    admob.createBannerView();
  },

  hideBanner() {
    admob.destroyBannerView();
  },

}