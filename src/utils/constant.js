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
export const baseUrl = "http://130.3.3.42:8090/ehl-atms-eloc/";
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
  "wal":"0",
	"was":"0",
  "nmvl":"0",
  "sfnmv":"3",
  "earlyTurn":"0",
  rli: [
    { lczjcq: "", lfyjcq: "",rml: "2" },
    { lczjcq: "", lfyjcq: "", rml: "2" },
    { lczjcq: "", lfyjcq: "", rml: "2" },
    { lczjcq: "", lfyjcq: "", }
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
export const rliItem = { lczjcq: "", lfyjcq: "",rml:"2" }

// 链接灯组选项
export const connectionTerminalOptions=[
  {title:"北左",value:"6",class:"colorB"},
  {title:"北直",value:"5",class:"colorB"},
  {title:"北右",value:"4",class:"colorB"},
  {title:"东左",value:"12",class:"colorB"},
  {title:"东直",value:"11",class:"colorB"},
  {title:"东右",value:"10",class:"colorB"},
  {title:"南左",value:"18",class:"colorB"},
  {title:"南直",value:"17",class:"colorB"},
  {title:"南右",value:"16",class:"colorB"},
  {title:"西左",value:"24",class:"colorB"},
  {title:"西直",value:"23",class:"colorB"},
  {title:"西右",value:"22",class:"colorB"},

  {title:"北调",value:"3",class:"colorY"},
  {title:"北扩",value:"1",class:"colorY"},
  {title:"北非机动",value:"2",class:"colorY"},
  {title:"东调",value:"9",class:"colorY"},
  {title:"东扩",value:"7",class:"colorY"},
  {title:"东非机动",value:"8",class:"colorY"},
  {title:"南调",value:"15",class:"colorY"},
  {title:"南扩",value:"13",class:"colorY"},
  {title:"南非机动",value:"14",class:"colorY"},
  {title:"西调",value:"21",class:"colorY"},
  {title:"西扩",value:"19",class:"colorY"},
  {title:"西非机动",value:"20",class:"colorY"},

  {title:"北行1",value:"25",class:"colorG"},
  {title:"北行2",value:"26",class:"colorG"},
  {title:"东行1",value:"27",class:"colorG"},
  {title:"东行2",value:"28",class:"colorG"},
  {title:"南行1",value:"29",class:"colorG"},
  {title:"南行2",value:"30",class:"colorG"},
  {title:"西行1",value:"31",class:"colorG"},
  {title:"西行2",value:"32",class:"colorG"},
]