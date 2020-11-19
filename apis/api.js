const APIS = {
  baseUrl:'https://ld.thewm.cn/commoncard',
  appid:'wx091334047de9d74e',
  login:'/api/wxuser/login', // 授权登陆接口
  logOut:'/api/wxuser/logout', // 退出登陆接口
  userInfo:'/api/userCenter/userInfo', // 用户信息接口
  userBind:'/api/userCenter/userBind', // 绑定成为核销员接口
  cardTypeList:'/api/cardApply/cardTypeList', // 卡券申请类型接口
  addApply:'/api/cardApply/apply', // 卡券申请接口
  applyList:'/api/cardApply/applylist', // 卡券申请记录接口
  scanCodeVerify:'/api/cardverify/scanCodeVerify', // 卡券扫码核销接口
  inputCodeVerify:'/api/cardverify/inputCodeVerify', // 输入code核销接口
  phoneVerify:'/api/cardverify/phoneVerify', // 输手机号核销接口
  queryCardistByPhone:'/api/cardverify/queryCardistByPhone', // 输手机号查询代核销卡券接口
  verifyDetail:'/api/statistical/verifyDetail', // 核销明细接口 
  verifySum:'/api/statistical/verifySum', // 核销总数 销售趋势接口 
  getYearList:'/api/statistical/getYearList', // 获取年份数据接口 
  statisBymoth:'/api/statistical/statisBymoth', // 核销明细分组查询接口 
};
module.exports = {
  APIS: APIS
}