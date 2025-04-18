Array.from(document.querySelectorAll("iframe"))
.filter((b) => b.src.includes("iframe.mediadelivery.net/embed"))
.forEach((iframe) => {
    let url = iframe.src;
    if (!url.includes("rememberPosition=")) {
        iframe.src = url + (url.includes("?")?"&":"?") + "rememberPosition=true";
    }
  });
