!function(t,e){function a(){this.index=0,this.dataList=[],this.indexCre=null,this.lock=!0,this.list=null,this.timer=null}a.prototype={init(){this.play=document.getElementsByClassName("play")[0],this.prev=document.getElementsByClassName("prev")[0],this.next=document.getElementsByClassName("next")[0],this.playlist=document.getElementsByClassName("playlist")[0],this.img=document.getElementsByTagName("img")[0],this.getData(),this.renderPage()},getData(){var a=this;t.ajax({url:"../mock/data.json",type:"GET",success:function(t){a.dataList=t,a.sonList(),a.indexCre=new e.IndexCre(t.length),a.index=a.indexCre.index,a.renderPage(a.index),a.audioCre(),a.bar()}})},renderPage(t){e.renderObj.render(this.dataList[t]),e.renderObj.info(this.dataList[t]),e.renderObj.liking(this.dataList[t].isLike),e.audio.load(this.dataList[t].audioSrc),this.isPlay()},isPlay(){"playing"===e.audio.status?(e.progressBar.clearTimer(),e.audio.play(),this.play.className="play playing",this.rotate(0),this.bar()):"pause"===e.audio.status&&(e.audio.pause(),this.play.className="play",clearInterval(self.timer))},audioCre(){var t=this;this.play.addEventListener("touchend",(function(){if("pause"==e.audio.status){e.audio.play(),t.play.className="play playing";var a=t.img.dataset.rotate||0;t.rotate(a),t.bar()}else e.audio.pause(),t.play.className="play",clearInterval(t.timer)}),!1),this.prev.addEventListener("touchend",(function(){e.audio.status="playing";var a=t.indexCre.prev();t.list.changeSelected(a),t.renderPage(a)}),!1),this.next.addEventListener("touchend",(function(){e.audio.status="playing";var a=t.indexCre.next();t.list.changeSelected(a),t.renderPage(a)}),!1),document.getElementsByClassName("bar")[0].addEventListener("touchend",()=>{if(t.bar(),e.audio.status="pause"){e.audio.status="playing",e.audio.play(),t.play.className="play playing";var a=t.img.dataset.rotate||0;t.rotate(a)}})},rotate:function(t){var e=this;clearInterval(this.timer),this.timer=setInterval((function(){t=+t+.2,e.img.style.transform="rotate("+t+"deg)",e.img.dataset.rotate=t}),1e3/60)},bar:function(){e.progressBar.controlPro(),e.progressBar.dragBar()},sonList:function(){var t=this;this.list=new e.ListControl(this.dataList),this.list.renderList(),this.close=document.getElementsByClassName("close")[0],this.playlist.addEventListener("touchend",(function(){t.list.slideUp()}),!1),this.close.addEventListener("touchend",(function(){t.list.slideDown()}),!1),this.list.menuList.forEach((function(a,i){a.addEventListener("touchend",(function(){"active"!=this.className&&(t.list.changeSelected(i),e.audio.status="playing",t.renderPage(i),t.list.slideDown())}),!1)}))}};var i=new a;i.init(),e.dataList=i.dataList,e.init=i}(window.Zepto,window.player||(window.player={}));