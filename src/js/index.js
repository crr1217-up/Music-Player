; (function ($, player) { 
    function Index() {
        
        this.index = 0;
        this.dataList = [];
        // this.audio = null;
        this.indexCre = null;
        this.lock = true;
        this.list = null;
        // this.play = null;
    }
    Index.prototype = {
        init: function () { //初始化
            this.play = document.getElementsByClassName("play")[0];
            this.prev = document.getElementsByClassName("prev")[0];
            this.next = document.getElementsByClassName("next")[0];
            this.playlist = document.getElementsByClassName("playlist")[0];
            
            // console.log(this.dd);
            this.getData();
            this.renderPage();
            console.log(this.audio.status);
            
            
        },
        getData: function () { //请求数据
            var self = this;
            $.ajax({
                url: "../mock/data.json",
                type: "GET",
                success: function (data) { 
                    self.dataList = data;
                    self.sonList();
                    // console.log();
                    // console.log(self.dataList);
                    self.indexCre = new player.IndexCre(data.length);
                    // self.index = self.indexCre.index;
                    //  console.log(data);
                    self.index = self.indexCre.index;
                    
                    self.audioCre();
                    
                    self.renderPage(self.index);
                    
                    // self.renderList(data);
                    
                }
            })
        },
        renderPage: function (index) { //控制渲染页面以及音源
            player.renderObj.render(this.dataList[index]);
            player.renderObj.info(this.dataList[index]);
            // player.renderObj.playList(this.dataList);
            player.renderObj.liking(this.dataList[index].isLike);
            player.audio.load(this.dataList[index].audioSrc);
            // console.log(this.audio.status);
            if (player.audio.status === "playing") {
                // console.log("111111");
                player.audio.play();
                this.play.className = "play playing";//改变按钮状态
                // audio.status = "playing"
            }
        },
        audioCre: function () { //控制音乐加载播放
            var self = this;
            // this.audio = new player.AudioCreate(src);
           
            
            this.play.addEventListener("touchend", function () { 
                if (player.audio.status == "pause") {
                    player.audio.play();
                    self.play.className = "play playing";//改变按钮状态
                } else { 
                    player.audio.pause();
                    self.play.className = "play";
                    // audio.status = "pause";
                }
            }, false)
            
            function clickPre() {
                player.audio.status = "playing";
                var preIndex = self.indexCre.prev();
                // console.log(this.list);
                self.list.changeSelected(preIndex);
                self.renderPage(preIndex);
            }
            function clickNext() {  
                player.audio.status = "playing";
                var nextIndex = self.indexCre.next();
                // console.log(nextIndex);
                self.list.changeSelected(nextIndex);
                self.renderPage(nextIndex);
            }
            this.prev.addEventListener("touchend", clickPre, false);
            this.next.addEventListener("touchend", clickNext, false);
            
        },
        sonList: function () { //播放列表的点击事件以及上拉下移事件
            var self = this;
            this.list = new player.ListControl(this.dataList);
           
            this.list.renderList();
            // this.dd = document.querySelectorAll("dd");
            this.close = document.getElementsByClassName("close")[0];
            this.playlist.addEventListener("touchend", function () { 
                
                    self.list.slideUp();
                
            }, false);
            
            this.close.addEventListener("touchend", function () { 
                self.list.slideDown();
            }, false);
            
            console.log(this.list.menuList);
            this.list.menuList.forEach(function (item,i) { 
                item.addEventListener("touchend", function () {
                    // player.audio.pause();
                    if (this.className == "active") { 
                        // player.audio.play();
                        // player.audio.status = "playing";
                        return;
                    }
                    self.list.changeSelected(i);
                    // self.audioCre(self.dataList[i].audioSrc);
                    // self.renderPage(i);
                    // player.audio.play();
                    player.audio.status = "playing";
                    self.renderPage(i);
                },false)
            })
            
        },
        
    }
    
    var ind = new Index();
    ind.init();
    // console.log("111");
    player.dataList = ind.dataList;
})(window.Zepto, window.player || (window.player = {}))