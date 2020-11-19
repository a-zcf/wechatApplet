import APIS from '../../apis/api'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    cardNumberValue:'',
    cellPhoneNumberValue:'',
    list:[],
    select: false,
    choose_card: '--请选择--',
    indexId:0,
    cardCode:'',
    repeatSubmission:false // 防止重复提交
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  bindReplaceCardNumber(e){
    let that = this;
    that.setData({
      cardNumberValue:e.detail.value
    })
  },
  bindReplaceCellPhoneNumber(e){
    let that = this;
    that.setData({
      cellPhoneNumberValue:e.detail.value
    })
  },
  confirmWriteOff(){
   let that = this;
   if(that.data.radio == 1){
     if(that.data.cardNumberValue == ''){
      wx.showToast({
        title: '卡券号不能为空！',
        icon: 'none',
        duration: 2000
      })
      return
     }
     request.postRequest(APIS.APIS.inputCodeVerify,{cardCode:that.data.cardNumberValue,verifyType:that.data.radio}).then((res) => {
      if(res.code === 0){
        wx.showToast({
          title: '核销成功！',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          cardNumberValue:''
        })
        wx.navigateTo({
          url: '../writesuccess/writesuccess?url='+res.url,
        })
       }
     })
   }
   if(that.data.radio == 0){
     if(that.data.cellPhoneNumberValue == ''){
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        duration: 2000
      })
      return
     }
     let params = {
      phone:that.data.cellPhoneNumberValue,
      cardCode:that.data.cardCode,
      verifyType:that.data.radio
     }
     request.postRequest(APIS.APIS.phoneVerify,params).then((res) => {
       if(res.code === 0){
        wx.showToast({
          title: '核销成功！',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          cellPhoneNumberValue:'',
          cardCode:''
        })
        wx.navigateTo({
          url: '../writesuccess/writesuccess?url='+res.url,
        })
       }
     })
   }
  },
// 点击下拉框
  dropDownBox:function(){
    let that = this
    if(that.data.cellPhoneNumberValue == ''){
      wx.showToast({
        title: '请先填写手机号！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let repeatSubmission = that.data.repeatSubmission
    if(!repeatSubmission){
      that.setData({repeatSubmission:true})
    request.postRequest(APIS.APIS.queryCardistByPhone,{phone:that.data.cellPhoneNumberValue}).then((res) => {
      if(res.code === 0){
       console.log(res)
       that.setData({
        list:res.list
       })
      }
    })}
    that.setData({
      select: !this.data.select
    })
  },
  // 选择卡劵
  selectCard:function(e){
    let item = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.id
    let cardCode = e.currentTarget.dataset.cardcode
    this.setData({
      choose_card:item,
      select: false,
      indexId:index,
      cardCode:cardCode
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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