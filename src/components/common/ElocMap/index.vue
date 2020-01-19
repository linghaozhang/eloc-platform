<template>
  <div :id="mapId" class="eloc-map"></div>
</template>
<script>
import { getGisParams,setGisParams} from 'api/homePage'
  export default {
    data() {
      return {
        registerState: false
      }
    },
    props:{
      mapId:{
        type:String,
        required:true
      }
    },
    methods: {
      initElocMap(config,mapType) {
        let mapContext = {}
        if(config && mapType){
            mapContext = window.gis.MapFactory.createMap(this.mapId, mapType, config);
            this.$emit('getMapContext', mapContext);
            this.registerMapDbClick();
        }else{
          return getGisParams()
          .then(({msg}) => {
            setGisParams().then(response => {
//              地图配置项
              let config = {};
              if (response.msg && response.msg.centerPointX && response.msg.centerPointY) {
                config.centerX = response.msg.centerPointX;
                config.centerY = response.msg.centerPointY;
              } else {
                config.centerX = msg.centerPointX;
                config.centerY = msg.centerPointY;
              }
              config.zoom = msg.initZoom;
              config.zoomControl = false;
              mapContext = window.gis.MapFactory.createMap(this.mapId, msg.mapType, config);
              this.$emit('getMapContext', mapContext);
              this.registerMapDbClick();
            })
          })
        }
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
        const map = document.querySelector('#'+this.mapId);
        if (!this.registerState) {
          this.registerState = true;
          map.addEventListener('dblclick',  (e)=>{
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