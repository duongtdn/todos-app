"use strict"

import app from 'todos-view'

import ad from './admob'


app
  .init()
  .exec(ad.initAdmob)
  .exec(() => {
    if (cordova.platformId == 'android') {
      StatusBar.backgroundColorByHexString("#009688");
    }
  })
  .addPlugin({ ad : ad });