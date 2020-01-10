const columns = [
  {
    title: '运行时段',
    dataIndex: 'runtime',
    key: 'runtime',
    scopedSlots: {customRender: 'runtime'},
  },
  {
    title: '路口状态',
    dataIndex: 'controlMode',
    key: 'controlMode',
  },
  {
    title: '特殊控制',
    dataIndex: 'controlType',
    key: 'controlType',
  },
  {
    title: '初始子区',
    dataIndex: 'fixedSubareaId',
    key: 'fixedSubareaId',
  },
  {
    title: '周期',
    dataIndex: 'cycle',
    key: 'cycle',
  },
  {
    title: '协调车流',
    dataIndex: 'coordinateFlow',
    key: 'coordinateFlow',
  },
  {
    title: '连接路口',
    dataIndex: 'connectCrossName',
    key: 'connectCrossName',
  },
  {
    title: '相位差',
    dataIndex: 'offset',
    key: 'offset',
  },
];
export default columns