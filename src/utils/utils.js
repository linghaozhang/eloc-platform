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
  TC10
} from "./constant";
import store from "store";

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

export const switchCrossExit = data => {
  var msg = "";
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
