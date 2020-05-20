//本模块用于控制歌曲的播放暂停等一系列操作
; (function (player) { 
    function AudioCreate(src) {
        this.audio = new Audio();//创建一个audio对象
        // this.src = src;
        this.status = "pause";//播放状态，便于控制播放
    }
    AudioCreate.prototype = {
			load: function (src) {
				//加载音乐
				this.audio.src = src;
				this.audio.load();
				// this.audio.pause();
			},
			play: function () {
				//播放音乐
				this.audio.play();
				this.status = "playing";
			},
			pause: function () {
				//暂停音乐
				this.audio.pause();
				this.status = "pause";
			},
		};

    player.audio =new AudioCreate();
})(window.player || (window.player = {}))