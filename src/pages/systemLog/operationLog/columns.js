const columns = [
  {
    title: '序号',
    dataIndex: 'count',
    key: 'count',
    width:'12%'
  },
  {
    title: '告警时间',
    dataIndex: 'logDate',
    key: 'logDate',
    width:'12%'
  },
  {
    title: '告警类型',
    dataIndex: 'warningKind',
    key: 'warningKind',
    width:'12%'
  },
  {
    title: '告警点位',
    dataIndex: 'warningAddr',
    key: 'warningAddr',
    width:'12%',
  },
  {
    title: '告警级别',
    dataIndex: 'warningLevel',
    key: 'warningLevel',
    width:'12%',
  },
  {
    title: '告警明细',
    dataIndex: 'warningInfo',
    key: 'warningInfo',
    width:'12%',
  }
];

export default columns