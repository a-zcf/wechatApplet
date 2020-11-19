import APIS from '../../apis/api'
import request from '../../utils/request'
import * as echarts from '../../ec-canvas/echarts';
var Chart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: true
    },
    dateStart: '',
    dateEnd: '',
    headimgurl:'',
    notLongImg: '../../images/notLogin.png',
    nickname:'',
    total:0,
    toBeWrittenOff:0,
    numArr:'',
    showTimeArr:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let date = new Date();
    let year = date.getFullYear(); //获取完整的年份
    let month = date.getMonth()+1; //获取当前月份
    let day = date.getDate(); //获取当前日
    that.setData({
      dateStart: year+'-'+month+'-'+day,
      dateEnd: year+'-'+month+'-'+day
    })
     // 获取用户信息
     request.postRequest(APIS.APIS.userInfo).then((res) => {
      if(res.code === 0){
        let user = res.user
        that.setData({
          headimgurl:user.headimgurl,
          nickname:user.nickname
        })
      }else{

      }
  });
   that.echartsComponnet = this.selectComponent('#mychart-dom-bar');
   that.initChart()
   that.getVerifySum();
  },
  getVerifySum(){
    let that = this;
    request.getRequest(APIS.APIS.verifySum,{startDate:that.data.dateStart,endDate:that.data.dateEnd}).then((res) => {
      if(res.code === 0){
          let toBeWrittenOff = res.total - res.myVerifyedTotal
          let list = res.list
          let numArr = []
          let showTimeArr=[]
          for(let i in list){
            numArr.push(list[i].num);
            showTimeArr.push(list[i].showTime)
          }
          that.setData({
            total: res.total,
            toBeWrittenOff: toBeWrittenOff,
            numArr:numArr,
            showTimeArr:showTimeArr
          });
          if (!Chart) {
            that.initChart(); //初始化图表
          } else {
            that.setOption(Chart); //更新数据
          }
      }
    })
  },
  // 初始化折线图
  initChart: function() {
    this.echartsComponnet.init((canvas, width, height, dpr) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr,
      });
      this.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function(Chart) {
    Chart.clear(); // 清除
    Chart.setOption(this.getOption()); //获取新数据
  },
// 设置表格展示样式
getOption: function() {
  var that = this;
  // 指定图表的配置项和数据
  var option = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.data.showTimeArr
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          }
      }
  },
    grid: {
      top:'8rpx',
      bottom:'0',
      right:'0',
      left:'0',
      width:'95%',
      height:"80%",
      containLabel: true
  },
    series: [{
        data: this.data.numArr,
        type: 'line',
        color:'#87CEEB',
        areaStyle: {
          opacity:0.2,
        },
        label: {
          normal: {
              show: true,
              position: 'top'
          }
      },
    }]
};
  return option;
},

  //  日期选择器开始
  bindDateChangeStart: function(e) {
    let that = this;
    that.setData({
      dateStart: e.detail.value
    })
  },
  //  日期选择器结束
  bindDateChangeEnd: function(e) {
    let that = this;
    that.setData({
      dateEnd: e.detail.value
    });
    that.getVerifySum();
  },
  writeDetails(){
    wx.navigateTo({
      url: '../writedetails/writedetails',
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