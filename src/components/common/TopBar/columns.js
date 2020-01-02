import moment from 'moment'

const columns = [
  {
    title: '告警时间',
    dataIndex: 'logDate',
    key:'logDate',
    sorter:(a, b) => moment(a.logDate).valueOf() - moment(b.logDate).valueOf(),
  },
  {
    title: '告警类型',
    dataIndex: 'warningKind',
    key:'warningKind',
    sorter:(a, b) => a.warningKind - b.warningKind
  },
  {
    title: '告警点位',
    dataIndex: 'warningAddr',
    key:'warningAddr',
    sorter:(a, b) => a.crossNo - b.crossNo
  },
  {
    title: '告警级别',
    dataIndex: 'warningLevel',
    key:'warningLevel',
    sorter:(a, b) => a.warningLevel - b.warningLevel
  },
  {
    title: '告警明细',
    dataIndex: 'warningInfo',
    key:'warningInfo',
    sorter:(a, b) => a.warningInfo - b.warningInfo
  },
  {
    title: '临时屏蔽时间',
    dataIndex: 'shieldStartTime',
    width:350,
    scopedSlots: { customRender: 'shieldStartTime' },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    scopedSlots: { customRender: 'remark' },
    width:300
  },
];

export default columns