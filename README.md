# Make bunny.net (mediadelivery.net) videos remember position

To make videos hosted by bunny.net (mediadelivery.net) automatically resume where they left off when they start playing, add `&rememberPosition=true` to the src URL of the embedded iframe.

Or, alternatively, to automatically do it on all videos without having to manually change each of their URLs, simply add this script to the footer of your website:

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

If you want videos to remember their positions, and you would also like to automatically disable autoplay on all videos (because videos auto-playing from the middle can be confusing), use this version instead:

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

And if you ever want to override this behavior for a specific video, you can do that by explicitly adding `&rememberPosition=false` or `&rememberPosition=true` to its src URL.