import APIS from '../../apis/api'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that = this;
     request.postRequest(APIS.APIS.applyList).then((res) => {
       if(res.code === 0){
         let list = res.list
         that.setData({
          list:list
         })
       }else{

       }
     })
  },
  // 跳转卡券申请页
  cardVoucherApply:function(){
    wx.navigateTo({
      url: '../cardvoucherapply/cardvoucherapply',
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