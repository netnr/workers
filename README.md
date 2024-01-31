English | [简体中文](README_zh-CN.md)

> ### To block a large number of requests, please deploy it yourself. WAF has blocked keywords .m3u8 .ts .m4 .acc .tv tv. .live .stream, etc. (dynamically adjusted according to logs)
> ### 2024-01-31 For unrestricted proxy service please use https://seep.eu.org

## 🧡 cors (Cloudflare Workers)
Support cross-domain request  
Convert HTTP to HTTPS

### Usage
- `https://cors.eu.org/{URL}`
- <https://cors.eu.org/https://api.github.com>
- <https://cors.eu.org/http://nginx.org/download/nginx-1.20.2.tar.gz>

```js
// Copy to the console and run
var url = "nginx.org/en/CHANGES";
await (await fetch(`https://cors.eu.org/${url}`)).text();
```

### Price
CPU | Daily request | Burst rate | Script size
--- | --- | --- | ---
10ms | 100,000 | 1000 requests in 10 minutes | 1M after compression

Details: <https://developers.cloudflare.com/workers/about/limits/>

The amount can't hold up, please use your account to build the service if you use a lot, thank you! ! !  
![overflow](https://gs.zme.ink/2019/11/03/0752457693.png)

## 🧡 pages (Cloudflare Pages Functions )

### Usage
- `https://seep.eu.org/{URL}`
- Demo: <https://seep.eu.org/https://api.github.com>

### Limit
Cloudflare Pages Functions access to pure http will have a certificate error Invalid SSL certificate `Error code 526`

Details: <https://developers.cloudflare.com/pages/platform/functions>

## Source
<https://github.com/netnr/workers>