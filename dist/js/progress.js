!function(i){function t(){this.bar=document.getElementsByClassName("bar")[0],this.total=document.getElementsByClassName("allPlay")[0],this.progress=document.getElementsByClassName("nowPlay")[0],this.controlDot=document.getElementsByClassName("controlDot")[0],this.nowTime=document.getElementsByClassName("nowTime")[0],this.timer=null}t.prototype={controlPro:function(){var t=this;this.totalTime=i.audio.totalTime(),this.width=this.total.getBoundingClientRect().width,console.log(t.total.getBoundingClientRect().width),this.timer=setInterval(function(){t.currentTime=i.audio.currentTime(),t.curWidth=t.currentTime/t.totalTime*t.width,t.controlDot.style.left=t.curWidth-6+"px",t.progress.style.width=t.curWidth+"px",t.nowTime.innerText="0"+Math.floor(t.currentTime/60)+":"+parseInt(t.currentTime%60),console.log(t.currentTime,t.totalTime,t.width)},1e3)},clearTimer:function(){clearInterval(this.timer),this.controlDot.style.left="-2vw",this.progress.style.width=0,this.nowTime.innerText="00:0",i.audio.audio1.currentTime=0,self.currentTime=0,console.log(i.audio.audio1.currentTime)},dragBar:function(){var e=this;this.left=this.total.getBoundingClientRect().left,this.bar.addEventListener("touchstart",function(t){i.audio.audio1.currentTime=(t.touches[0].clientX-e.left)/e.width*e.totalTime},!1)}},i.progressBar=new t}(window.player||(window.player={}));