"use strict"

import app from 'todos-view'

import ad from './admob'


app
  .init()
  .exec(ad.initAdmob)
  .exec(() => {
    if (cordova.platformId == 'ios') {
      StatusBar.overlaysWebView(false);
    }
    StatusBar.backgroundColorByHexString("#009688");
  })
  .addPlugin({ ad : ad });