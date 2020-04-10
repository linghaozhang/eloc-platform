import Mock from 'mockjs'
import {getDefaultChannelData} from './response/pointEquipment'

Mock.mock(/getDefaultChannelData/,getDefaultChannelData)