//本模块用于播放列表控制
; (function (player) {
    
    function PlayList(data) {
			//渲染播放列表
        this.playMenu = document.getElementsByClassName("playMenu")[0];
        this.close = document.createElement("div");
        this.data = data;
        this.menuList = [];
        
    }

    PlayList.prototype = {
        renderList: function () {//渲染到页面
            var self = this;
            this.playMenu.style.transition = ".2s";
            this.close.className = "close";
            this.close.innerText = "关闭";
            this.data.forEach(function (item, i) {
                self.dd = document.createElement("dd");
                i == 0 ? self.dd.className = "active" : "";//默认给第一个选项选中状态
                self.dd.innerText = item.name;
                self.playMenu.appendChild(self.dd);
                self.menuList.push(self.dd);
                // liking(item.isLike);
            });

            this.playMenu.appendChild(this.close);
        },
        slideDown: function () { //下拉
            var disY = this.playMenu.offsetHeight;
            this.playMenu.style.transform = "translateY(" + disY + "px)";
            this.slideStatus = "down";
        },
        slideUp: function () { //上移
            this.playMenu.style.transform = "translateY(0px)";
            this.slideStatus = "up";
        },
        changeSelected: function (index) { 
            document.getElementsByClassName("active")[0].className = "";
            this.menuList[index].className = "active";
        }
    }

    player.ListControl = PlayList;
})(window.player || (window.player = {}))