# Make bunny.net (mediadelivery.net) videos remember position

To make videos hosted by bunny.net (mediadelivery.net) automatically resume where they left off when they start playing, add `rememberPosition=true` to the src url of the embedded iframe.

Or, alternatively, to do it automatically without manually having to change the url to all your embedded videos, simply add this script to the footer of your website.

```html
<script>
Array.from(document.querySelectorAll("iframe"))
.filter((iframe) => iframe.src.includes("iframe.mediadelivery.net/embed"))
.forEach((iframe) => {
    let url = iframe.src;
    if (!url.includes("rememberPosition=")) {
        iframe.src = url + (url.includes("?")?"&":"?") + "rememberPosition=true";
    }
  });
</script>
```

If you also want to disable autoplay (because videos auto-playing from the middle can be confusing), add this to the footer of your website instead:

```html
<script>
Array.from(document.querySelectorAll("iframe"))
.filter((b) => b.src.includes("iframe.mediadelivery.net/embed"))
.forEach((iframe) => {
    let url = iframe.src;
    if (!url.includes("rememberPosition=")) {
        iframe.src = url.replace(/autoplay=true/, "autoplay=false") + (url.includes("?")?"&":"?") + "rememberPosition=true";
    }
  });
</script>
```

You can override this behavior on specific videos by explicitly adding `rememberPosition=false` or `rememberPosition=true` to the url of each embedded video.