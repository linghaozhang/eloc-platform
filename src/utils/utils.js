import {
  PC01,
  PC02,
  PC03,
  PC04,
  PC05,
  PC06,
  PC07,
  PC08,
  PC09,
  PC10,
  TC01,
  TC02,
  TC03,
  TC04,
  TC05,
  TC06,
  TC07,
  TC08,
  TC09,
  TC10,
  channelDataTmp
} from "./constant";
import {
  left,
  right,
  slr,
  leftRear,
  leftRight,
  rear,
  straight,
  straLeft,
  straRear,
  straRight
} from "./constant";
import store from "store";

/**
 * tabs路由组件替换方法,可模拟路由跳转
 *
 * @param to 跳转路由
 * @param params 跳转路由携带数据
 *
 */
export const routeCompReplace = (to, params) => {
  let panes = [...store.state.appMain.panes];
  const { activeKey } = store.state.appMain;
  panes.forEach(i => {
    if (i.key === activeKey) {
      i.component = to;
      if (params) i.params = params;
    }
  });
  store.dispatch("appMain/createPanes", { panes });
};

/**
 * 获取tabs路由组件替换跳转后携带数据方法
 *
 */
export const getRouteCompParams = () => {
  let panes = [...store.state.appMain.panes];
  const { activeKey } = store.state.appMain;
  let params;
  panes.forEach(i => {
    if (i.key === activeKey) {
      params = i.params;
    }
  });
  return params;
};

export const createNewTabData = tabName => {
  let title = "";
  switch (tabName) {
    case "homePage":
      title = "首页";
      break;
    case "specialService":
      title = "特勤管理";
      break;
    case "intersectionWorkbench":
      title = "路口工作台";
      break;
    case "schemeCustomization":
      title = "方案定制";
      break;
    case "subareaScheme":
      title = "子区管理";
      break;
    case "log":
      title = "运行记录";
      break;
    case "baseIntersectionWorkbench":
      title = "路口工作台（基础版）";
      break;
    case "trunkLineCoordinate":
      title = "干线协调";
      break;
    case "ODSituation":
      title = "OD态势";
      break;
    case "trafficContrast":
      title = "交通对比";
      break;
    case "dataAnalysis":
      title = "数据分析";
      break;
    case "pointEquipment":
      title = "点位设备";
      break;
    case "systemLog":
      title = "系统日志";
      break;
    case "roadTopology":
      title = "路网拓扑";
      break;
    case "baseRoadTopology":
      title = "路网拓扑";
      break;
    case "systemConfiguration":
      title = "系统配置";
      break;
    case "baseSystemConfiguration":
      title = "系统配置";
      break;
    default:
      title = "首页";
  }
  return {
    title: title,
    component: tabName,
    key: tabName
  };
};

export const createIconType = id => {
  switch (id) {
    //homePage
    case "305100":
      return "home";
    // 基础版homepage
    case "309100":
      return "home";
    // 特勤
    case "305200":
      return "user";
    // 基础版特勤
    case "309200":
      return "user";
    // 方案管理
    case "305300":
      return "file-text";
    // 基础版方案管理
    case "309300":
      return "file-text";
    // 分析研判
    case "305400":
      return "deployment-unit";
    // 优化BOX
    case "305500":
      return "laptop";
    // 系统管理
    case "305600":
      return "setting";
    // 基础版系统管理
    case "309600":
      return "setting";
  }
};

// 设置登录cookies
export const setCookie = (name, value) => {
  document.cookie = name + "=" + value;
};

export const switchMarkerImg = mode => {
  switch (mode) {
    case "C01":
      return { p: PC01, t: TC01 };
    case "C02":
      return { p: PC02, t: TC02 };
    case "C03":
      return { p: PC03, t: TC03 };
    case "C04":
      return { p: PC04, t: TC04 };
    case "C05":
      return { p: PC05, t: TC05 };
    case "C06":
      return { p: PC06, t: TC06 };
    case "C07":
      return { p: PC07, t: TC07 };
    case "C08":
      return { p: PC08, t: TC08 };
    case "C09":
      return { p: PC09, t: TC09 };
    case "C10":
      return { p: PC10, t: TC10 };
    default:
      return { p: "", t: "" };
  }
};

