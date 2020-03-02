const columns = [
  {
    title: "序号",
    dataIndex: "count",
    key: "count",
    width: "4%",
    align: "center"
  },
  {
    title: "点位编号",
    dataIndex: "crossId",
    key: "crossId",
    width: "6%",
    align: "center"
  },
  {
    title: "点位名称",
    dataIndex: "crossName",
    key: "crossName",
    width: "12%",
    align: "center"
  },
  {
    title: "点位网络信息",
    children: [
      {
        title: "点位IP",
        dataIndex: "crossIp",
        align: "center",
        key: "crossIp",
        width: "8%"
      },
      {
        title: "路口序号",
        dataIndex: "order",
        align: "center",
        key: "order",
        width: "8%"
      }
    ]
  },
  {
    title: "信号机版本",
    dataIndex: "version",
    key: "version",
    align: "center",
    width: "10%"
  },
  {
    title: "行政区域",
    dataIndex: "area",
    key: "area",
    align: "center",
    width: "12%"
  },
  {
    title: "组织单位",
    dataIndex: "organization",
    key: "organization",
    width: "12%",
    align: "center"
  },
  {
    title: "点位类型",
    dataIndex: "slcKind",
    key: "slcKind",
    width: "6%",
    align: "center",
    customRender: (text, record) => {
      if (record.slcKind === "1") return "路口";
      if (record.slcKind === "2") return "路侧";
      return "";
    }
  },
  {
    title: "设备监控",
    children: [
      {
        title: "信号机状态",
        dataIndex: "slcState",
        key: "slcState",
        align: "center",
        customRender: (text, record) => {
          if (record.slcState == "C01") return "在线-固定配时";
          if (record.slcState == "C02") return "在线-感应控制";
          if (record.slcState == "C03") return "在线-特勤";
          if (record.slcState == "C04") return "在线-中心手动";
          if (record.slcState == "C05") return "在线-现场手动";
          if (record.slcState == "C06") return "在线-自适应";
          if (record.slcState == "C07") return "脱机";
          if (record.slcState == "C10") return "脱机";
          if (record.slcState == "----") return "----";
          return "异常";
        }
      },
      {
        title: "检测器",
        dataIndex: "deteceState",
        key: "deteceState",
        align: "center",
        customRender: (text, record) => {
          if (record.deteceState == "0001") return "正常";
          if (record.deteceState == "0000") return "----";
          if (record.deteceState == "0002") return "异常";
          return "异常";
        }
      }
    ]
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    align: "center",
    width: "10%",
    scopedSlots: { customRender: "operation" }
  }
];

export const countDownColumns = [
  {
    title: "序号",
    dataIndex: "count",
    key: "count",
    width: "6%",
    align: "center"
  },
  {
    title: "点位名称",
    dataIndex: "crossName",
    key: "crossName",
    width: "12%",
    align: "center"
  },
  {
    title: "倒计时模式",
    dataIndex: "countDownMode",
    key: "countDownMode",
    width: "12%",
    align: "center",
    customRender: (text, record) => {
      if (record.countDownMode === "0") return "关闭";
      if (record.countDownMode === "1") return "脉冲模式";
      if (record.countDownMode === "2") return "通信模式(2004)";
      if (record.countDownMode === "3") return "通信模式(2014)";
      return "";
    }
  },
  {
    title: "倒计时方式",
    dataIndex: "countDownChioce",
    key: "countDownChioce",
    width: "12%",
    align: "center",
    customRender:(text,record)=>{
      if(record.countDownType == undefined){
        return "-";
    }else {
        var countDownType = [];
        for(var i=0;i<record.countDownType.length;i++){
            switch (record.countDownType[i]){
                case "0":countDownType.push("红灯") ;break;
                case "1":countDownType.push("绿灯") ;break;
                case "2":countDownType.push("行人") ;break;
                case "3":countDownType.push("机动车") ;break;
            }
        }
        return countDownType.join(",");
    }
    }
  },
  {
    title: "倒计时时长",
    dataIndex: "countDownSec",
    key: "countDownSec",
    width: "12%",
    align: "center",
  },
  {
    title: "脉冲宽度",
    dataIndex: "pulseCountDownTime",
    key: "pulseCountDownTime",
    width: "12%",
    align: "center",
  },
  {
    title: "波特率",
    dataIndex: "baudRateMode",
    key: "baudRateMode",
    width: "12%",
    align: "center",
    customRender:(text,record)=>{
      if(record.baudRateMode === undefined){
        return "-";
    }else{
        switch (record.baudRateMode){
            case "1":return "2400bps";
            case "2":return "4800bps";
            case "3":return "9600bps";
            case "4" :return "19200bps";
        }
    }
    }
  },
];

export default columns;
