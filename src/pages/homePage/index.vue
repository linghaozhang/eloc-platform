<template>
  <div class="home">
    <eloc-map
            @getMapContext="getMapContext"
            @mapDbClick="getCrossInfoBySpatialSearch"
            ref="elocMap"
    />
    <div class="home-search-box">
      <eloc-search-box
              @clear="clearSearch"
              @search="onSearch"
              @nodeClick="handleNodeClick"
              :treeData="treeData"
              :showDropDown="showDropDown"
              :defaultProps="defaultProps"
      />
    </div>
    <div class="home-map-tool">
      <el-button-group>
        <el-button @click="raning">
          <i class="ehlfont ehl-ceju"></i> 测距
        </el-button>
        <el-button @click="areaSelect">
          <i class="ehlfont ehl-kuangxuan1"></i> 框选
        </el-button>
        <el-button @click="onBatch">
          <i class="ehlfont ehl-liebiaozhanshi"></i> 批量
        </el-button>
      </el-button-group>
    </div>
    <div class="home-map-legend">
      <a-dropdown overlayClassName="home-map-legend-dropdown" :trigger="['click']">
        <a-menu slot="overlay">
          <a-menu-item v-for="(i,n) in legentImg " :key="n">
            <img :src="i.src" alt=""/>
            {{i.desc}}
          </a-menu-item>
        </a-menu>
        <a-button class="home-map-legend-btn">
          <img :src="legentImg[0].src" alt=""/>
          图 例
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>
    <!--框选弹出层-->
    <a-modal
            title="框选"
            v-model="areaSelectVisible"
            :footer="null"
            class="home-areaSelect-modal"
            :centered="true"
    >
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="统计和控制" key="1">
          <a-spin :spinning="controllerSpinning">
            <div class="home-areaSelect-modal-tbas-container">
              <div class="statistics">
                <div>信号机总数：{{statistics.totalSlcCount}}</div>
                <div>在线-现场手动：{{statistics.localManualCount}}</div>
                <div>在线-中心手动：{{statistics.centerManualCount}}</div>
                <div>在线-特勤：{{statistics.vipCount}}</div>
                <div>在线-自适应：{{statistics.adaptiveCount}}</div>
                <div>在线-固定配时：{{statistics.todCount}}</div>
                <div>在线-感应控制：{{statistics.inductionCount}}</div>
                <div>脱机：{{statistics.offLineCount}}</div>
                <div>异常：{{statistics.errorCount}}</div>
              </div>
              <div class="line"></div>
              <div class="controller">
                <a-button-group>
                  <a-button type="danger" @click="controllerMode('1','全红')">全红</a-button>
                  <a-button class="yellow" @click="controllerMode('2','黄闪')">黄闪</a-button>
                  <a-button @click="controllerMode('3','关灯')">关灯</a-button>
                </a-button-group>
                <a-button-group>
                  <a-button type="primary" @click="controllerMode('5','固定配时')">固定配时</a-button>
                  <a-button type="primary" @click="controllerMode('6','感应控制')">感应控制</a-button>
                </a-button-group>
                <a-button-group>
                  <a-button type="primary" @click="controllerMode('8','方案上传')">方案上传</a-button>
                  <a-button type="primary" @click="controllerMode('4','禁止现场手动')">禁止现场手动</a-button>
                </a-button-group>
                <a-button type="primary" @click="controllerMode('9','解除禁止现场手动')">解除禁止现场手动</a-button>
              </div>
            </div>
          </a-spin>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
    <!--批量弹出层-->
    <a-modal
            title="批量操作"
            class="home-batch-modal"
            v-model="batchVisible"
            :centered="true"
            :width="720"
            cancelText="关闭"
            okText="确认批量操作"
            @ok="confirmBatch"
            :destroyOnClose="true"
    >
      <a-spin :spinning="batchSpinning">
        <div class="home-batch-modal-content">
          <div class="batch-operation-title">操作类型</div>
          <div class="batch-operation-type-content">
            <a-radio-group v-model="batchRadio">
              <a-radio :value="1">全红</a-radio>
              <a-radio :value="2">黄闪</a-radio>
              <a-radio :value="3">关灯</a-radio>
              <a-radio :value="5">固定配时</a-radio>
              <a-radio :value="6">感应控制</a-radio>
              <a-radio :value="8">方案上传</a-radio>
              <a-radio :value="4">禁止现场手动</a-radio>
              <a-radio :value="9">解除禁止现场手动</a-radio>
            </a-radio-group>
          </div>
          <div class="batch-operation-title">操作对象</div>
          <div class="batch-operation-object-content">
            <a-input-search
                    style="width:280px"
                    placeholder="请选择或输入信号机所属道路名称"
                    @search="onBatchSearch"
                    enterButton
            />
            <div class="batch-operation-object-transfer">
              <div class="batch-operation-object-transfer-tree">
                <el-tree
                        :data="batchTreeData"
                        :props="defaultProps"
                        show-checkbox
                        highlight-current
                        ref="batchTree"
                >
                  <span class="custom-tree-node" slot-scope="{ node }">
                    <img v-if="node.data.img" class="custom-tree-node-img" :src="switchMarkerImg(node.data.img)"
                         alt=""/>
                    <span>{{ node.label }}</span>
                  </span>
                </el-tree>
              </div>
              <div class="batch-operation-object-transfer-btn">
                <a-button block
                          @click="batchMoveRight"
                          type="primary"
                          shape="circle"
                          icon="right"
                          style="margin-bottom:15px"
                />
                <a-button block
                          @click="batchMoveLeft"
                          shape="circle"
                          icon="left"
                />
              </div>
              <div class="batch-operation-object-transfer-result">
                <a-checkbox-group @change="batchCheckListChange">
                  <div
                          v-for="i in batchSelectList"
                          :key="i.key"
                          style="height:21px;margin-bottom:7px;"
                  >
                    <a-checkbox :value="i.key">{{i.title}}</a-checkbox>
                  </div>
                </a-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
  import {ElocMap, ElocSearchBox} from 'components/common'
  import {
    getGisParams,
    setGisParams,
    getCrossList,
    getCrossTimingPlan,
    getCrossInfoByFuzzySearch,
    getCrossInfoBySpatialSearch,
    getCrossInfo,
    setBatchOperation,
  } from 'api/homePage'
  import {addSocketSubscribe} from 'api'
  import {
    switchMarkerImg,
    getCrossControlMode,
    conversionTreeData,
    randomGuid,
    transferOperationDesc
  } from 'utils/utils'
  import {xxbh} from 'utils/constant'
  import {TC01, TC02, TC03, TC04, TC05, TC06, TC07, TC10} from 'utils/constant'

  export default {
    name: 'homePage',
    data() {
      return {
//        地图实例
        mapContext: null,
//        地图图例
        legentImg: [
          {src: TC01, desc: '定周期'},
          {src: TC02, desc: '感应控制'},
          {src: TC03, desc: '特勤控制'},
          {src: TC04, desc: '中心手动'},
          {src: TC05, desc: '现场手动'},
          {src: TC06, desc: '自适应'},
          {src: TC07, desc: '异常'},
          {src: TC10, desc: '脱机'}
        ],
//        树结构数据
        treeData: [],
//        树结构下拉容器展示状态
        showDropDown: false,
//        搜索关键字（双向绑定）
        searchKey: '',
//        treeData组件默认属性
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        crossList: [],
//        框选工具箱
        areaSelectContainer: {
//        测距工具容器
          measureTool: null,
//        测距工具初始化状态
          measureStatus: null,
//        框选新建框选画图实例
          drawTool: null,
//        记录框选状态 true 正在框选
          drawState: true,
//          框选对象
          searchPolygon: null,
//          框选的wkt 分页时使用
          wkt: null,
          handler4Draw: null,
          crossNoList: [],
          slcTypeList: []
        },
        areaSelectVisible: false,
//        框选后的统计展示
        statistics: {},
//        批量弹出层显隐控制
        batchVisible: false,
//        批量单选绑定值
        batchRadio: '',
//        批量树状图数据容器
        batchTreeData: [],
//        框选后操作时的loading
        controllerSpinning: false,
//        批量向右移动选择路口储存容器
        batchSelectList: [],
//        批量向左移动删除路口储存容器
        removeBatchCheckList: [],
//        批量操作时的loading
        batchSpinning: false
      }
    },
    components: {
      ElocMap,
      ElocSearchBox
    },
    mounted() {
      this.initMapConfiguration();
    },
    methods: {
      getMapContext(mapContext) {
        this.mapContext = mapContext
      },
      initMapConfiguration() {
        getGisParams()
          .then(res => res.msg)
          .then((msg) => {
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
              this.$refs.elocMap.initElocMap(config, msg.mapType);
              this.getCrossList().then(() => {
                addSocketSubscribe('/exchange/UTC/UTC_SLC_CONTROL',this.subscribeCallBack)
              });
            })
          })
      },
      subscribeCallBack(msg) {
        if (msg.body) {
          this.crossList.forEach(i => {
            if(i.crossNo === msg.body.crossNo){
              i.controlMode = msg.body.controlMode
            }
          });
          this.setMaker(this.crossList)
        }
      },
      getCrossList() {
        return getCrossList().then(res => {
          this.crossList = res.msg;
          this.setMaker(res.msg)
        })
      },