export const getCrossControlMode = data => {
  let msg = "";
  switch (data) {
    case "C01":
      msg = "定周期";
      break;
    case "C02":
      msg = "感应控制";
      break;
    case "C03":
      msg = "特勤控制";
      break;
    case "C04":
      msg = "中心手动";
      break;
    case "C05":
      msg = "现场手动";
      break;
    case "C06":
      msg = "自适应";
      break;
    case "C07":
      msg = "异常";
      break;
    case "C08":
      msg = "异常";
      break;
    case "C09":
      msg = "异常";
      break;
    case "C10":
      msg = "脱机";
      break;
  }
  return msg;
};

export const conversionTreeData = (data, cur = "division") => {
  // 默认按division字段分类数据
  let cache = [];
  data.forEach(i => {
    if (cache.indexOf(i[cur]) === -1) cache.push(i[cur]);
  });
  return cache.map((i, n) => {
    let treeData = {
      title: i,
      key: `parent${n}`,
      children: [],
      img: false
    };
    data.forEach(ii => {
      if (ii[cur] === i) {
        treeData.children.push({
          title: `${ii.crossId}-${ii.crossName}`,
          key: ii.crossId,
          img: ii.controlMode,
          crossNo: ii.crossNo,
          parent: `parent${n}`
        });
      }
    });
    return treeData;
  });
};

export const randomGuid = (len = 32) => {
  const $chars = "abcdefhijkmnprstwxyz12345678";
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I****/
  const maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 获取 CCU 错误码信息
 *
 * @param data
 * @returns {string}
 */
export const getErrorMsg = data => {
  let msg = "";
  switch (data) {
    case 0:
      msg = "success";
      break;
    case 1:
      msg = "error";
      break;
    case 10000:
      msg = "NoMessage";
      break;
    case 10001:
      msg = "UnableToRespondToData";
      break;
    case 10002:
      msg = "InvalidParameter";
      break;
    case 10003:
      msg = "InvalidParameterCount";
      break;
    case 10004:
      msg = "路口信号机 Ping 不通";
      break;
    case 10005:
      msg = "路口信号机无法连接";
      break;
    case 10006:
      msg = "请求超时";
      break;
    case 10007:
      msg = "CCU 无此协议";
      break;
    case 10008:
      msg = "路口信号机处于脱机状态";
      break;
    case 10009:
      msg = "路口信号机执行定周期时失败";
      break;
    case 10010:
      msg = "CarFlowOutOfSize";
      break;
    case 999:
      msg = "请求CCU出现异常";
      break;
  }
  return msg;
};

export const transferOperationDesc = code => {
  code = code + "";
  switch (code) {
    case "1":
      return "全红";
    case "2":
      return "黄闪";
    case "3":
      return "关灯";
    case "5":
      return "固定配时";
    case "6":
      return "感应控制";
    case "8":
      return "方案上传";
    case "4":
      return "禁止现场手动";
    case "9":
      return "解除禁止现场手动";
  }
};
// special service switch level
export const switchLineLevel = n => {
  switch (n) {
    case "1":
      return "一级";
    case "2":
      return "二级";
    case "3":
      return "三级";
  }
};
export const getCrossType = (data, showText = false) => {
  var msg = "";
  switch (data) {
    case "0":
      if (showText) {
        msg = "无";
      } else {
        msg = "";
      }
      break;
    case "1":
      msg = "公交优先";
      break;
    case "5":
      msg = "反溢控制";
      break;
    case "6":
      msg = "排队控制";
      break;
    case "2":
      msg = "行人过街";
      break;
    case "7":
      msg = "紧急控制";
      break;
    case "":
      msg = "";
      break;
  }
  return msg;
};

export const getUserOperType = data => {
  var msg = "";
  switch (data) {
    case "U01":
      msg = "登录";
      break;
    case "U02":
      msg = "注销";
      break;
    case "U11":
      msg = "新增";
      break;
    //case "U12":msg = "查询";break;
    case "U13":
      msg = "编辑";
      break;
    case "U14":
      msg = "删除";
      break;
    //case "U15":msg = "导出";break;
    case "U21":
      msg = "上传";
      break;
    case "U22":
      msg = "下载";
      break;
    case "U23":
      msg = "联机";
      break;
    case "U24":
      msg = "脱机";
      break;
    case "U31":
      msg = "手动";
      break;
    case "U32":
      msg = "校时";
      break;
  }
  return msg;
};

// 路网拓扑 起始路口出口 终止路口进口
export const switchCrossExit = data => {
  let msg = "";
  switch (data) {
    case "0":
      msg = "北";
      break;
    case "2":
      msg = "东";
      break;
    case "4":
      msg = "南";
      break;
    case "6":
      msg = "西";
      break;
    case "1":
      msg = "东北";
      break;
    case "3":
      msg = "东南";
      break;
    case "5":
      msg = "西南";
      break;
    case "7":
      msg = "西北";
      break;
  }
  return msg;
};
// 路网拓扑 路段等级
export const switchCrossLev = data => {
  var msg = "";
  switch (data) {
    case "0001":
      msg = "快速路";
      break;
    case "0002":
      msg = "主干路";
      break;
    case "0003":
      msg = "次路";
      break;
    case "0004":
      msg = "支路";
      break;
  }
  return msg;
};
// 自定义校验方法

// 正整数校验方法 不校验非空
export const validateRoadCount = (rule, value, callback) => {
  let reg = /^[1-9]+[0-9]*$/;
  if (!value) {
    callback();
  } else if (value.length > 2) {
    callback(new Error("请最多输入两位正整数"));
  } else if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正整数"));
  }
};
// 正整数或者小数校验方法 不校验非空
export const validateFloat = (rule, value, callback) => {
  let reg = /^\d+(\.\d{1,2})?$/;
  if (!value) {
    callback();
  } else if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正整数或小数"));
  }
};
// special service add rowspan count
export const addRowSpanCount = data => {
  if (data.length === 1) {
    data[0].rowspan = 1;
  }
  let curId,
    rowSpanCount = 1,
    compareLast = false;
  for (let i = 0; i < data.length; i++) {
    curId = data[i].vipId;
    for (let ii = i + 1; ii < data.length; ii++) {
      if (data[ii].vipId === curId) {
        rowSpanCount++;
        if (ii + 1 === data.length) {
          data[i].rowspan = rowSpanCount;
          i = ii - 1;
          rowSpanCount = 1;
          compareLast = true;
        }
      } else {
        data[i].rowspan = rowSpanCount;
        i = ii - 1;
        rowSpanCount = 1;
        break;
      }
    }
    if (i + 1 === data.length && !compareLast) {
      data[i].rowspan = 1;
    }
  }
  return data;
};

