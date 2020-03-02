const isNumber = /^[0-9]*$/;
// 脉冲宽度校验方法
export const validatePulseCountDownTime = (rule, value, callback) =>{
  if(!value){
    callback()
  }else if(!isNumber.test(value)){
    callback(new Error("脉冲宽度必须为数字"))
  }else if(Number(value)<10 || Number(value)>50){
    callback(new Error("请输入10~50之间的脉冲宽度"))
  }else{
    callback()
  }
}
// 手动脉冲宽度校验方法
export const validateManualPulseTime = (rule, value, callback) =>{
  if(!value){
    callback()
  }else if(!isNumber.test(value)){
    callback(new Error("脉冲宽度必须为数字"))
  }else if(Number(value)<0 || Number(value)>20){
    callback(new Error("请输入0~20之间的脉冲宽度"))
  }else{
    callback()
  }
}
// 倒计时时长校验方法
export const validateCountDownSec = (rule, value, callback) =>{
  if(!value){
    callback()
  }else if(!isNumber.test(value)){
    callback(new Error("倒计时时长必须为数字"))
  }else if(Number(value)<0 || Number(value)>20){
    callback(new Error("请输入0~90之间的倒计时时长"))
  }else{
    callback()
  }
}