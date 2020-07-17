English | [简体中文](README_zh-CN.md)

# Cloudflare Workers

## ❤ cors
Support cross-domain request  
Convert HTTP to HTTPS

### Interface
- `Host/{URL}`
- `https://cors.zme.ink/{URL}`

### Demo
- <https://cors.zme.ink/https://api.github.com>
- <https://cors.zme.ink/http://nginx.org/download/nginx-1.16.1.tar.gz>

```js
// Copy to the console and run
var $url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
fetch("https://cors.zme.ink/" + $url).then(x => x.text()).then(console.log)
```

---

## ❤ raw
Browse the contents of the GitHub repository directly, replacing `raw.githubusercontent.com`  
Handle `Content-Type` output by svg, js, css

### Interface
- `Host/{name}/{repos}/{branch}/{path}`
- Replace `githubusercontent.com` with `zme.ink`

### Demo
- <https://raw.githubusercontent.com/netnr/static/master/favicon.svg>
- <https://raw.zme.ink/netnr/static/master/favicon.svg>

---

## ❤ upload
Upload files to the GitHub repository based on Token authorization

### Interface
- `upload.zme.ink`
- `POST` request, parameters:

```
// The file is sent in a binary stream, the entire upload content is the file content, and other parameters are on the URL
binary

// url parameters
or:{owner}/{repos}
name:filename.jpg
pathname:(Optional) Custom path
```

### Demo
- https://gs.netnr.com

---

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