//此模块用于歌曲播放索引控制
; (function (player) {
    function Index(len) { 
        this.index = 0;
        this.len = len;
    }
    Index.prototype = {
            //这个方法用来取上一个索引（上一首）
        prev:function() {
            return this.get(-1);    //切到上一首
        },

        //这个方法用来取下一个索引（下一首）
        next:function() {
            return this.get(1);    //切到下一首
        },

        //用来获取索引，参数为+1或者-1
        get:function(val) {
            this.index = (this.index + val + this.len) % this.len;//加this.len是用来处理左边出界的情况
            return this.index;
        }
    }    
    player.IndexCre = Index;
})(window.player || (window.player = {}))