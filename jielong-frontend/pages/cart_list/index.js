//import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/cart_list/index.js

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"正在接龙",
        isActive:true
      },
      {
        id:1,
        value:"有效接龙",
        isActive:false
      },
      {
        id:2,
        value:"接龙完毕",
        isActive:false
      }
    ],
    jielongList:[]
  },

  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    //1 获取被点击的标题索引
    const {index}=e.detail;
    //2 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //3 赋值到data中
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var reqTask = wx.request({
      //注意更改数据接口为合法域名
      url: 'https://'+app.globalData.ngrokAdd+'.ngrok.io/api/jielongs',
      
      success: (result)=>{
        this.setData({
          jielongList:result.data
        })
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 1 重置数组
    this.setData({
      jielongList:[]
    })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求（空缺）
    //this.getJielongList();
  },
})