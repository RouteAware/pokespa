/* Meta Pixel — Recursis shared pixel. The ID lives ONLY in this file; every page loads it from <head>.
   Guard: with the placeholder still in place this file is a no-op, so previews are safe to ship.
   LDU = Meta "Limited Data Use" with geo-detection, so California visitors get CCPA-restricted processing.
   Opt-out: the pixel does NOT load when the visitor has pressed "Do Not Sell or Share" on /privacy
   (localStorage recursis_pixel_optout=1) or when the browser sends Global Privacy Control.
   Keep this file byte-identical across every Recursis site. */
(function () {
  var ID = '2211437245831748';
  if (!/^\d{14,17}$/.test(ID)) return;
  try { if (window.localStorage && localStorage.getItem('recursis_pixel_optout') === '1') return; } catch (e) {}
  if (navigator.globalPrivacyControl === true) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('dataProcessingOptions', ['LDU'], 0, 0);
  fbq('init', ID);
  fbq('track', 'PageView');
})();
