const columns = [
  {
    title: "序号",
    dataIndex: "count",
    key: "count",
    width: "12%"
  },
  {
    title: "告警类型",
    dataIndex: "warningKind",
    key: "warningKind",
    width: "12%",
    customRender: text => {
      switch (text) {
        case 1:
          return "信号机";
        case 2:
          return "信号灯";
        case 3:
          return "检测器";
        case 4:
          return "机柜";
        case 5:
          return "交通状态";
      }
    }
  },
  {
    title: "告警级别",
    dataIndex: "warningLevel",
    key: "warningLevel",
    width: "12%",
    customRender: text => {
      switch (text) {
        case 1:
          return "一级";
        case 2:
          return "二级";
        case 3:
          return "三级";
      }
    }
  },
  {
    title: "告警明细",
    dataIndex: "warningInfo",
    key: "warningInfo",
    width: "12%"
  },
  {
    title: "告警提示",
    dataIndex: "warningAlert",
    key: "warningAlert",
    width: "12%",
    align:'center',
    scopedSlots: {customRender: 'warningAlert'},
  }
];
export default columns;
