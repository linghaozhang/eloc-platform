<template>
  <div id="eloc-map"></div>
</template>
<script>
  export default {
    data() {
      return {
        registerState: false
      }
    },
    methods: {
      initElocMap(config, type = 'Baidu') {
        const mapContext = window.gis.MapFactory.createMap('eloc-map', type, config);
        window.gis.latLngs2Wkt = this.latLngs2Wkt;
        this.registerMapDbClick();
        this.$emit('getMapContext', mapContext);
      },
      latLngs2Wkt(type, lonlats) {
        let wktStr = '';
        if ("point" == type.toLowerCase()) {
          wktStr += "POINT(" + lonlats.lng + " " + lonlats.lat + ")";
        } else if ("polyline" == type.toLowerCase()) {
          wktStr += "LINESTRING(";
          for (let i = 0; i < lonlats.length; i++) {
            wktStr += lonlats[i].lng + " " + lonlats[i].lat;
            if (i != lonlats.length - 1) wktStr += ",";
          }
          wktStr += ")";
        } else if ("polygon" == type.toLowerCase()) {
          wktStr += "POLYGON((";
          for (let j = 0; j < lonlats.length; j++) {
            wktStr += lonlats[j].lng + " " + lonlats[j].lat;
            wktStr += ",";
          }
          wktStr += lonlats[0].lng + " " + lonlats[0].lat;
          wktStr += "))";
        }
        return wktStr;
      },
      registerMapDbClick() {
        const map = document.querySelector('#eloc-map');
        if (!this.registerState) {
          this.registerState = true;
          map.addEventListener('dblclick',  (e)=>{
            console.log(e);
            if(e.target.nodeName === 'path'){
              this.$emit('mapDbClick');
            }
          },false)
        }
      }
    }
  }
</script>
<style lang="less">
  @import 'index';
</style>