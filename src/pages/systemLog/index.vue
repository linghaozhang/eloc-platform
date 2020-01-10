<template>
  <div class="systemLog">
    <a-tabs defaultActiveKey="warnLog">
      <a-tab-pane tab="告警日志" key="warnLog">
        <warn-log />
      </a-tab-pane>
      <a-tab-pane tab="操作日志" key="operationLog" forceRender>
        <operation-log />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import warnLog from "./warnLog"
import operationLog from "./operationLog"
export default {
  name: "systemLog",
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    warnLog,
    operationLog
  }
};
</script>
<style lang="less">
@import "index";
</style>
