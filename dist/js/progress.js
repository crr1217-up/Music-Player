!function(t){function e(){this.bar=document.getElementsByClassName("bar")[0],this.total=document.getElementsByClassName("allPlay")[0],this.progress=document.getElementsByClassName("nowPlay")[0],this.controlDot=document.getElementsByClassName("controlDot")[0],this.nowTime=document.getElementsByClassName("nowTime")[0],this.timer=null}e.prototype={controlPro:function(){var e=this;this.totalTime=t.audio.totalTime(),this.width=this.total.getBoundingClientRect().width,this.timer=setInterval((function(){e.currentTime=t.audio.currentTime(),e.curWidth=e.currentTime/e.totalTime*e.width,e.controlDot.style.left=e.curWidth-6+"px",e.progress.style.width=e.curWidth+"px",e.nowTime.innerText="0"+Math.floor(e.currentTime/60)+":"+parseInt(e.currentTime%60)}),1e3)},clearTimer:function(){clearInterval(this.timer),this.controlDot.style.left="-2vw",this.progress.style.width=0,this.nowTime.innerText="00:0",t.audio.audio1.currentTime=0,self.currentTime=0},dragBar:function(){var e=this;this.left=this.total.getBoundingClientRect().left,this.bar.addEventListener("touchstart",(function(i){t.audio.audio1.currentTime=(i.touches[0].clientX-e.left)/e.width*e.totalTime}),!1)}},t.progressBar=new e}(window.player||(window.player={}));