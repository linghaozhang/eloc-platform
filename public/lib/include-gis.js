(function (window) {
  var r = new RegExp("(^|(.*?\\/))(include-gis\.js)(\\?|$)"),
      s = document.getElementsByTagName('script'), gisLibPath="";
  for (var i = 0; i < s.length; i++) {
      var src = s[i].getAttribute('src');
      if (src) {
          var m = src.match(r);
          if (m) {
              gisLibPath=src.replace("include-gis.js","");
              break;
          }
      }
  }
  function inputScript(url) {
      var script = '<script type="text/javascript" src="' +gisLibPath+ url + '"><' + '/script>';
      document.writeln(script);
  }

  function inputCSS(url) {
      var css = '<link rel="stylesheet" href="' +gisLibPath+ url + '">';
      document.writeln(css);
  }

  function inArray(arr, item) {
      for (i in arr) {
          if (arr[i] == item) {
              return true;
          }
      }
      return false;
  }

  //加载类库资源文件
  function load() {
      inputCSS("ehlgis.css");
      inputCSS("lib/leaflet/leaflet.css");
      // inputCSS("lib/leaflet.label.css");
      inputCSS("lib/leaflet.iconlabel.css");
      inputCSS("lib/leaflet-measure-path.css");
if(!window.jQuery)
        inputScript("lib/jquery-1.9.1.min.js");
      inputScript("lib/leaflet/leaflet.js");
      inputScript("lib/L.Tianditu.WMTS.js");
      inputScript("lib/leaflet/esri-leaflet.js");
      inputScript("lib/leaflet/proj4.js");
      inputScript("lib/leaflet/proj4leaflet.js");
      inputScript("lib/leaflet.ChineseTmsProviders.js");
      inputScript("lib/Leaflet.Marker.SlideTo.js");
      inputScript("lib/leaflet-measure-path.js");
      inputScript("lib/Leaflet.Editable2.js");
      inputScript("lib/leaflet.markercluster-src.js");
      inputScript("lib/mapv.js");
      // inputScript("lib/leaflet.label.js");
      inputScript("lib/leaflet.iconlabel.js");
      inputScript("ehlgis.min.js");
      inputScript("config.js");
      window.isGisLoaded=true;
  }

  load();
  // window.isLocal = true;
  // window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : 'http://' + document.location.host;
})(window);