import APIS from '../../apis/api'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:false,
    first_click:false,
    state_1:false,
    first_click_1:false,
    dayArr:['01','02','03','04','05','06','07','08','09','10','11','12'],
    list:[],
    year:'',
    month:'',
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
     let time_date = Date.parse(new Date());
     let date = new Date(time_date);
     // 获取当前年份
     let Y =date.getFullYear();
     //获取当前月份  
     let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
     that.setData({
      year:Y,
      month:M,
     })
     request.getRequest(APIS.APIS.getYearList).then((res) => {
       if(res.code === 0){
         that.setData({
          yearList:res.list
         })
       }
     });
     that.getStatisBymoth()
  },
  downDate(){
    let that = this;
    that.setData({
      state_1:false,
      first_click_1:false
    })
    let list_state = that.data.state,
          first_state = that.data.first_click;
      if (!first_state){
        that.setData({
            first_click: true
          });
      }
      if (list_state){
        that.setData({
            state: false
          });
      }else{
        that.setData({
            state: true
          });
      }
  },
  downDay(){
    let that = this;
    that.setData({
      state:false,
      first_click:false,
    })
    let list_state_1 = that.data.state_1,
          first_state_1 = that.data.first_click_1;
      if (!first_state_1){
        that.setData({
            first_click_1: true
          });
      }
      if (list_state_1){
        that.setData({
            state_1: false
          });
      }else{
        that.setData({
            state_1: true
          });
      }
  },
  // 查询订单
  getStatisBymoth(replace = true){
    let that = this;
    let {pageNum,pageSize,year,month} = that.data
    let params = {
      pageNum:pageNum,
      pageSize:pageSize,
      year:year,
      month:month
    }
    request.getRequest(APIS.APIS.statisBymoth,params).then((res) => {
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
      }else{
        
      }
    })
  },
  // 时间查询
  binQueryOrderList(){
    let that = this;
    that.getStatisBymoth()
  },
  bindYearList(e){
    let that = this;
    let year = e.currentTarget.dataset.year
    that.setData({
      year:year,
      state:false,
      first_click:false,
    })
  },
  bindDayList(e){
    let that = this;
    let month = e.currentTarget.dataset.month
    that.setData({
      month:month,
      state_1:false,
      first_click_1:false,
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