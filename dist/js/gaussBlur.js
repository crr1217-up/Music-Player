(window.player||(window.player={})).blurImg=function(t,a=document.body){var e=document.createElement("canvas");e.width=100,e.height=100;var r=e.getContext("2d"),o=new Image;o.src=t,o.onload=function(){r.drawImage(o,0,0,o.width,o.height,0,0,e.width,e.height);var t=function(t){var a,e,r,o,h,n,d,g,i,f,w=t.data,u=t.width,c=t.height,m=[],l=0;for(n=1/(5*Math.sqrt(2*Math.PI)),h=-.02,d=0,a=-10;a<=10;a++,d++)o=n*Math.exp(h*a*a),m[d]=o,l+=o;for(d=0,f=m.length;d<f;d++)m[d]/=l;for(e=0;e<c;e++)for(a=0;a<u;a++){for(r=o=h=n=0,l=0,g=-10;g<=10;g++)(i=a+g)>=0&&i<u&&(r+=w[d=4*(e*u+i)]*m[g+10],o+=w[d+1]*m[g+10],h+=w[d+2]*m[g+10],l+=m[g+10]);w[d=4*(e*u+a)]=r/l,w[d+1]=o/l,w[d+2]=h/l}for(a=0;a<u;a++)for(e=0;e<c;e++){for(r=o=h=n=0,l=0,g=-10;g<=10;g++)(i=e+g)>=0&&i<c&&(r+=w[d=4*(i*u+a)]*m[g+10],o+=w[d+1]*m[g+10],h+=w[d+2]*m[g+10],l+=m[g+10]);w[d=4*(e*u+a)]=r/l,w[d+1]=o/l,w[d+2]=h/l}return t}(r.getImageData(0,0,e.width,e.height));r.putImageData(t,0,0);var h=e.toDataURL();a.style.backgroundImage="url("+h+")"}};