//      绘制地图标记
      setMaker(crossList) {
        crossList.forEach((i, n) => {
          const title = `${i.crossId}-${i.crossName}`;
          const x = parseFloat(i.pointx);
          const y = parseFloat(i.pointy);
          const marker = window.gis.OverlayUtil.createMarker(x, y, null, {
            imgUrl: switchMarkerImg(i.controlMode).p,
            title,
            draggable: false,
            iconSize: [32, 44]
          });
          marker.positionIndex = n;
          marker.crossId = i.crossId;
          marker.crossName = i.crossName;
          marker.division = i.division;
          marker.crossNo = i.crossNo;
          marker.controlModeName = getCrossControlMode(i.controlMode);
          this.mapContext.addLayer(marker);
          window.gis.OverlayUtil.bindEvt(marker, "mouseover", (e) => this.showCrossInfoPopu(e, i.crossNo));
        })
      },
//      写入鼠标移入事件
      showCrossInfoPopu(e, crossNo) {
        const {crossId, crossName, controlModeName} = e.target;
        window.gis.OverlayUtil.closePopup(e.target);
        window.gis.OverlayUtil.unbindPopup(e.target);
        getCrossTimingPlan({crossNo: crossNo, planNo: '0'}).then(res => {
          if (res.result === false) {
            return
          }
          const {timingPlanInfo} = res.msg;
          let timePlan = '';
          let cycle = 0;
          timingPlanInfo.forEach((i, n) => {
            timePlan += xxbh[n] + ':' + (parseInt(i.green) + parseInt(i.yellow) + parseInt(i.allRed)) + 's, ';
            cycle += (parseInt(i.green) + parseInt(i.yellow) + parseInt(i.allRed)) + 's';
          });
          let html = `<div  class="map-pop2">
                        <div><span>路口名称：</span><span>${crossId} - ${crossName}</span></div>
                        <div><span>路口状态：</span><span>${controlModeName}</span></div>
                        <div><span>相阶配时：</span><span>${timePlan}</span></div>
                        <div><span>方案周期：</span><span>${cycle}</span></div>
                      </div>`;
          window.gis.OverlayUtil.bindPopup(e.target, html, {
            offset: [16, 16],
            closeButton: false
          });
          window.gis.OverlayUtil.openPopup(e.target);
        })
      },
      onSearch(key) {
        const params = {crossInfo: key};
        getCrossInfoByFuzzySearch(params).then(res => {
          if (res.code !== 0) {
            return false
          }
          this.treeData = conversionTreeData(res.msg);
          this.showDropDown = true;
        })
      },
      handleNodeClick(data) {
        console.log(data);
      },
      clearSearch() {
        this.showDropDown = false;
      },
