; (function ($, player) { 
    function Index() {
        this.index = 0;
        this.dataList = [];
        // this.audio = null;
        this.indexCre = null;
        this.lock = true;
        this.list = null;
        this.timer = null;
        // this.play = null;
    }
    Index.prototype = {
        init: function () { //初始化
            this.play = document.getElementsByClassName("play")[0];
            this.prev = document.getElementsByClassName("prev")[0];
            this.next = document.getElementsByClassName("next")[0];
            this.playlist = document.getElementsByClassName("playlist")[0];
            this.img = document.getElementsByTagName("img")[0];
            // console.log(this.dd);
            this.getData();
            this.renderPage();
            
            
        },
        getData: function () { //请求数据
            var self = this;
            $.ajax({
                url: "../mock/data.json",
                type: "GET",
                success: function (data) { 
                    self.dataList = data;
                    self.sonList();
                    self.indexCre = new player.IndexCre(data.length);
                    self.index = self.indexCre.index;
                    self.renderPage(self.index);
                    self.audioCre();
                    
                }
            })
        },
        renderPage: function (index) { //控制渲染页面以及加载音乐
            player.renderObj.render(this.dataList[index]);
            player.renderObj.info(this.dataList[index]);
            // player.renderObj.playList(this.dataList);
            player.renderObj.liking(this.dataList[index].isLike);
            player.audio.load(this.dataList[index].audioSrc);
            // console.log(this.audio.status);
            if (player.audio.status === "playing") {
                player.progressBar.clearTimer();
                // console.log("111111");
                player.audio.play();
                this.play.className = "play playing";//改变按钮状态
                this.rotate(0);//从0开始旋转（切歌后）
                this.bar();//进度条开始变化
                
            }
        },
        audioCre: function () { //控制音乐加载播放
            var self = this;
            this.play.addEventListener("touchend", function () {
                //暂停与播放
                if (player.audio.status == "pause") {
                    player.audio.play();
                    self.play.className = "play playing";//改变按钮状态
                    var deg = self.img.dataset.rotate || 0;
                    self.rotate(deg);//接着上次旋转的角度旋转
                    self.bar();
                } else { 
                    player.audio.pause();
                    self.play.className = "play";
                    clearInterval(self.timer);//停止旋转图片
                    // audio.status = "pause";
                }
            }, false)
            
            function clickPre() {//切换上一首，单独打包事件处理函数，因为这里存在点击一次触发多次事件
                player.audio.status = "playing";
                var preIndex = self.indexCre.prev();
                self.list.changeSelected(preIndex);
                self.renderPage(preIndex);
                
            }
            function clickNext() {  //切换下一首
                player.audio.status = "playing";
                var nextIndex = self.indexCre.next();
                // console.log(nextIndex);
                // self.img.dataset.rotate = 0;
                self.list.changeSelected(nextIndex);
                self.renderPage(nextIndex);

            }
            this.prev.addEventListener("touchend", clickPre, false);
            this.next.addEventListener("touchend", clickNext, false);
            
        },
        rotate: function (deg) {
            var self = this;
            clearInterval(this.timer);
            
            this.timer = setInterval(function () { 
                deg = +deg + 0.2;
                self.img.style.transform = "rotate(" + deg + "deg)";
                self.img.dataset.rotate = deg;//记录旋转的角度，方便下次接着旋转
            },1000/60)
        },
        bar: function () { //进度条变化以及跳转
            player.progressBar.controlPro();
            player.progressBar.dragBar();
        },
        sonList: function () { //播放列表的点击事件以及上拉下移事件
            var self = this;
            this.list = new player.ListControl(this.dataList);           
            this.list.renderList();
            this.close = document.getElementsByClassName("close")[0];
            this.playlist.addEventListener("touchend", function () {  
                    self.list.slideUp();   //播放列表出现  
            }, false);
            
            this.close.addEventListener("touchend", function () { 
                self.list.slideDown();//播放列表下移
            }, false);
            this.list.menuList.forEach(function (item, i) {
                //列表每一首歌点击切换事件
                item.addEventListener("touchend", function () {
                    if (this.className == "active") {//当点击的本身就是出于选中状态，不做操作 
                        return;
                    }
                    self.list.changeSelected(i);
                    player.audio.status = "playing";
                    self.renderPage(i);
                     self.list.slideDown();
                },false)
            })
            
        },
        
    }
    
    var ind = new Index();
    ind.init();
    player.dataList = ind.dataList;
})(window.Zepto, window.player || (window.player = {}))