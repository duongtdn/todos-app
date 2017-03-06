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

function showTopBanner() {
    showBanner(admob.Position.TOP_APP);
}

function showBottomBanner() {
    showBanner(admob.Position.BOTTOM_APP);
}

function showBanner(position) {
    const admobParam = new  admob.Params();
    admobParam.isTesting=true;
    admob.showBanner(admob.BannerSize.SMART_BANNER, position, admobParam);
}

function initAdmob() {
    if (admob) {
        admob.initAdmob(admobid.banner, admobid.interstitial);
        document.addEventListener(admob.Event.onInterstitialReceive, onInterstitialReceive, false);
        // initial cache ingerstitial ad
        const admobParam = new  admob.Params();
        admobParam.isTesting=true;
        admob.cacheInterstitial(admobParam);
    }
}

function onInterstitialReceive() {
    console.log('receivce interestitial');
}

function showInterstitial() {
    if (admob) {
        admob.isInterstitialReady(ready => {
            if(ready){
                admob.showInterstitial();
                // cache new ad
                const admobParam = new  admob.Params();
                admobParam.isTesting=true;
                admob.cacheInterstitial(admobParam);
            }
        });
    }
}

export default {
  initAdmob,
  showTopBanner,
  showBottomBanner,
  showInterstitial
}