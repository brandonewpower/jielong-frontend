// pages/create_delivery_detail/index.js

const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusArray:["送货", "自取"],
    statusIndex:0,
    statusDefault:"送货",
    statusDetail:"",

    jielongId:0,
    address:"",
    date:"",
    time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      jielongId:options.jielongId
    })
  },

  //地址栏输入
  handleAddress(e){
    this.setData({
      address:e.detail.value
    })
  },

  //日期下拉框事件
  bindDatePickerChange: function (e) {
    console.log(e);
    this.setData({
      date:e.detail.value
    })
  },

  //时间下拉框事件
  bindTimePickerChange: function (e) {
    console.log(e);
    this.setData({
      time:e.detail.value
    })
  },

  //送货/自取下拉框事件
  bindStatusPickerChange: function (e) {
    console.log(e.detail.value);
    let statusIndex = e.detail.value;
    let statusArray = this.data.statusArray;
    this.setData({
      statusIndex,
      statusDefault: statusArray[statusIndex]
    })
    if(this.data.statusDefault==="送货") {
      this.setData({
        statusDetail:"DELIVERY"
      })
    }
    else if(this.data.statusDefault==="自取") {
      this.setData({
        statusDetail:"PICKUP"
      })
    }
    console.log(this.data.statusDetail);
  },

  //提交按钮事件
  handleSubmit(e){
    let pages = getCurrentPages(); // 当前页，
    let prevPage = pages[pages.length - 2]; // 上一页
    //尚未添加日期转换
    let request1 = wx.request({
      url: 'https://'+app.globalData.ngrokAdd+'.ngrok.io/api/deliveries',
      data: {
        jielongId:this.data.jielongId,
        address:this.data.address,
        serviceMethod:this.data.statusDetail,
        date:this.data.date
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        prevPage.setData({
          jielongId:this.data.jielongId
        })
      },
    });

    let request2 = wx.request({
      url: 'https://'+app.globalData.ngrokAdd+'.ngrok.io/api/deliveries/jielong/'+this.data.jielongId,
      success: (result)=>{
        console.log(result);
        prevPage.setData({
          deliveryList:result.data
        })
        wx.navigateBack({ //返回
          delta: 1
        })       
        wx.showToast({
          title: '添加成功！',
          duration: 1500,
        });
      },
    });
  }
})