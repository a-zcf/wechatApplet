import APIS from '../../apis/api'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    exchangeValue:'', // 兑换券值
    giftValue:'', // 礼品券值
    fullreductionValue:'', // 满减券值
    full:'', // 满
    reduction:'', // 减
    fullId:'', 
    giftId:'',
    exchangeId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    request.postRequest(APIS.APIS.cardTypeList).then((res) => {
      if(res.code === 0){
        console.log(res)
        let list = res.list
        that.setData({
          list:list
        })
      }else{

      }
    })
  },
  // 满减输入框值
  bindReplaceFull:function(event){
    let that = this;
    let fullId= event.currentTarget.dataset.id;
    that.setData({
      fullreductionValue:event.detail.value,
      fullId:fullId
    })
  },
  // 兑换券输入框值
  bindReplaceExchange:function(event){
    let that = this;
    let exchangeId= event.currentTarget.dataset.id;
    that.setData({
      exchangeValue:event.detail.value,
      exchangeId:exchangeId
    })
  },
  // 礼品券输入框值
  bindReplaceGift:function(event){
    let that = this;
    let giftId= event.currentTarget.dataset.id;
    that.setData({
      giftValue:event.detail.value,
      giftId:giftId
    })
  },
  // 满输入框值
  bindFull:function(event){
    let that = this;
    that.setData({
      full:event.detail.value
    })
  },
  // 减输入框值
  bindReduction:function(event){
    let that = this;
    that.setData({
      reduction:event.detail.value
    })
  },
  // 提交
  submitApply:function(){
    let that = this;

      let list = [
        {manAmout:that.data.full,decues:that.data.reduction,num:that.data.fullreductionValue,templateId:that.data.fullId},
        {manAmout:0,decues:0,num:that.data.exchangeValue,templateId:that.data.exchangeId},
        {manAmout:0,decues:0,num:that.data.giftValue,templateId:that.data.giftId},
      ]
    request.postRequest(APIS.APIS.addApply,list).then((res) => {
       if(res.code ===0){
         console.log(res)
       }else{
         console.log(res.msg)
       }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})