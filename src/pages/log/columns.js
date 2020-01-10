const columns = [
  {
    title: '路口编号',
    dataIndex: 'crossId',
    key: 'crossId',
    width:'12%'
  },
  {
    title: '路口名称',
    dataIndex: 'crossName',
    key: 'crossName',
    width:'12%'
  },
  {
    title: '运行记录',
    dataIndex: 'runTime',
    key: 'runTime',
    scopedSlots: {customRender: 'runTime'},
  },
  {
    title: '详情',
    dataIndex: 'detail',
    key: 'detail',
    width:'12%',
    scopedSlots: {customRender: 'detail'},
  }
];

export default columns