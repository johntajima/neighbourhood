/**
 * Neighbourhood for MLS 
 * by John Tajima
 * a jetpack addon to quickly view MLS listings in Google Maps/Bing Maps
 */

/**
 * table id = "_ctl0_elListingSummary_rptSpecifications"
 * td.PropDetailsSummaryValue:last
 * 
 * */


GoogleURL = "http://maps.google.com";
BingURL   = "http://maps.bing.com";


jetpack.future.import("menu");
jetpack.future.import('selection');

jetpack.menu.context.page.add({
  label: 'View Address in Satellite View',
  command: SatView
});

jetpack.menu.context.page.add({
  label: 'View Address in Street View',
  command: StreetView
});

jetpack.menu.context.page.add({
  label: 'View Address in Birds Eye View',
  command: BirdView
});


/* wanted to get address directly from MLS page but jquery selectors were not working */
function SatView() {
  var params = {
    q : jetpack.selection.text,
    z : 18,
    t : 'k'
  };
  openTab(GoogleURL, params);
};

function StreetView() {
  var params = {
    q : jetpack.selection.text,
    z : 18,
    t : 'h'
  };
  openTab(GoogleURL, params, "&cbp=12,0,,0,5");
};


//  http://www.bing.com/maps/?v=2&where1=&encType=1&style=o
function BirdView() {
  var params = {
    style: 'o',     // bird's eye view
    v: 2,
    encType: 1,
    where1: jetpack.selection.text
  }
  openTab(BingURL, params);
};

function openTab(url, params, options) {
  var src = url + "?" + jQuery.param(params);
  if (options) {
    src += options;
  }
  var tab = jetpack.tabs.open(src);
  tab.focus();
}