// pages/create_order_items/index.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // jielong:[{
    //   description:"Earphone",
    //   orderPrice:49.99,
    //   orderQuantity:0,
    //   needGuestName:false,
    //   needGuestPhone:false,
    //   productList:[{
    //     productName:"",
    //     productPrice:0,
    //     maxNumber:0
    //   }]
    // }],
    //文本域内容
    descriptionVal:"",
    priceVal:"",
    quantityVal:"",
    dateVal:"",
    needName:false,
    needPhone:false
  },

  //描述输入框
  handleDescription(e){
    this.setData({
      descriptionVal:e.detail.value
    })
  },

  //价格输入框
  handlePrice(e){
    this.setData({
      priceVal:e.detail.value
    })
  },

  //数量输入框
  handleQuantity(e){
    this.setData({
      quantityVal:e.detail.value
    })
  },

  //需要姓名
  handleNeedName(e){
    this.setData({
      needName:e.detail.value
    })
  },

  //需要电话
  handleNeedPhone(e){
    this.setData({
      needPhone:e.detail.value
    })
  },

  //提交按钮点击事件
  handleSubmit(e){
    let request = wx.request({
      url: 'https://'+app.globalData.ngrokAdd+'.ngrok.io/api/jielongs',
      data: {
        description:this.data.descriptionVal,
        orderPrice:this.data.priceVal,
        orderQuantity:this.data.quantityVal,
        needGuestName:this.data.needName,
        needGuestPhone:this.data.needPhone,
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        wx.navigateBack({
          delta: 1
        });
        wx.showToast({
          title: '添加成功！',
          duration: 1500,
        });
      },
      fail: (e)=>{
        console.log("fail");
      },
      complete: ()=>{}
    });
  }
})