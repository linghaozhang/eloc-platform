<template>
  <div class="road-map">
    <div>
      <a-checkbox value="1">
      </a-checkbox>
      <div class="road-map-item">
        <a-form layout="inline" class="road-map-item-form">
          <a-form-item label="路线名称">
            <a-input
                    style="width:160px"
                    value="vipName"
                    readonly
                    size="small"
            />
          </a-form-item>
          <a-form-item label="路线级别">
            <a-input
                    style="width:160px"
                    value="一级"
                    size="small"
                    readonly
            />
          </a-form-item>
          <a-form-item label="路线长度">
            <a-input
                    style="width:160px"
                    value="500m"
                    readonly
                    size="small"
            />
          </a-form-item>
          <a-form-item label="路线执行时间">
            <a-input
                    size="small"
                    style="width:160px"
                    value="2019-12-31 00:00:00"
                    readonly
            />
          </a-form-item>
        </a-form>
        <div class="road-map-line-container-fixed">
          <div class="road-map-line-container" >
            <div class="road-map-line">
              <div class="road-map-line-cross" @click.stop="handleClick">
                <div class="se-flag">
                  <a-badge status="success" />
                </div>
              </div>
              <div class="road-map-line-road">
                <span>500m</span>
              </div>
              <div class="road-map-label">
                1006-津港公路与外环南路交口
              </div>
            </div>
            <div class="road-map-line">
              <div class="road-map-line-cross">
                <div class="se-flag">
                  <a-badge status="success" />
                </div>
              </div>
              <div class="road-map-line-road">
                <span>500m</span>
              </div>
              <div class="road-map-label">
                1006-津港公路与外环南路交口
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods:{
      handleClick(e){
        e.stopPropagation();
      }
    }
  }
</script>
<style lang="less">
  @import 'index';
</style>