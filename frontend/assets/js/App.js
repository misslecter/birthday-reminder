export class App {
  async init() {

    console.log('Init');

    this.initFacebookLogin();
  }

  initFacebookLogin() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '307250724061619',
        cookie: true,
        xfbml: true,
        version: 'v0.1'
      });

      FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
