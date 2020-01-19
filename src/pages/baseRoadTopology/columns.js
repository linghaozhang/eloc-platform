import { switchCrossLev, switchCrossExit } from "utils/utils";
const columns = [
  {
    title: "序号",
    dataIndex: "count",
    key: "count",
    width: "5%",
  },
  {
    title: "路段序号",
    dataIndex: "roadSectionNo",
    key: "roadSectionNo",
    width: "10%"
  },
  {
    title: "起始路口",
    dataIndex: "beginCrossNo",
    key: "beginCrossNo",
    width: "18%",
    customRender: (text, record) => {
      if (record.beginCrossId == "") {
        return "无";
      } else {
        return record.beginCrossId + "-" + record.beginCrossName;
      }
    }
  },
  {
    title: "终止路口",
    dataIndex: "endCrossNo",
    key: "endCrossNo",
    width: "18%",
    customRender: (text, record) => {
      if (record.endCrossId == "") {
        return "无";
      } else {
        return record.endCrossId + "-" + record.endCrossName;
      }
    }
  },
  {
    title: "起始路口出口",
    dataIndex: "beginCrossExit",
    key: "beginCrossExit",
    width: "10%",
    customRender: text => switchCrossExit(text)
  },
  {
    title: "终止路口进口",
    dataIndex: "endCrossEntry",
    key: "endCrossEntry",
    width: "8%",
    customRender: text => switchCrossExit(text)
  },
  {
    title: "路段等级",
    dataIndex: "roadSectionLevel",
    key: "roadSectionLevel",
    width: "8%",
    customRender: text => switchCrossLev(text)
  },
  {
    title: "路段长度/m",
    dataIndex: "roadSectionLength",
    key: "roadSectionLength",
    width: "8%"
  },
  {
    title: "路段车道数",
    dataIndex: "roadSectionLaneNum",
    key: "roadSectionLaneNum",
    width: "8%",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: "15%",
    align:"center",
    scopedSlots: {customRender: 'operate'},
  }
];

export default columns;
