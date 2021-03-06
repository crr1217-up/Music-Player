//此模块用于进度条控制

//当切歌后无法跳转进度，进度条也不起作用了，这是因为切歌之后各取还没有加载完，无法获取歌曲的总时间
; (function (player) {
    function Progress() { 
        this.bar = document.getElementsByClassName("bar")[0];
        this.total = document.getElementsByClassName("allPlay")[0];
        this.progress = document.getElementsByClassName("nowPlay")[0];
        this.controlDot = document.getElementsByClassName("controlDot")[0];
        this.nowTime = document.getElementsByClassName("nowTime")[0];
        this.timer = null;
    }
    Progress.prototype = {
        controlPro: function () {
            var self = this;
			// this.clearTimer();
           
            this.width = this.total.getBoundingClientRect().width;
            // console.log(self.total.getBoundingClientRect().width);
            this.timer = setInterval(function () {
                self.currentTime = player.audio.currentTime();
                //切歌时有时会因为网速问题不能及时得到audio.duration，因为还没加载完，所以totalTime也得隔一段时间更新一次
                self.totalTime = player.audio.totalTime();
                // console.log("当前播放时间：",self.currentTime);
                self.curWidth = self.currentTime / self.totalTime * self.width;
                self.controlDot.style.transform =
									"translate(" + self.curWidth + "px)";//进度点有一个2vw的边框,初始left值为-2vw，不能直接赋值设置其left，所以直接让他translateX
                self.progress.style.width = self.curWidth + "px";
                let m = Math.floor(self.currentTime / 60);
                let s = parseInt(self.currentTime % 60);
                
                m<10? m = "0" + m:"";
                s < 10 ? s = "0" + s : "";
                self.nowTime.innerText = m + ":" + s;
                // if (player.audio.isEnd()) {
                //     player.audio.status = "pause";
                //     player.init.isPlay();
                // }
                // console.log("总时长，总宽度：",self.totalTime,self.width);
            },1000)
            
        },
        clearTimer: function () { 
            clearInterval(this.timer);
            this.controlDot.style.left = "-2vw"; //进度点有一个2vw的边框
            this.progress.style.width = 0;
            this.nowTime.innerText = "00:0";
            player.audio.audio1.currentTime = 0;
           // self.currentTime = 0;
            // console.log(player.audio.audio1.currentTime);
        },
        dragBar: function () { //点击跳转进度
            var self = this;
            this.left = this.total.getBoundingClientRect().left;
            this.bar.addEventListener("touchstart", function (e) {
                // console.log(e)
                self.startX = e.touches[0].clientX;
                player.audio.audio1.currentTime =
									((self.startX - self.left) / self.width) * self.totalTime;
                // console.log(player.audio.audio.currentTime);
            }, false);
            this.bar.addEventListener("touchmove", (e) => { 
                // console.log(e);
                player.audio.pause();
                self.moveX = e.changedTouches[0].clientX;
                player.audio.audio1.currentTime =
									((self.moveX - self.left) / self.width) * self.totalTime;
            })
            this.bar.addEventListener("touchend", (e) => {
                player.audio.play();
            })
        }
        
    }

    player.progressBar = new Progress();
})(window.player||(window.player={}))