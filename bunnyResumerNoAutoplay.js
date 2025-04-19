Array.from(document.querySelectorAll("iframe"))
.filter((iframe) => iframe.src.includes("iframe.mediadelivery.net/embed"))
.forEach((iframe) => {
    let url = iframe.src;
    if (!url.includes("rememberPosition=")) {
        iframe.src = url.replace(/autoplay=true/, "autoplay=false") + (url.includes("?")?"&":"?") + "rememberPosition=true";
    }
  });