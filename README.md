English | [简体中文](README_zh-CN.md)

# Cloudflare Workers

> # 2020-12-11 Cloudflare banned zme.ink
> https://netnr-proxy.openode.io/

## ❤ cors
Support cross-domain request  
Convert HTTP to HTTPS

### Interface
- `Host/{URL}`
- `https://cors.netnr.workers.dev/{URL}`

### Demo
- <https://cors.netnr.workers.dev/https://api.github.com>
- <https://cors.netnr.workers.dev/http://nginx.org/download/nginx-1.16.1.tar.gz>

```js
// Copy to the console and run
var $url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
fetch("https://cors.netnr.workers.dev/" + $url).then(x => x.text()).then(console.log)
```

### Install
- clone the project and enter the subdirectory (representing a worker)
- Edit `index.js` and `wrangler.toml` (configuration key)
- `wrangler config` configure mailbox and key
- `wrangler build` build
- `wrangler publish` release
- Detailed documentation: <https://developers.cloudflare.com/workers/quickstart>

### Price
  CPU  | Daily request | Burst rate | Script size
  ---- | ---- | ---- | ----
  10ms | 100,000 | 1000 requests in 10 minutes | 1M after compression

Details: https://developers.cloudflare.com/workers/about/limits/

### Source
- <https://github.com/netnr/workers>

---

### Notice
The amount can't hold up, please use your account to build the service if you use a lot, thank you! ! !

![overflow](https://s1.zme.ink/2019/11/03/0752457693.png)

If you don’t want to trouble, maybe you can [sponsor](https://zme.ink) I upgrade to a paid user $5/month 10 million requests, please note from cfw