// systeamCinfog add rowspan
export const sysConfigAddRowspan = data => {
  let cur;
  for (let i = 0; i < data.length; i++) {
    cur = data[i];
    if (data[i].rowspan !== 0) {
      data[i].rowspan = 1;
    }
    for (let ii = i + 1; ii < data.length; ii++) {
      if (cur.serviceName === data[ii].serviceName) {
        if (data[i].rowspan !== 0) {
          data[i].rowspan = data[i].rowspan + 1;
        }
        data[ii].rowspan = 0;
      } else {
        break;
      }
    }
  }
  return data;
};

// 输入文件二进制流，下载文件方法
export const downloadFile = (fileName, stream) => {
  const blob = new Blob([stream]);
  const downloadElement = document.createElement("a");
  downloadElement.style.display = "none";
  const href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = fileName; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
};

export const getDirNumber = data => {
  switch (data) {
    case "N":
      return 0;
    case "E":
      return 2;
    case "S":
      return 4;
    case "W":
      return 6;
    case "NE":
      return 1;
    case "SE":
      return 3;
    case "SW":
      return 5;
    case "NW":
      return 7;
  }
};

export const getDftRoadMsg = dir => {
  let dftTemp = { ...JSON.parse(JSON.stringify(channelDataTmp)) };
  switch (dir) {
    case "N":
      dftTemp.lj = "北";
      dftTemp.rj = "北";
      dftTemp.name = "north";
      dftTemp.number = 0;
      for (let i = 0; i < 4; i++) {
        dftTemp.rri[i].jxdz = "北直";
      }
      break;
    case "E":
      dftTemp.lj = "东";
      dftTemp.rj = "东";
      dftTemp.name = "east";
      dftTemp.number = 2;
      for (let i = 0; i < 4; i++) {
        dftTemp.rri[i].jxdz = "东直";
      }
      break;
    case "S":
      dftTemp.lj = "南";
      dftTemp.rj = "南";
      dftTemp.name = "south";
      dftTemp.number = 4;
      for (let i = 0; i < 4; i++) {
        dftTemp.rri[i].jxdz = "南直";
      }
      break;
    case "W":
      dftTemp.lj = "西";
      dftTemp.rj = "西";
      dftTemp.name = "west";
      dftTemp.number = 6;
      for (let i = 0; i < 4; i++) {
        dftTemp.rri[i].jxdz = "西直";
      }
      break;
    case "NE":
      dftTemp.lj = "东北";
      dftTemp.rj = "东北";
      dftTemp.name = "northeast";
      dftTemp.number = 1;
      for (let i = 0; i < 4; i++) {
        dftTemp.rri[i].jxdz = "东直";
      }
      break;
    case "NW":
      dftTemp.lj = "西北";
      dftTemp.rj = "西北";
      dftTemp.name = "northwest";
      dftTemp.number = 7;
      for (let i = 0; i < 4; i++) {
        dftTemp.rri[i].jxdz = "北直";
      }
      break;
    case "SE":
      dftTemp.lj = "东南";
      dftTemp.rj = "东南";
      dftTemp.name = "southeast";
      dftTemp.number = 3;
      for (let i = 0; i < 4; i++) {
        dftTemp.rri[i].jxdz = "东直";
      }
      break;
    case "SW":
      dftTemp.lj = "西南";
      dftTemp.rj = "西南";
      dftTemp.name = "southwest";
      dftTemp.number = 5;
      for (let i = 0; i < 4; i++) {
        dftTemp.rri[i].jxdz = "南直";
      }
      break;
  }
  return dftTemp;
};

