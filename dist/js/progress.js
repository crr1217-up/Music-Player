!function(t){function e(){this.bar=document.getElementsByClassName("bar")[0],this.total=document.getElementsByClassName("allPlay")[0],this.progress=document.getElementsByClassName("nowPlay")[0],this.controlDot=document.getElementsByClassName("controlDot")[0],this.nowTime=document.getElementsByClassName("nowTime")[0],this.timer=null}e.prototype={controlPro:function(){var e=this;this.width=this.total.getBoundingClientRect().width,this.timer=setInterval((function(){e.currentTime=t.audio.currentTime(),e.totalTime=t.audio.totalTime(),e.curWidth=e.currentTime/e.totalTime*e.width,e.controlDot.style.transform="translate("+e.curWidth+"px)",e.progress.style.width=e.curWidth+"px";let i=Math.floor(e.currentTime/60),n=parseInt(e.currentTime%60);i<10&&(i="0"+i),n<10&&(n="0"+n),e.nowTime.innerText=i+":"+n}),1e3)},clearTimer:function(){clearInterval(this.timer),this.controlDot.style.left="-2vw",this.progress.style.width=0,this.nowTime.innerText="00:0",t.audio.audio1.currentTime=0},dragBar:function(){var e=this;this.left=this.total.getBoundingClientRect().left,this.bar.addEventListener("touchstart",(function(i){e.startX=i.touches[0].clientX,t.audio.audio1.currentTime=(e.startX-e.left)/e.width*e.totalTime}),!1),this.bar.addEventListener("touchmove",i=>{t.audio.pause(),e.moveX=i.changedTouches[0].clientX,t.audio.audio1.currentTime=(e.moveX-e.left)/e.width*e.totalTime}),this.bar.addEventListener("touchend",e=>{t.audio.play()})}},t.progressBar=new e}(window.player||(window.player={}));