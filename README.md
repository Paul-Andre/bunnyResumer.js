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