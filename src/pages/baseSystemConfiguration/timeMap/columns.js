const columns = [
  {
    title: '序号',
    dataIndex: 'count',
    key: 'count',
    width:'12%',
  },
  {
    title: '组织单位',
    dataIndex: 'organizationName',
    key: 'organizationName',
    width:'20%',
  },
  {
    title: '地图中心点',
    dataIndex: 'centerPoint',
    key: 'centerPoint',
    width:'40%',
    scopedSlots: {customRender: 'centerPoint'},
  },
  {
    title: '操作',
    key: 'operate',
    width:'8%',
    align:"center",
    scopedSlots: {customRender: 'operate'},
  },
]
export default columns