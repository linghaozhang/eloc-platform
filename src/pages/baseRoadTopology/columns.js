import { switchCrossLev, switchCrossExit } from "utils/utils";
const columns = [
  {
    title: "序号",
    dataIndex: "count",
    key: "count"
  },
  {
    title: "路段序号",
    dataIndex: "roadSectionNo",
    key: "roadSectionNo",
    width: "12%"
  },
  {
    title: "起始路口",
    dataIndex: "beginCrossNo",
    key: "beginCrossNo",
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
    customRender: (text, record) => {
      if (record.endCrossNo == "") {
        return "无";
      } else {
        return record.endCrossNo + "-" + record.endCrossName;
      }
    }
  },
  {
    title: "起始路口出口",
    dataIndex: "beginCrossExit",
    key: "beginCrossExit",
    customRender: text => switchCrossExit(text)
  },
  {
    title: "终止路口进口",
    dataIndex: "endCrossEntry",
    key: "endCrossEntry",
    customRender: text => switchCrossExit(text)
  },
  {
    title: "路段等级",
    dataIndex: "roadSectionLevel",
    key: "roadSectionLevel",
    customRender: text => switchCrossLev(text)
  },
  {
    title: "路段长度/m",
    dataIndex: "roadSectionLength",
    key: "roadSectionLength"
  },
  {
    title: "路段车道数",
    dataIndex: "roadSectionLaneNum",
    key: "roadSectionLaneNum"
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate"
  }
];

export default columns;
