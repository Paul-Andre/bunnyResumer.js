mediadelivery.net/bunny.net video resumer

To make videos hosted by bunny.net (mediadelivery.net) automatically resume where they left off when they start playing, simply add the following to the footer of your page:

```html
<script src="//assets.mediadelivery.net/playerjs/player-0.1.0.min.js"></script>
<script>
function initResume(c){let a=new playerjs.Player(c),b=c.src,e=b.includes("autoplay=true");e&&(c.src=b.replace(/autoplay=true/,"autoplay=false"));a.on("ready",function(){b=b.split("?")[0];b=b.split("#")[0];b.includes("://")&&(b=b.split("://")[1]);let f="saved_video_time "+b,g=localStorage.getItem(f);if(g){let d=Math.max(0,parseFloat(g)-1);a.play();let k=setInterval(()=>{a.setCurrentTime(d);a.getCurrentTime(h=>{h>=d?(clearInterval(k),a.pause()):a.setCurrentTime(d)});a.setCurrentTime(d)},50)}else e&&
a.play();a.on("timeupdate",function(d){localStorage.setItem(f,d.seconds)})})}(function(){let c=Array.from(document.querySelectorAll("iframe")).filter(a=>a.src.includes("iframe.mediadelivery.net/embed"));for(let a=0;a<c.length;a++)initResume(c[a])})();
</script>
```

This script will automatically apply to all the mediadelivery.net videos embedded in the page. If you dynamically add a video to the page using javascript and want it to apply to it as well, call `initResume(yourVideoIframeHere)` on it.

You can look at the actual unminimized code in `bunnyResumer.js`.
