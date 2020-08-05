// 歌曲接口：https://autumnfish.cn/search
// 请求方法：get
// 请求参数：keywords(查询关键字)

// 歌曲url获取：
// 			请求地址：https://autumnfish.cn/song/url
// 			请求方法：get
// 			请求参数：id(歌曲id)
// 			响应内容：歌曲的URL地址

//歌曲详情获取
//请求地址：https://autumnfish.cn/song/detail
//请求方法：get
//请求参数：ids(歌曲id)
// 响应内容：歌曲详情，包含封面信息

//热门评论获取
//请求地址：https://autumnfish.cn/comment/hot?type=0
//请求方法：get
//请求参数：id(歌曲id，type固定位0
//    响应内容：歌曲热门评论

//MV地址获取
//请求地址：https://autumnfish.cn/mv/url
//请求方法：get
//请求参数：id (mvid,为0说明没有mv)
//响应内容：MV的地址
var app = new Vue({
    el: '#player',
    data: {
        query: '', //查询关键字
        musicList: [], //歌曲数组
        musicUrl: '', //音乐地址
        pictureUrl: '', //封面地址
        hotComments: [], //热门评论数组
        isPlaying: false, //播放状态
        mvUrl: '',
        isClick: false,

    },
    methods: {
        searchMusic: function() {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.query).then(function(response) {
                console.log(response);
                that.musicList = response.data.result.songs
            }, function(err) {})
        },
        //歌曲播放
        playMusic: function(musicId) {
            var that = this;
            // console.log(musicId);
            //获取歌曲地址
            axios.get('https://autumnfish.cn/song/url?id=' + musicId).then(function(response) {
                console.log(response);
                that.musicUrl = response.data.data[0].url;
                // console.log(that.musicUrl);
            }, function(err) { alert('对不起，网络出错了，请重试！') });
            //获取封面
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicId).then(function(response) {
                // console.log(response);
                that.pictureUrl = response.data.songs[0].al.picUrl;
                // console.log(that.pictureUrl);
            }, function(err) {});
            //获取评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId).then(function(response) {
                // console.log(response);
                that.hotComments = response.data.hotComments;
            }, function(err) {});
        },
        play: function() {
            // console.log('play');
            this.isPlaying = true;
        },
        pause: function() {
            console.log('pause');
            this.isPlaying = false;
        },
        playMv: function(mvId) {
            that = this;
            this.isClick = true;
            axios.get('https://autumnfish.cn/mv/url?id=' + mvId).then(function(response) {
                console.log(response);
                that.mvUrl = response.data.data.url;
            }, function(err) {})
        },
        hide: function() {
            this.isClick = false
        }
    }
})