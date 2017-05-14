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

/* Define timeout for ad request */
const TO = 60000; // 60s

let ts = 0; // global captured timestamp in each time ad request is invoked

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
        /* setup admob options */    
        admob.setOptions({ 
          publisherId: admobid.banner, 
          autoShowBanner: true,
          autoShowInterstitial: false,
          adSize: admob.AD_SIZE.SMART_BANNER,
          overlap: false,
          offsetStatusBar: true,
          isTesting: false, 
        });
        /* register event for manual request by destroy and create banner
           when ad is loaded, setup a timeout for request ad */
        // document.addEventListener(admob.events.onAdLoaded, this.scheduleNextAdRequest, false);
           
    }
  },

  showTopBanner() {
    admob.setOptions({ bannerAtTop: true });
    this.showBanner();
  },

  showBottomBanner() {
    admob.setOptions({ bannerAtTop: false });
    this.showBanner();
  },

  showBanner() {
    admob.createBannerView();
    /* manually schedule for next ad request */
    this.scheduleNextAdRequest();
  },

  hideBanner() {
    admob.destroyBannerView();
  },

  scheduleNextAdRequest() {
    /* make request */
    setTimeout(() => {
      this.requestAd();
    }, TO);
  },

  requestAd() {
    /* before making ad request, check the time eslapsed. If it is greater then
       timeout, then make a request.
       if app is offline, setup another timeout for detect connection status */
    const now = new Date().getTime();
    const diff = now - ts;

    if (diff < TO) { 
      setTimeout(() => this.requestAd(), diff);
      return; 
    }

    /* record timestamp */
    ts = now;

    /* check network connection */
    if (navigator && navigator.connection) {
      const networkState = navigator.connection.type;
      if (networkState === Connection.NONE) { // offline
        this.scheduleNextAdRequest();
        return;
      }
    }

    /* manual make request */
    // this.hideBanner();
    this.showBanner();

  }

}