export const sortChannelData = (a, b) => {
  const val1 = a.number;
  const val2 = b.number;
  if (val1 < val2) {
    return -1;
  } else if (val1 > val2) {
    return 1;
  } else {
    return 0;
  }
};
export const calcRoadStyle = dir => {
  switch (dir) {
    case 0:
      return { transform: "rotate(90deg)" };
    case 1:
      return { transform: "rotate(135deg)" };
    case 2:
      return { transform: "rotate(180deg)" };
    case 3:
      return { transform: "rotate(225deg)" };
    case 4:
      return { transform: "rotate(270deg)" };
    case 5:
      return { transform: "rotate(315deg)" };
    case 6:
      return { transform: "rotate(0deg)" };
    case 7:
      return { transform: "rotate(45deg)" };
  }
};

export const offset = ele => {
  let box = ele.getBoundingClientRect();
  let win = window;
  let docElem = ele.ownerDocument.documentElement;
  return {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft
  };
  // return {
  //   top:ele.getBoundingClientRect().top,
  //   left:ele.getBoundingClientRect().left
  // }
};
export const transformRotate = number => {
  switch (number) {
    case 0:
      return { transform: "rotate(90deg)" };
    case 1:
      return { transform: "rotate(135deg)" };
    case 2:
      return { transform: "rotate(180deg)" };
    case 3:
      return { transform: "rotate(225deg)" };
    case 4:
      return { transform: "rotate(270deg)" };
    case 5:
      return { transform: "rotate(315deg)" };
    case 6:
      return { transform: "rotate(0deg)" };
    case 7:
      return { transform: "rotate(45deg)" };
  }
};
// 获取入口车道svg锚点坐标并判断闭合曲线时机
export const getImportAnchor = number => {
  const anchorLeft = document.getElementById(`import-anchor-left-${number}`);
  const anchorCenter = document.getElementById(
    `import-anchor-center-${number}`
  );
  const anchorRight = document.getElementById(`import-anchor-right-${number}`);
  const anchorLast = document.getElementById(`import-anchor-last-${number}`);
  let state = store.state.channelization.roadPosition;
  state.forEach(i => {
    if (i.number === number) {
      i.import = {
        anchorLeft: offset(anchorLeft),
        anchorCenter: offset(anchorCenter),
        anchorRight: offset(anchorRight),
        anchorLast: offset(anchorLast)
      };
    }
  });
  store.dispatch("channelization/setRoadPosition", {
    roadPosition: [...state]
  });
  const len = store.state.channelization.channelData[0].road.length;
  let rp = store.state.channelization.roadPosition;
  if (len === rp.length) {
    rp.sort((a, b) => a.number - b.number);
    paintSvg(rp);
  }
};
// 获取出口车道svg锚点坐标
export const getExitAnchor = number => {
  const anchorLeft = document.getElementById(`exit-anchor-left-${number}`);
  const anchorCenter = document.getElementById(`exit-anchor-center-${number}`);
  const anchorRight = document.getElementById(`exit-anchor-right-${number}`);
  const anchorLast = document.getElementById(`exit-anchor-last-${number}`);
  let svgObj = {};
  (svgObj.exit = {
    anchorLeft: offset(anchorLeft),
    anchorCenter: offset(anchorCenter),
    anchorRight: offset(anchorRight),
    anchorLast: offset(anchorLast)
  }),
    (svgObj.number = number);
  store.dispatch("channelization/setRoadPosition", {
    roadPosition: [svgObj, ...store.state.channelization.roadPosition]
  });
};
// 绘制svg曲线方法
export const paintSvg = rp => {
  const ict = offset(document.getElementById("eloc-CM")).top;
  const icl = offset(document.getElementById("eloc-CM")).left;
  let svgData = [];
  for (let i = 0; i < rp.length; i++) {
    let item = {};
    let index = i === rp.length - 1 ? 0 : i + 1;
    item.px1 = rp[i].exit.anchorLeft.left - icl;
    item.py1 = rp[i].exit.anchorLeft.top - ict;
    item.px2 = rp[i].exit.anchorLast.left - icl;
    item.py2 = rp[i].exit.anchorLast.top - ict;
    item.px5 = rp[i].exit.anchorCenter.left - icl;
    item.py5 = rp[i].exit.anchorCenter.top - ict;
    item.px3 = rp[index].import.anchorLast.left - icl;
    item.py3 = rp[index].import.anchorLast.top - ict;
    item.px4 = rp[index].import.anchorLeft.left - icl;
    item.py4 = rp[index].import.anchorLeft.top - ict;
    item.px6 = rp[index].import.anchorCenter.left - icl;
    item.py6 = rp[index].import.anchorCenter.top - ict;
    svgData.push(item);
  }
  store.dispatch("channelization/setSvgData", { svgData });
};

