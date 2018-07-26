// pages/index/index.js
let app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        baseUrl       : app.globalData.baseUrl,
        imgUrls       : [
            '/assets/images/s0.jpg',
            '/assets/images/s1.jpg',
            '/assets/images/s2.jpg'
        ],
        indicatorDots : true,
        autoplay      : true,
        interval      : 5000,
        duration      : 1000,
        pictureArticle: null,
        latestArticle : null
    },

    call() {
        wx.makePhoneCall({
            phoneNumber: '10086'
        });
    },
    msg() {
        document.getElementById('msg').onclick;
    },
    goOne(event) {
        wx.navigateTo({
            url: '/pages/items-one/items-one?type=' + event.currentTarget.dataset.type
        });
    },
    goDetail(event) {
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id +"&type="+event.currentTarget.dataset.type
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        //请求轮播图和最新资讯
        wx.request({
            url    : app.globalData.baseUrl + '/home/article/lists',
            method : 'GET',
            data   : {
                type     : '轮播图',
                page_num : 1,
                page_size: 3
            },
            header : {
                'content-type': 'application/form-data'
            },
            success: function (res) {
                if (res.data.code === 200) {
                    that.setData({
                        pictureArticle: res.data.data
                    });
                }
            }
        });

        wx.request({
            url    : app.globalData.baseUrl + '/home/article/lists',
            method : 'GET',
            data   : {
                page_num : 1,
                page_size: 10
            },
            header : {
                'content-type': 'application/form-data'
            },
            success: function (res) {
                if (res.data.code === 200) {
                    that.setData({
                        latestArticle: res.data.data
                    });
                    console.log("that.data.latestArticle:");
                    console.log(that.data.latestArticle);
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
        console.log('下拉刷新')
        let that = this;
        //请求轮播图和最新资讯
        wx.request({
            url    : app.globalData.baseUrl + '/home/article/lists',
            method : 'GET',
            data   : {
                type     : '轮播图',
                page_num : 1,
                page_size: 3
            },
            header : {
                'content-type': 'application/form-data'
            },
            success: function (res) {
                if (res.data.code === 200) {
                    that.setData({
                        pictureArticle: res.data.data
                    });
                }
            }
        });

        wx.request({
            url    : app.globalData.baseUrl + '/home/article/lists',
            method : 'GET',
            data   : {
                page_num : 1,
                page_size: 10
            },
            header : {
                'content-type': 'application/form-data'
            },
            success: function (res) {
                if (res.data.code === 200) {
                    that.setData({
                        latestArticle: res.data.data
                    });
                }
            }
        });

        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },2000)

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
        return {
            title: '加拿大温哥华生子',
            path: '/pages/index/index'
        }
    }
});