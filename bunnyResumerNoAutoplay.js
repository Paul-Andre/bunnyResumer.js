Array.from(document.querySelectorAll("iframe"))
.filter((b) => b.src.includes("iframe.mediadelivery.net/embed"))
.forEach((iframe) => {
    let url = iframe.src;
    if (!url.includes("rememberPosition=")) {
        url = url + (url.includes("?")?"&":"?") + "rememberPosition=true";
        iframe.src = url.replace(/autoplay=true/, "autoplay=false");
    }
  });