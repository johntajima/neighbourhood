/**
 * Neighbourhood for Addresses 
 * by John Tajima
 * http://github.com/redronin/neighbourhood
 *
 * a jetpack addon to quickly view Addresses in Google Maps/Bing Maps
 */

GoogleURL = "http://maps.google.com";
BingURL   = "http://maps.bing.com";

jetpack.future.import("menu");
jetpack.future.import('selection');

jetpack.menu.context.page.beforeShow = function(menu, context) {
  menu.reset();
  if (jetpack.selection.text) {
    jetpack.menu.context.page.add({
      label: "View Address '"+jetpack.selection.text+ "'",
      menu: new jetpack.Menu([ { label: 'Google Sat. View', icon: "http://www.google.com/favicon.ico", command: SatView },
                               { label: 'Google Street View', icon: "http://www.google.com/favicon.ico", command: StreetView },
                               { label: "Bing Bird's Eye View", icon: "http://www.bing.com/favicon.ico", command: BirdView } ])
    });
  }
}; 

function SatView() { 
  openTab(GoogleURL, { t: 'k', z: 18, q: jetpack.selection.text } );
};

function StreetView() {
  var url = GoogleURL + "/maps/geo?"+jQuery.param({q:jetpack.selection.text});
  $.getJSON(url, function(response){
    try {
      var lat = response.Placemark[0].Point.coordinates[0];
      var lng = response.Placemark[0].Point.coordinates[1];
      openTab(GoogleURL, { t: 'k', z:18,  layer: 'c', q: jetpack.selection.text}, "&cbp=12,0,,0,5&cbll="+[lng,lat]);
    } catch(e) {
      jetpack.notifications.show("Sorry, could not determine address for '"+jetpack.selection.text+"'");
    }
  });
};

// apparently some addresses don't work, and I need a scene id for each one.
function BirdView() {
  openTab(BingURL, { style: 'b', v: 2, encType: 1, where1: jetpack.selection.text });
};

function openTab(url, params, options) {
  var src = url + "?" + jQuery.param(params);
  if (options) { src += options; }
  var tab = jetpack.tabs.open(src);
  tab.focus();
}