//      测距
      raning() {
        if (!this.measureTool) {
          this.measureTool = new window.gis.MeasureTool(this.mapContext)
        }
        if (this.measureDisStatus) {
          this.measureTool.clearLineLayer();
          this.measureDisStatus = false;
        } else {
          this.measureTool.measureDistance();
          this.measureDisStatus = true;
        }
      },
//      框选点击事件
      areaSelect() {
        this.areaSelectContainer.drawState = !this.areaSelectContainer.drawState;
        this.drawPolygonOnMap({}, (polygon) => {
          const polygonPoints = polygon.getLatLngs();
          this.areaSelectContainer.searchType = 'polygon';
          this.mapContext.addLayer(polygon);
          const wkt = window.gis.latLngs2Wkt("polygon", polygonPoints[0]);
          this.areaSelectContainer.wkt = wkt;
          this.getCrossInfoBySpatialSearch(wkt)
        }, null)
      },
//      获取框选实例
      getDrawingTool() {
        if (this.areaSelectContainer.drawTool === null) {
          this.areaSelectContainer.drawTool = new window.gis.DrawingUtil(this.mapContext, {
            polygonOptions: {
              stroke: true, //边线颜色。
              color: "red",
              fill: true,
              fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
              weight: 1, //边线的宽度，以像素为单位。
              opacity: 0.8, //边线透明度，取值范围0 - 1。
              fillOpacity: 0.1
            }
          })
        }
      },
