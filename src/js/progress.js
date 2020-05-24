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
                console.log("当前播放时间：",self.currentTime);
                self.curWidth = self.currentTime / self.totalTime * self.width;
                self.controlDot.style.left = self.curWidth - 6 + "px";//进度点有一个2vw的边框
                self.progress.style.width = self.curWidth + "px";
                self.nowTime.innerText = "0"+Math.floor(self.currentTime/60)+":"+parseInt(self.currentTime%60)
                console.log("总时长，总宽度：",self.totalTime,self.width);
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
                player.audio.audio1.currentTime =
									((e.touches[0].clientX - self.left) / self.width) *
									self.totalTime;
                // console.log(player.audio.audio.currentTime);
            },false);
        }
        
    }

    player.progressBar = new Progress();
})(window.player||(window.player={}))