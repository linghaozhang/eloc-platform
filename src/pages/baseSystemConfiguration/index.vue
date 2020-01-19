<template>
  <div class="baseSysConfig">
    <a-tabs defaultActiveKey="timeMap">
      <a-tab-pane tab="校时/地图" key="timeMap">
        <timeMap />
      </a-tab-pane>
      <a-tab-pane tab="告警提示" key="warnTip" forceRender>
        <warnTip />
      </a-tab-pane>
      <a-tab-pane tab="服务监控" key="serviceMonitor" forceRender>
        <serviceMonitor />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import timeMap from "./timeMap";
import warnTip from "./warnTip";
import serviceMonitor from "./serviceMonitor";

export default {
  components: {
    timeMap,
    warnTip,
    serviceMonitor
  }
};
</script>
<style lang="less">
@import "index";
</style>