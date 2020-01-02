const columns = [
  {
    title: '任务名称',
    dataIndex: 'vipName',
    key: 'vipName',
    align: 'center',
    width: '6%',
    customRender: (text, record) => {
      let row = {
        children: text,
        attrs: {}
      };
      if (record.rowspan === undefined) {
        row.attrs.rowSpan = 0
      } else if (record.rowspan !== 0 && typeof record.rowspan === 'number') {
        row.attrs.rowSpan = record.rowspan
      }
      return row
    }
  },
  {
    title: '任务级别',
    dataIndex: 'vipLevel',
    align: 'center',
    key: 'vipLevel',
    width: '4%',
    customRender: (text, record) => {
      let row = {
        children: '',
        attrs: {}
      };
      switch (record.vipLevel) {
        case "1":
          row.children = "一级";
          break;
        case "2":
          row.children = "二级";
          break;
        case "3":
          row.children = "三级";
          break;
      }
      if (record.rowspan === undefined) {
        row.attrs.rowSpan = 0
      } else if (record.rowspan !== 0 && typeof record.rowspan === 'number') {
        row.attrs.rowSpan = record.rowspan
      }
      return row
    }
  },
  {
    title: '任务执行时间',
    dataIndex: 'runTime',
    key: 'runTime',
    width: '12%',
    align: 'center',
    customRender: (text, record) => {
      let row = {
        children: `${record.vipStartTime} ~ ${record.vipEndTime}`,
        attrs: {}
      };
      if (record.rowspan === undefined) {
        row.attrs.rowSpan = 0
      } else if (record.rowspan !== 1 && typeof record.rowspan === 'number') {
        row.attrs.rowSpan = record.rowspan
      }
      return row
    }
  },
  {
    title: '任务路线',
    children: [
      {
        title: '路线名称',
        dataIndex: 'lineName',
        align: 'center',
        key: 'lineName',
        width: '4%',
      },
      {
        title: '路线级别',
        dataIndex: 'lineLevel',
        align: 'center',
        key: 'lineLevel',
        width: '4%',
        customRender: (text, record) => {
          switch (record.lineLevel) {
            case "1":
              return "一级";
            case "2":
              return "二级";
            case "3":
              return "三级";
          }
        }
      },
      {
        title: '路线起点',
        dataIndex: 'startName',
        align: 'center',
        key: 'startName',
      },
      {
        title: '路线终点',
        dataIndex: 'endName',
        key: 'endName',
        align: 'center',
      },
      {
        title: '路线长度',
        dataIndex: 'lineLength',
        key: 'lineLength',
        width: '4%',
        align: 'center',
      },
      {
        title: '路线执行时间',
        dataIndex: 'lineRunTime',
        key: 'lineRunTime',
        width: '12%',
        align: 'center',
        customRender: (text, record) => `${record.startTime} ~ ${record.endTime}`
      },
      {
        title: '路线执行状态',
        dataIndex: 'lineStateLab',
        key: 'lineStateLab',
        align: 'center',
        scopedSlots: {customRender: 'lineStateLab'},
      }]
  },
  {
    title: '操作',
    key: 'handle',
    align: 'center',
    width: '10%',
    scopedSlots: {customRender: 'handle'},
  }
];
export default columns