//      绘制框选
      drawPolygonOnMap(_symbol, callback, clickEvt) {
        console.log(_symbol, clickEvt);
        this.getDrawingTool();
        const {drawTool, searchPolygon, handler4Draw, drawState} = this.areaSelectContainer;
        if (drawState) {
          drawTool.close();
          if (searchPolygon) {
            this.mapContext.removeLayer(searchPolygon);
            this.areaSelectContainer.searchPolygon = null
          }
          return false
        }
        if (handler4Draw) {
          drawTool.removeCallback();
        }
        this.areaSelectContainer.handler4Draw = (polygon) => {
          this.areaSelectContainer.drawTool.close();
          this.areaSelectContainer.searchPolygon = polygon;
          callback(polygon)
        };
        drawTool.setDrawingMode("polygon");
        drawTool.addCallback(this.areaSelectContainer.handler4Draw);
        drawTool.open();
      },
      getCrossInfoBySpatialSearch() {
        const {wkt} = this.areaSelectContainer;
        getCrossInfoBySpatialSearch({wkt}).then(res => {
          if (res.code === 0) {
            this.areaSelectVisible = true;
            const {spatialCountData, crossInf} = res.msg;
            this.statistics = {
              ...spatialCountData,
              errorCount: parseInt(spatialCountData.cannotPingCount) + parseInt(spatialCountData.cannotConnectCount)
            };
            this.areaSelectContainer.crossNoList = spatialCountData.crossNoList;
            this.areaSelectContainer.slcTypeList = [];
            if (crossInf.length) this.setMaker(crossInf);
            return spatialCountData.crossNoList
          }
        }).then((crossNoList) => {
//          TODO getCrossInfo应改为支持列表请求
          if (crossNoList.length) {
            crossNoList.forEach(i => {
              getCrossInfo({crossNo: i}).then(res => {
                this.areaSelectContainer.slcTypeList.push(res.msg.slcKind)
              })
            })
          }
        })
      },
      controllerMode(type, text) {
        const {crossNoList, slcTypeList} = this.areaSelectContainer;

        if (crossNoList.length === 0) return this.$error({title: '请选择操作对象'});
        const synchroGuid = randomGuid();
        let params = {
          controlType: type,
          crossNoList,
          slcTypeList,
          synchroGuid
        };
        type === '6' ? params.actuFun = '1' : params.actuFun = '0';
        this.controllerSpinning = true;
        setBatchOperation(params).then(res => {
          this.controllerSpinning = false;
          if (res.code === 1) {
            this.$success({title: `${text} 执行成功`})
          }
        });
      },
      onBatch() {
        this.onBatchSearch('');
        this.batchVisible = true;
        this.batchSelectList = []
      },
      onBatchSearch(key) {
        const params = {crossInfo: key};
        getCrossInfoByFuzzySearch(params).then(res => {
          if (res.code !== 0) {
            return false
          }
          this.batchTreeData = conversionTreeData(res.msg);
        })
      },
      switchMarkerImg(src) {
        return switchMarkerImg(src).t
      },
      batchMoveRight() {
        this.batchSelectList = this.$refs.batchTree.getCheckedNodes().filter(i => !i.children);
      },
      batchMoveLeft() {
        const cache = this.batchSelectList.filter((i) => this.removeBatchCheckList.indexOf(i.key) === -1);
        this.batchSelectList = [...cache]
      },
      batchCheckListChange(v) {
        this.removeBatchCheckList = [...v];
      },
      confirmBatch() {
        if (!this.batchRadio) {
          return this.$error({title: '请选择操作类型'})
        }
        if (this.batchSelectList.length === 0) {
          return this.$error({title: '请选择操作对象'})
        }
        const content = `执行${this.batchSelectList.map(i => i.title)}的 ${ transferOperationDesc(this.batchRadio)} 操作`;
        this.$confirm({
          title: '是否执行以下操作？',
          content,
          onOk: this.onConfirmBatchOk,
          okText: '确定',
          cancelText: '取消'
        })
      },
      onConfirmBatchOk() {
        this.batchSpinning = true;
        let params = {
          controlType: this.batchRadio,
          actuFun: this.batchRadio === '6' ? '1' : '0',
          synchroGuid: randomGuid(),
          crossNoList: this.batchSelectList.map(i => i.crossNo)
        };
//          TODO getCrossInfo应改为支持多列表上传
        Promise.all(params.crossNoList.map(i => getCrossInfo({crossNo: i})))
          .then(res => {
            if (res.indexOf(false) !== -1) {
              return false
            }
            params.slcTypeList = res.map(i => i.msg.slcKind)
            return true
          })
          .then((f) => {
            if (f) {
              const text = transferOperationDesc(this.batchRadio);
              setBatchOperation(params).then(res => {
                if (res.code === 1) this.$success({title: `${text} 执行成功`})
              });
            }
            this.batchSpinning = false;
          })
      },
    }
  }
</script>
<style lang="less">
  @import 'index';
</style>
