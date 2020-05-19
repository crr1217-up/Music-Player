//本模块用于渲染页面
(function (player) {
    function render(src) { //渲染图片
        player.blurImg(src);
        var img = document.getElementsByTagName("img")[0];
        img.src = src;
    }
    function info(info) {//渲染歌曲信息
        var h2 = document.getElementsByTagName("h2")[0];
        var singer = document.getElementsByClassName("singer")[0];
        var zhuanji = document.getElementsByClassName("zhuanji")[0];
        var allTime = document.getElementsByClassName("allTime")[0];
        h2.innerText = info.name;
        singer.innerText = info.singer;
        zhuanji.innerText = info.album;
        var minute = Math.floor(info.duration / 60);
        allTime.innerText = minute+":"+(info.duration - minute*60);
    }
    function playList(data) {//渲染播放列表
        var playMenu = document.getElementsByClassName("playMenu")[0];
        var close = document.createElement("div");
        close.className = "close";
        close.innerText = "关闭";
        data.forEach(function (item,i) { 
            var dd = document.createElement("dd");
            dd.innerText = item.name;
            playMenu.appendChild(dd);
            // liking(item.isLike);
        });
        playMenu.appendChild(close);
    }
    function liking(info) { //渲染是否喜欢
        var like = document.getElementsByClassName("like")[0];
        if (info) { 
            like.className = "like liking";
        }
        
    }
    
    player.renderObj = {//导出
        render: render,
        info: info,
        playList: playList,
        liking:liking
    };
})(window.player||(window.player={}))