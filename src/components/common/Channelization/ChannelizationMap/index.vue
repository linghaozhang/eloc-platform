<template>
  <!-- eloc-ChannelizationMap -->
  <div
    class="eloc-CM-wrapper"
    id="eloc-CM-wrapper"
    @mousewheel="zoomHandler"
    v-drag
  >
    <div class="eloc-CM" id="eloc-CM">
      <div class="eloc-CM-center" :style="`transform:scale(${zoom})`">
        <div
          v-for="i in channelData[0].road"
          :key="i.name"
          :class="'eloc-CM-road ' + cls"
          :style="calcRoadStyle(i.number)"
        >
          <div class="eloc-CM-road-inner">
            <road-tape
              :number="i.number"
              :rri="i.rri"
              :rli="i.rli"
              :median="i.median"
              :sidewalk="i.sidewalk"
              :was="i.was"
              :wal="i.wal"
            />
          </div>
        </div>
        <selector ref="elocChannelSelector" />
      </div>
      <svg class="eloc-CM-svg-road" v-for="(i,n) in svgData" :key="n">
        <path
          :d="'M '+i.px1+' '+i.py1+' '+i.px5+' '+i.py5+' C '+i.px2+' '+i.py2+' '+i.px3+' '+i.py3+' '+i.px6+' '+i.py6+' '"
          stroke="#ffffff"
          fill="none"
          style="stroke-width: 3px;"
        />
        <path
          :d="'M '+i.px6+' '+i.py6+ ' '+i.px4+ ' '+i.py4 "
          stroke="#ffffff"
          fill="none"
          style="stroke-width: 3px;"
        />
      </svg>
    </div>
  </div>
</template>
<script>
import { calcRoadStyle, getImportAnchor, getExitAnchor ,addImportLaneNum} from "utils/utils";
import { mapGetters } from "vuex";
import RoadTape from "../RoadTape";
import Selector from "../Selector";
export default {
  name: "eloc-ChannelizationMap",
  components: {
    RoadTape,
    Selector
  },
  data() {
    return {
      cls: "",
      zoom: 0.93,
    };
  },
  directives: {
    drag: {
      // 拖拽指令的定义
      bind: (el)=>{
        el.onmousedown = (e)=>{
          let disx = e.pageX - el.offsetLeft;
          let disy = e.pageY - el.offsetTop;
          el.onmousemove = (ev)=> {
            el.style.left = ev.pageX - disx + "px";
            el.style.top = ev.pageY - disy + "px";
          };
          el.onmouseup = ()=> {
            el.onmouseup = el.onmousemove = null;
          };
          e.preventDefault();
        };
      }
    }
  },
  computed: {
    ...mapGetters(["svgData", "channelData"])
  },
  methods: {
    calcRoadStyle,
    getExitAnchor,
    getImportAnchor,
    addImportLaneNum,
    adaptiveSize() {
      const road = this.channelData[0].road;
      for (let i = 0; i < road.length; i++) {
        const item = road[i];
        if (item.number !== 0 && item.number % 2 !== 0) {
          if (road[i - 1].rli.length > 4 || road[i + 1].rri.length > 4) {
            this.cls = "eloc-CM-long-road";
          }
        }
      }
      this.repaintSVG();
    },
    repaintSVG() {
      this.$nextTick(() => { 
        let channelData = [...this.$store.state.channelization.channelData];
        this.$store.dispatch("channelization/setRoadPosition", {
          roadPosition: []
        });
        channelData[0].road.forEach(i => {
          this.getExitAnchor(i.number);
          this.getImportAnchor(i.number);
        });
      });
    },
    zoomHandler(e) {
      e.preventDefault();
      let zoom = this.zoom;
      e.deltaY > 0 ? (zoom -= 0.03) : (zoom += 0.03);
      if(zoom<0.3 || zoom >3){
        return false
      }
      this.zoom = zoom;
      this.repaintSVG();
    },
    
  },
  mounted() {
    this.adaptiveSize();
    this.addImportLaneNum();
  }
};
</script>
<style lang="less">
@import "index";
</style>