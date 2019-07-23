### Known issues

* [`XMLHttpRequest.getAllResponseHeaders`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders) will not normalize header names to lower case as on modern platforms. It's recommended to call `toLowerCase` before proceeding.
* Some platforms appear to have unlimited call stack. It's recommended to bear it in mind during debugging.
* Long pressing custom media buttons (e.g. rewind, red, green, play, pause) will trigger single keydown event.
