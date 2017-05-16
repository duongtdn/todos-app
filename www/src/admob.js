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

  isShowing: false,

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
        /* register event for manual request by create new banner when ad is 
           loaded, setup a timeout for request ad
           currently android admob sdk will hide the banner view when re-create 
           them, so for android, I only make request when app is resume to 
           foreground for better user experience */
        this.scheduleNextAdRequest = this.scheduleNextAdRequest.bind(this);   
        this.requestAd = this.requestAd.bind(this);
        if (device.platform === 'iOS') {
          document.addEventListener(admob.events.onAdLoaded, this.scheduleNextAdRequest, false);
        }  
        if (device.platform === 'Android') {
          document.addEventListener('resume', this.requestAd, false);
        }
        return this;
    }
  },

  getEvents() {
    if (admob) {
      return admob.events;
    } else {
      return null;
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
    this.isShowing = true;
    admob.createBannerView();  
  },

  hideBanner() {
    admob.destroyBannerView();
    this.isShowing = false;
    /* remove all event listeners */
    if (device.platform === 'iOS') {
      document.removeEventListener(admob.events.onAdLoaded, this.scheduleNextAdRequest, false);
    }  
    if (device.platform === 'Android') {
      document.removeEventListener('resume', this.requestAd, false);
    }
  },

  scheduleNextAdRequest() {
    /* make request */
    setTimeout(() => {
      this.requestAd();
    }, TO);
  },

  requestAd() {

    if (!this.isShowing) { return; }

    if (device.platform === 'Android') {
      /* manual make request */
      this.showBanner();
      return;
    }

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
    this.showBanner();

  }

}