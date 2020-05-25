//本模块用于控制歌曲的播放暂停等一系列操作
; (function (player) { 
    function AudioCreate(src) {
        this.audio1 = new Audio();//创建一个audio对象
        // this.src = src;
        this.status = "pause";//播放状态，便于控制播放
    }
    AudioCreate.prototype = {
		load: function (src) {
			//加载音乐
			this.audio1.src = src;
			this.audio1.load();
			// this.audio.pause();
		},
		play: function () {
			//播放音乐
			this.audio1.play();
			this.status = "playing";
		},
		pause: function () {
			//暂停音乐
			this.audio1.pause();
			this.status = "pause";
		},
		currentTime: function () { 
			// console.log(this.audio.currentTime);
			return this.audio1.currentTime;
		},
		totalTime: function () { 
			
			return this.audio1.duration;

		},
		isEnd() { 
			console.log(this.audio1.ended);
			return this.audio1.ended;
		}
	};

    player.audio =new AudioCreate();
})(window.player || (window.player = {}))