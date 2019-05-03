/*
 * @flow
 */

'use strict';

let MessengerExtensions = null;

// FB Messenger plugin is loaded asynchornously. We would use a polling approach
// to make sure the extension is loaded.
window.extAsyncInit = function() {
  MessengerExtensions = require('MessengerExtensions');
};

// check if MessengerExtension is initialized
function getExtension(success: (val: Object) => void): void {
  console.log(MessengerExtensions);
  if (MessengerExtensions) {
    success(MessengerExtensions);
    return;
  }
  setTimeout(getExtension, 150, success);
}

function isInExtention(success: (val: bool) => void): void {
  getExtension((MessengerExtensions: Object): void => {
    success(MessengerExtensions.isInExtension());
  });
}

function getUserID(success: (userFBID: string) => void): void {
  getExtension((MessengerExtensions: Object): void => {;
    MessengerExtensions.getSupportedFeatures(
      (result: Object) => {
        console.log(result);
      },
      (err: Object) => {
        console.log(err);
      }
    );

    MessengerExtensions.getUserID((uids: Object): void => {
      success(uids.psid);
    }, function error(err, errorMessage) {
      // doesn't work on desktop so use context
      MessengerExtensions.getContext(
        '1833481820212349', // app_id
        (result: Object) => {
          console.log(result.psid);
          success(result.psid);
        },
        (err: Object) => {
          console.log(err);
        }
      );

    });
  });
}

function closeWebView(): void {
  const MessengerExtensions = require('MessengerExtensions');
  const isSupported = MessengerExtensions.isInExtension();

  if (isSupported) {
    MessengerExtensions.requestCloseBrowser(function success() {}, function error(err) {});
  } else {
    window.close();
  }
}

function storeUserToken(id: string): void {
  _setCookie('u', id, 28);
}

function getUserToken(): string {
  return getCookie('u');
}

function _setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

module.exports = {
  closeWebView,
  getUserID,
  isInExtention,
  storeUserToken,
  getUserToken,
};
