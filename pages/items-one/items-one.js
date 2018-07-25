// pages/items-one/items-one.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type       : '',
        articleList: null,
        baseUrl:app.globalData.baseUrl
    },
    goDetail(event){
        wx.navigateTo({
            url: '/pages/detail/detail?id='+event.currentTarget.dataset.id+"&type="+event.currentTarget.dataset.type
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.data.type = options.type;
        wx.setNavigationBarTitle({
            title: that.data.type
        });

        //请求列表
        wx.request({
            url    : app.globalData.baseUrl + '/home/article/lists',
            method : 'GET',
            data   : {
                type     : that.data.type,
                page_num : 1,
                page_size: 10
            },
            header : {
                'content-type': 'application/form-data'
            },
            success: function (res) {
                console.log(res.data);
                if (res.data.code === 200) {
                    that.setData({
                        articleList : res.data.data.rows
                    })
                    console.log(that.data.articleList)
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