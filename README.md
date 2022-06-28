English | [简体中文](README_zh-CN.md)

> ## Note: Blocking a large number of requests, please deploy it yourself

## 🧡 cors (Cloudflare Workers)
Support cross-domain request  
Convert HTTP to HTTPS

### Usage
- `https://cors.eu.org/{URL}`
- <https://cors.eu.org/https://api.github.com>
- <https://cors.eu.org/http://nginx.org/download/nginx-1.20.2.tar.gz>

```js
// Copy to the console and run
var url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
fetch(`https://cors.eu.org/${url}`).then(x => x.text()).then(console.log)
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
The total number of invocation requests per day is capped at 100,000. If the daily limit is reached, Pages will stop executing the function and fall back to providing only static resources.

Details: <https://developers.cloudflare.com/pages/platform/functions>

## Source
<https://github.com/netnr/workers>