# mta2json
Proxies requests to the MTA for realtime transit feed data, and return the results as JSON.

Why?

 * This is a pain to do in the browser.  It's possible, but a pain.
 * You still can't *request* it from the browser because the MTA's server lacks a `Access-Control-Allow-Origin` header.
 * Even if you are consuming on the server side, you might not have a good protoBuf library for your platform since it's not incredibly common (and you certainly don't want to reinvent the wheel here).

Note: you almost certainly want to be running this in the same datacenter as where you are consuming it, since the decoded JSON output is going to be MUCH larger than the binary protoBuf file.

This is just a simple proxy that does NO CACHING and initiates a new request to the MTA each time, so if you plan to hit it often put a caching layer in front of it.

## Configuration
Set the following as environment variables:

  * `MTA_KEY` your MTA API KEY
  * `FEED_ID` the ID of the feed you want from the MTA (optional)  
    - Main feed is `0`, which we will use by default.
    - New feed with the L train is `2`.
  * `PORT` if you wish to override the default port we listen on (3000)