export const transferLandmark = code => {
  switch (code) {
    case "11":
      return straight;
    case "12":
      return left;
    case "13":
      return right;
    case "21":
      return straLeft;
    case "22":
      return straRight;
    case "23":
      return leftRight;
    case "24":
      return slr;
    case "31":
      return rear;
    case "41":
      return straRear;
    case "42":
      return leftRear;
  }
};

export const eleAppendToBody = el => {
  const body = document.querySelector("body");
  if (body.append) {
    body.append(el);
  } else {
    body.appendChild(el);
  }
};

export const conversionDirNumber = data => {
  let msg = "";
  switch (data) {
    case 0:
      msg = "N：北";
      break;
    case 2:
      msg = "E：东";
      break;
    case 4:
      msg = "S：南";
      break;
    case 6:
      msg = "W：西";
      break;
    case 1:
      msg = "NE：东北";
      break;
    case 3:
      msg = "SE：东南";
      break;
    case 5:
      msg = "SW：西南";
      break;
    case 7:
      msg = "NW：西北";
      break;
  }
  return msg;
};

export const addImportLaneNum = () => {
  let channelData = [...store.state.channelization.channelData];
  let serialNum = 0;
  channelData[0].road.forEach(i => {
    i.rri.forEach(ii => {
      serialNum = serialNum + 1;
      ii.serialNum = serialNum;
    });
  });
  store.dispatch("channelization/setChannelData", { channelData });
  store.dispatch("channelization/setLaneNum", { formLaneNum: "" });
};
// 初始化路标选择中公交专用状态
export const initBusOptions = () => {
  console.log("init");
  const road = store.state.channelization.channelData[0].road;
  const { number, index } = store.state.channelization.selectorDataPosition;
  road.forEach(i => {
    if (number === i.number) {
      const rri = i.rri;
      if (
        (index === 0 && rri[1].rml === "1") ||
        (rri[index + 1] &&
          rri[index + 1].rml === "1" &&
          rri[index].rml === "1") ||
        (!rri[index + 1] && rri[index].rml === "1")
        ) {
        store.dispatch("channelization/setSelectorOptionBusStyle", {
          selectorOptionBusStyle: { backgroundColor: "#2A60FC",color:'#fff' }
        });
        store.dispatch("channelization/setSelectorOptionBusActive",{selectorOptionBusActive:true})
      } else {
        store.dispatch("channelization/setSelectorOptionBusStyle", {
          selectorOptionBusStyle: {}
        });
        store.dispatch("channelization/setSelectorOptionBusActive",{selectorOptionBusActive:false})
      }
    }
  });
};
