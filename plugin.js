// Use this script by adding the following to the end of your HTML file:
// <script
// <script src="https://cdn.jsdelivr.net/gh/adamgibbons/adamgibbons.github.io@master/adamgibbons.github.io/plugin.js"></script>
// This script will automatically play videos from the beginning when the page loads.
// <

"use strict";

let videoIframes = Array.from(document.querySelectorAll("iframe")).filter((b) => b.src.includes("iframe.mediadelivery.net/embed"));

const dontAutoplayFromMiddle = true;
let autoplayFromMiddle = false;

for (let i = 0; i < videoIframes.length; i++) {
  let iframe;
  let player;
  iframe = videoIframes[i];
  player = new playerjs.Player(iframe);

  let url = iframe.src;
  let hasAutoplay = url.includes("autoplay=true");

  let key = "saved_video_time " + url;
  console.log(key)
  let value = localStorage.getItem(key);
  console.log(value)

  value

  if (hasAutoplay && !autoplayFromMiddle) {
    // remove the autoplay parameter from the url if we 
    iframe.src = url.replace(/autoplay=true/, "autoplay=false");
  }

  player.on('ready', function () {

    // remove the query string from the url
    url = url.split("?")[0];
    // remove the hash from the url
    url = url.split("#")[0];
    // remove the protocol from the url
    if (url.includes("://")) {
      url = url.split("://")[1];
    }

    

    if (value) {
      let targetTime = Math.max(0, parseFloat(value) - 1);

      // The purpose of the following block of code is to "just" do what you would expected
      // player.setCurrentTime(savedTime) to do.
      // The problem is setCurrentTime() does not work unless the video has started playing.
      // The other problem is that there is no way to reliably make the video play from code either
      // since the browser blocks autoplay.
      // However, by calling player.play() and then calling setCurrentTime over and over really fast,
      // I seem to find a "window of time" during which the player thinks the video is playing,
      // and the browser hasn't yet "caught on" and canceled my attempt at autoplaying the video.
      player.play();
      let interval = setInterval(() => {
        player.setCurrentTime(targetTime);
        player.getCurrentTime((x) => {
          if (x >= targetTime) {
            clearInterval(interval);
            if (!autoplayFromMiddle || !hasAutoplay) {
              player.pause();
              // let interval2 = setInterval(() => {
              //   player.pause();
              //   if ()
              // }, 50);
            }
            console.log("Current time (interval cleared): " + x);
          } else {
            player.setCurrentTime(targetTime);
            console.log("Current time: " + x);
          }
        });
        player.setCurrentTime(targetTime);
      }, 50);


    } else {
      // In the case where I had removed the autoplay parameter from the url, and the 
      if (hasAutoplay) {
        player.play();
      }
    };


    player.on('timeupdate', function (timing) {
      localStorage.setItem(key, timing.seconds);
    });
  });


}



