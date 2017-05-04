"use strict"

/* Admob ID, use test id curently */
let admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-2593477801129708/3511727273',
        interstitial: 'ca-app-pub-2593477801129708/4988460478'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-2593477801129708/4756618070',
        interstitial: 'ca-app-pub-2593477801129708/5128061276'
    };
}

export default {

  initAdmob() {
    if (admob) {      
        admob.setOptions({ 
          publisherId: admobid.banner, 
          autoShowBanner: false,
          adSize: admob.AD_SIZE.SMART_BANNER,
          overlap: false,
          offsetStatusBar: true,
          isTesting: true 
        });
        admob.createBannerView();
    }
  },

  showTopBanner() {
    admob.createBannerView({ bannerAtTop: true });
    this.showBanner();
  },

  showBottomBanner() {
    this.showBanner();
  },

  showBanner() {
    admob.showBannerAd();
  },

  hideBanner() {
    admob.destroyBannerView();
  },

}