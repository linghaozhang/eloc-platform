const columns = [
  {
    title: '服务名称',
    dataIndex: 'serviceName',
    key: 'serviceName',
    customRender: (text, record) => {
      let row = {
        children: text,
        attrs: {}
      };
        row.attrs.rowSpan = record.rowspan
      return row
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '端口',
    key: 'port',
    dataIndex: 'port',
  },
]
export default columns