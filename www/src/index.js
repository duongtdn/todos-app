"use strict"

import app from 'todos-view'

import ad from './admob'


app
  .init()
  // .exec(ad.initAdmob.bind(ad))
  .exec(() => {
    if (cordova.platformId == 'ios') {
      StatusBar.overlaysWebView(false);
    }
    StatusBar.backgroundColorByHexString("#2196F3");
  })
  .addPlugin({ ad : ad });