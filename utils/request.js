import APIS from '../apis/api.js'
function request(url, data = {}, method = 'GET', header= {
  "Content-Type": "application/json",
  "accessToken": wx.getStorageSync('Token')
}){
  return new Promise(function (resolve, reject){
    wx.request({
      url: url,
      data: data,
      header: header,
      method: method,
      dataType: 'json',
      responseType: 'text',
      success:(res) => {
         // 请求成功返回的数据
         switch(res.data.code){
           case 0:
              resolve(res.data)
              break;
           case 1000:
              wx.showModal({
              title: '提示',
              content: '由于您长时间未操作登陆过期或您还未登录，请点击登陆按钮进行登陆！',
              showCancel: true,
              confirmText:'返回登陆',
              success: function(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../login/login'
                    })
                  }else if (res.cancel) {
                    console.log('用户点击取消')
                  }
              }
            })
            break;
            case 601:
              wx.showToast({
                  title: '未绑定核销员',
                  duration: 1500,
                  image:'../../images/gantanhao.png'
              })
              break;
              default:
                wx.showToast({
                    title: res.data.msg,
                    duration: 1500,
                    icon:'none',
                    // image:'../../images/gantanhao.png',
                    mask: false,
                    success: (res)=>{
                      resolve(res.data);
                    },
                });
         }
      },
      fail:(res) =>{
        // 请求失败
        wx.showToast({
          title: '请求失败！',
          duration: 1500,
        });
        reject(res)
      },
      complete:() => {}
    })
  })
}

// 接口前缀域名
let baseUrl = APIS.APIS.baseUrl
// GET请求
const getRequest = function (url, data, header){
  return request(`${baseUrl}${url}`, data, 'GET', header);
}
//POST请求
const postRequest = function (url, data, header){
  return request(`${baseUrl}${url}`, data, 'POST', header);
}
module.exports = {
  getRequest: getRequest,
  postRequest: postRequest,
  baseUrl:baseUrl
}