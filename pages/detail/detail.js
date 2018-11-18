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
        articleDetail:null,
        imgalist:[ 'http://canada-api.umsoft.cn/static/images/ewm.jpg',],
        ewm:'../../assets/images/ewm.jpg',
        ifLoaded:false
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
        if(options.type==="轮播图"){
            wx.setNavigationBarTitle({
                title: "加拿大温哥华生子"
            });
        }else {
            wx.setNavigationBarTitle({
                title: that.data.type
            });
        }
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url    : app.globalData.baseUrl + '/home/article/detail',
            method : 'GET',
            data   : {
                id:that.data.id
            },
            header : {
                'content-type': 'application/form-data' // 默认值
            },
            success:  (res)=> {
                wx.hideLoading()
                this.setData({
                    ifLoaded: true
                })
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

        //获取小程序码
        // wx.request({
        //     url    : 'https://api.weixin.qq.com/cgi-bin/token',
        //     method : 'GET',
        //     data   : {
        //         grant_type:'client_credential',
        //         appid:'wx4fbfb8b5724aa15d',
        //         secret:'552df67b9fa752176f9cbadf24ab1c39',
        //     },
        //     header : {
        //         'content-type': 'application/form-data' // 默认值
        //     },
        //     success: function (res) {
        //         let access_token=res.data.access_token
        //         wx.request({
        //             url    : 'https://api.weixin.qq.com/wxa/getwxacode?access_token='+access_token,
        //             method : 'POST',
        //             data   : {
        //                 path:'pages/index/index',
        //             },
        //             header : {
        //                 'content-type': 'application/json;charset=utf-8' // 默认值
        //             },
        //             success:  (response) =>{
        //                // console.log(response.data,9999)
        //                 this.ewm=response.data
        //                 console.log(this.ewm,444)
        //
        //
        //
        //             }
        //         })
        //     }
        // })
    },


    //识别二维码
    previewImage: function(e) {
        wx.setClipboardData({
            data: 'https://canada-api.umsoft.cn/static/webShare/index.html?id='+this.data.id,
            success (res) {
            }
        })
        // console.log(this.data.ewm)
        //
        // wx.previewImage({
        //     current: this.data.imgalist[0],
        //     urls: this.data.imgalist
        // })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */

    handleShare(){
        // wx.navigateTo({
        //     url: '/pages/share/share'
        // })
        wx.setClipboardData({
            data: 'https://canada-api.umsoft.cn/static/webShare/index.html?id='+this.data.id,
            success (res) {
                wx.getClipboardData({
                    success (res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
    },
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
        return {
            title: this.dataarticleDetail.title,
            path: '/pages/detail/detail?id='+this.data.id
        }
    }
});