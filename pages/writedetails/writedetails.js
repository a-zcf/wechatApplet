import APIS from '../../apis/api'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageNum:1,
    pageSize:10,
    loading:false, // 加载中...
    noMore:false, // 没有更多
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getVerifyDetail()
  },
getVerifyDetail(replace = true){
  let that = this;
  request.getRequest(APIS.APIS.verifyDetail,{pageNum:that.data.pageNum,pageSize:that.data.pageSize}).then((res) => {
    if(res.code === 0){
      if(replace){
        that.setData({
          list:res.page.list
        })
      }else{
        that.setData({
          list:that.data.list.concat(res.page.list)
        })
      }
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
    let that = this;
    let { pageNum, pageSize,list} = that.data;
    if ((list.length / pageNum) === pageSize ) {
      this.setData({
        loading:true,
        noMore:false,
        pageNum: pageNum + 1, //每次触发上拉事件，把pageNum+1  
      });
      that.getVerifyDetail(false);
    }else{
      this.setData({
        noMore:true,
        loading:false,
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})