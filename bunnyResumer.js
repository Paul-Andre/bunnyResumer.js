// Use this script by adding the following to the end of your HTML file:
// <script src="https://cdn.jsdelivr.net/gh/adamgibbons/adamgibbons.github.io@master/adamgibbons.github.io/plugin.js"></script>

// This script will automatically play videos from the beginning when the page loads.

"use strict";


function initResume(iframe) {
  const DONT_AUTOPLAY_FROM_MIDDLE = true;

  let player = new playerjs.Player(iframe);
  let url = iframe.src;
  let hasAutoplay = url.includes("autoplay=true");

  if (hasAutoplay && DONT_AUTOPLAY_FROM_MIDDLE) {
    iframe.src = url.replace(/autoplay=true/, "autoplay=false");
  }

  player.on('ready', function () {
    // Clean the url to then use it as a key for localStorage.
    // remove the query string from the url
    url = url.split("?")[0];
    // remove the hash from the url
    url = url.split("#")[0];
    // remove the protocol from the url
    if (url.includes("://")) {
      url = url.split("://")[1];
    }

    let key = "saved_video_time " + url;
    let value = localStorage.getItem(key);
  
    if (value) {
      let targetTime = Math.max(0, parseFloat(value) - 1);

      // The purpose of the following block of code is to do what you would expected
      // player.setCurrentTime(targetTime) to do.
      // The problem is setCurrentTime() does not work unless the video has started playing.
      // Moreover, there is no way to reliably make the video play from JavaScript
      // because the browser will block autoplay.
      //
      // However, by calling player.play() and then calling setCurrentTime over and over really fast,
      // I seem to find a "window of opportunity" during which the player thinks the video is playing,
      // yet the browser hasn't "caught on" and canceled my attempt at autoplaying the video.
      player.play();
      let interval = setInterval(() => {
        player.setCurrentTime(targetTime);
        player.getCurrentTime((x) => {
          if (x >= targetTime) {
            clearInterval(interval);
            if (DONT_AUTOPLAY_FROM_MIDDLE || !hasAutoplay) {
              player.pause();
            }
          } else {
            player.setCurrentTime(targetTime);
          }
        });
        player.setCurrentTime(targetTime);
      }, 50);
    } else {
      // In the case where no  
      if (hasAutoplay) {
        player.play();
      }
    };

    player.on('timeupdate', function (timing) {
      localStorage.setItem(key, timing.seconds);
    });

  });
}


(function() {
  let videoIframes = Array.from(document.querySelectorAll("iframe")).filter((b) => b.src.includes("iframe.mediadelivery.net/embed"));

  for (let i = 0; i < videoIframes.length; i++) {
    initResume(videoIframes[i]);
  }
})();
