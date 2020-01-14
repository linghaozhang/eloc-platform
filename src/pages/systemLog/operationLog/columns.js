import {getUserOperType} from 'utils/utils'
import moment from 'moment'
const columns = [
  {
    title: '序号',
    dataIndex: 'count',
    key: 'count',
    width:'12%',
    sorter:(a, b) => a.count - b.count
  },
  {
    title: '操作时间',
    dataIndex: 'operDate',
    key: 'operDate',
    width:'12%',
    sorter:(a, b) => moment(a.operDate).valueOf() - moment(b.operDate).valueOf(),
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
    width:'12%',
    sorter:(a, b) => a.userName.localeCompare(b.userName,'zh-CN')
  },
  {
    title: '操作',
    dataIndex: 'operName',
    key: 'operName',
    width:'12%',
    customRender:(text,record)=>{
      return getUserOperType(record.operName)
    },
    sorter:(a, b) => a.operName.localeCompare(b.operName,'zh-CN')
  },
  {
    title: '操作对象',
    dataIndex: 'operObject',
    key: 'operObject',
    width:'20%',
    sorter:(a, b) => a.operObject.localeCompare(b.operObject,'zh-CN')
  },
  {
    title: '操作内容',
    dataIndex: 'operContent',
    key: 'operContent',
    width:'12%',
  },
  {
    title: '操作结果',
    dataIndex: 'operResult',
    key: 'operResult',
    width:'12%',
    sorter:(a, b) => a.operResult.localeCompare(b.operResult,'zh-CN')
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    key: 'operReipsult',
    width:'12%',
  },
];

export default columns