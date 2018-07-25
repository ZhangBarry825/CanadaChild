// pages/detail/detail.js
let HtmlParser = require('../../html-view/index')
let app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl:app.globalData.baseUrl,
        id:'',
        type:'',
        articleDetail:null
    },
    //格式化时间
    timeFormat(cellValue){
        let date = new Date();
        date.setTime(cellValue );
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.data.type=options.type
        that.data.id=options.id
        wx.setNavigationBarTitle({
            title: that.data.type
        });
        wx.request({
            url    : app.globalData.baseUrl + '/home/article/detail',
            method : 'GET',
            data   : {
                id:that.data.id
            },
            header : {
                'content-type': 'application/form-data' // 默认值
            },
            success: function (res) {
                console.log(res.data);
                if (res.data.code === 200) {
                    res.data.data.update_time=that.timeFormat(res.data.data.update_time)
                    res.data.data.create_time=that.timeFormat(res.data.data.create_time)
                    that.setData({
                        articleDetail : res.data.data
                    })
                    let html = new HtmlParser(that.data.articleDetail.content).nodes
                    that.setData({ html })
                }
            }
        });
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
});