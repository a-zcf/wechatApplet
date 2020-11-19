// pages/login/login.js
import login from '../../apis/api'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //判断小程序的API，回调，参数，组件等是否在当前版本可用。
     canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this
      // 查看是否授权
      wx.getSetting({
        success (res) {
          if(res.authSetting['scope.userInfo']){
            console.log("用户授权了");
            // 用户授权了获取用户信息
            wx.getUserInfo({
              success: function(res) {
              }
            })
          }else{
            console.log("请点击授权登陆");
          }
        }
      })
  },
  bindGetUserInfo (e) {
    // 允许授权按钮
    if(e.detail.userInfo){
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            request.postRequest(
              login.APIS.login,
              {
                appid:login.APIS.appid,
                code: res.code,
                encryptedData:e.detail.encryptedData,
                iv:e.detail.iv,
                rawData:e.detail.rawData,
                signature:e.detail.signature
              }).then((res) => {
                if(res.code === 0){
                  wx.setStorageSync('Token', res.user.accessToken)
                  if( wx.getStorageSync('Token')){
                    wx.redirectTo({
                      url: '../index/index'
                    })
                  }else{
                    wx.showToast({
                      title: '登陆失败',
                      duration: 1500,
                      image:'../../images/gantanhao.png'
                    })
                  }
                }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }else{
      // 拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
                // console.log('用户点击了“返回授权”');
            }
        }
      })
    }
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