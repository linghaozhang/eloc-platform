import PC01 from "img/PC01.png";
import PC02 from "img/PC02.png";
import PC03 from "img/PC03.png";
import PC04 from "img/PC04.png";
import PC05 from "img/PC05.png";
import PC06 from "img/PC06.png";
import PC07 from "img/PC07.png";
import PC08 from "img/PC08.png";
import PC09 from "img/PC09.png";
import PC10 from "img/PC10.png";

import TC01 from "img/TC01.png";
import TC02 from "img/TC02.png";
import TC03 from "img/TC03.png";
import TC04 from "img/TC04.png";
import TC05 from "img/TC05.png";
import TC06 from "img/TC06.png";
import TC07 from "img/TC07.png";
import TC08 from "img/TC08.png";
import TC09 from "img/TC09.png";
import TC10 from "img/TC10.png";

import left from "img/left.png";
import right from "img/right.png";
import slr from "img/slr.png";
import leftRear from "img/left-rear.png";
import leftRight from "img/left-right.png";
import rear from "img/rear.png";
import straight from "img/straight.png";
import straLeft from "img/stra-left.png";
import straRear from "img/stra-rear.png";
import straRight from "img/stra-right.png";

export const landmarkData = [
  {label:straight,value:'11',type:'landmark'},//直行
  {label:left,value:'12',type:'landmark'},
  {label:right,value:'13',type:'landmark'},
  {label:straLeft,value:'21',type:'landmark'},
  {label:straRight,value:'22',type:'landmark'},
  {label:leftRight,value:'23',type:'landmark'},
  {label:slr,value:'24',type:'landmark'},
  {label:rear,value:'31',type:'landmark'},
  {label:straRear,value:'41',type:'landmark'},
  {label:leftRear,value:'42',type:'landmark'},
  {label:'公交专用',value:'bus',type:'landmarkBus'}
]

// 基础请求地址
export const baseUrl = "http://130.3.3.84:8090/ehl-atms-eloc/";
// export const baseUrl = 'http://127.0.0.1:8090/ehl-atms-eloc/'
// 可多开标签页配置项
export const multiTaskList = [
  "pointEquipment",
  "intersectionWorkbench",
  "baseIntersectionWorkbench",
  "log"
];

export const xxbh = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P"
];
export { PC01, PC02, PC03, PC04, PC05, PC06, PC07, PC08, PC09, PC10 };
export { TC01, TC02, TC03, TC04, TC05, TC06, TC07, TC08, TC09, TC10 };
export {left, right, slr, leftRear, leftRight, rear, straight, straLeft, straRear, straRight};

export const channelDataTmp = {
  camera: "",
  crossname: "",
  distance: "",
  lj: "北",
  median: "0",
  name: "north",
  nearid: "0",
  number: 0,
  rj: "北",
  rli: [
    { lczjcq: "", lfyjcq: "" },
    { lczjcq: "", lfyjcq: "", rml: "2" },
    { lczjcq: "", lfyjcq: "", rml: "2" },
    { lczjcq: "", lfyjcq: "", rml: "2" }
  ],
  roadll: "4",
  roadname: "",
  roadrl: "0",
  rri: [
    {
      cdtz: "wi7-null",
      czjcq: "",
      fx: "11",
      fxclass: "fx5",
      jxdz: "北直",
      jxid: "11",
      pdjcq: "",
      zx: "11",
      zxclass: "zx5"
    },
    {
      cdtz: "wi7-null",
      czjcq: "",
      fx: "11",
      fxclass: "fx5",
      jxdz: "北直",
      jxid: "11",
      pdjcq: "",
      zx: "11",
      zxclass: "zx5",
      "rml":"0"
    },
    {
      cdtz: "wi7-null",
      czjcq: "",
      fx: "11",
      fxclass: "fx5",
      jxdz: "北直",
      jxid: "11",
      pdjcq: "",
      zx: "11",
      zxclass: "zx5",
      "rml":"0"	
    },
    {
      cdtz: "wi7-null",
      czjcq: "",
      fx: "11",
      fxclass: "fx5",
      jxdz: "北直",
      jxid: "11",
      pdjcq: "",
      zx: "11",
      zxclass: "zx5",
      "rml":"0"
    }
  ],
  sidewalk: "1",
  swTerminal: [{ swjxdz: "", swjxdzid: "27" }],
  width: 500
};

export const rriItem = {
      cdtz: "wi7-null",
      czjcq: "",
      fx: "11",
      fxclass: "fx5",
      jxdz: "北直",
      jxid: "11",
      pdjcq: "",
      zx: "11",
      zxclass: "zx5",
      rml:"0"
}
export const rliItem = { lczjcq: "", lfyjcq: "" }