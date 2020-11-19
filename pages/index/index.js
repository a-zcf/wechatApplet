
import APIS from '../../apis/api'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimgurl:'',
    notLongImg: '../../images/notLogin.png',
    nickname:'',
    userName:'', // 用户名值
    passWord:'', // 密码
    show:false, // 显示隐藏用户绑定弹框
    bindStatus:'', // 绑定状态0未绑定1已绑定
    show1:false,
    show2:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取用户信息
    request.postRequest(APIS.APIS.userInfo).then((res) => {
        if(res.code === 0){
          let user = res.user
          if(res.user.bindStatus === '0'){
            that.setData({
              show:true
            })
          }else{
            that.setData({
              show:false
            })
          }
          that.setData({
            headimgurl:user.headimgurl,
            nickname:user.nickname
          })
        }else{

        }
    })
  },
  // 获取输入账号input的值
  onChange:function(event){
    let that = this;
    that.setData({
      userName:event.detail
    })
    if(event.detail == ''){
      that.setData({
        show1:true
      })
      return
    }else{
      that.setData({
        show1:false
      })
    }
  },
  // 获取输入密码的值
  changePassword:function(event){
    let that = this;
    that.setData({
      passWord:event.detail
    })
    if(event.detail == ''){
      that.setData({
        show2:true
      })
      return
    }else{
      that.setData({
        show2:false
      })
    }
  },
  // 绑定按钮
  catUserBind:function(){
    let that = this;
    if(that.data.userName == ''){
      that.setData({
        show1:true
      })
      return
    }else{
      that.setData({
        show1:false
      })
    }
    if(that.data.passWord == ''){
      that.setData({
        show2:true
      })
      return
    }else{
      that.setData({
        show2:false
      })
    }

      request.postRequest(APIS.APIS.userBind,{account:that.data.userName,password:that.data.passWord}).then( (res) => {
        if(res.code === 0){
          wx.showToast({
            title: '绑定成功',
            duration: 1500,
            mask: false
        });
        that.setData({
          show:false,
        })
        }else{
          wx.showToast({
            title: res.msg,
            icon:'none',
            // image:'../../images/gantanhao.png',
            duration: 1500,
            mask: false
        });
        }
      })
    
  },
  // 微信扫一扫
  bindScanCode(){
    wx.scanCode({
      success (res) {
        let result = res.result
        let cardCode = result.split("=")[1].toString().replace('&cardId','')
        let cardId = result.split("=")[2].toString()
        let params = {
          cardCode:cardCode,
          cardId:cardId,
          verifyType:2
        }
        request.postRequest(APIS.APIS.scanCodeVerify,params).then((res) => {
          if(res.code === 0){
            console.log(res)
            wx.showToast({
              title: '核销成功',
              duration: 1500,
          });
          wx.navigateTo({
            url: '../writesuccess/writesuccess?url='+res.url,
          })
          }
        })
      }
    })
  },

  collectionPage:function(){
    wx.navigateTo({
      url: '../collection/collection',
    })
  },
  cardVoucherApply:function(){
    wx.navigateTo({
      url: '../applylist/applylist',
    })
  },
  orderManagement:function(){
    wx.navigateTo({
      url: '../ordermanagement/ordermanagement',
    })
  },
  myAccount:function(){
    wx.navigateTo({
      url: '../myaccount/myaccount',
    })
  },
  loginPage:function(){
    wx.reLaunch({
      url: '../login/login',
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