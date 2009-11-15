/**
 * Neighbourhood for MLS 
 * by John Tajima
 * a jetpack addon to quickly view MLS listings in Google Maps/Bing Maps
 */

/**
 * MLS table elements
 * table id = "_ctl0_elListingSummary_rptSpecifications"
 * div.PropDetailsSummaryValue:last
 * 
 * jquery selectors aren't working though...need access to API docs
 * */
 
GoogleURL = "http://maps.google.com";
BingURL   = "http://maps.bing.com";


jetpack.future.import("menu");
jetpack.future.import('selection');

jetpack.menu.context.page.beforeShow = function(menu, context) {
  var target = "View Address '"+jetpack.selection.text+ "'";
  var newmenu = {
    label: target,
    menu: new jetpack.Menu([
      { label: 'Google Sat. View',
        icon: "http://www.google.com/favicon.ico",
        command: SatView
      },
      { label: 'Google Street View',
        icon: "http://www.google.com/favicon.ico",
        command: StreetView
      },
      { label: "Bing Bird's Eye View",
        icon: "http://www.bing.com/favicon.ico",
        command: BirdView
      }
    ])
  };
  menu.reset();
  if (jetpack.selection.text) { jetpack.menu.context.page.add(newmenu); }
}; 


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