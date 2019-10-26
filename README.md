# Cloudflare Workers

## ❤ api
常用的接口

### 接口
- 查看列表：<https://api.zme.ink>

---

## ❤ cors
支持跨域请求（转换不支持跨域请求的接口），可直接发起 ajax、fetch  
支持HTTPS（解决远程数据接口不支持HTTPS）

### 接口
- `Host/{URL}`
- `https://cors.zme.ink/{URL}`

### 示例
- <https://cors.zme.ink/https://api.github.com>
- <https://cors.zme.ink/http://nginx.org/download/nginx-1.16.1.tar.gz>

```js
// 拷贝到控制台运行
var $url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
fetch("https://cors.zme.ink/" + $url).then(x => x.text()).then(console.log)
```

---

## ❤ raw
GitHub 仓库内容直接浏览，替换 `raw.githubusercontent.com`  
处理 svg、js、css 输出的 `Content-Type`

### 接口
- `Host/{name}/{repos}/{branch}/{path}`
- 替换 `githubusercontent.com` 为 `zme.ink`

### 示例
- <https://raw.githubusercontent.com/netnr/static/master/favicon.svg>
- <https://raw.zme.ink/netnr/static/master/favicon.svg>

---

## ❤ upload
基于 Token 授权上传（可限制格式的）文件到（白名单）GitHub仓库

### 接口
- `upload.zme.ink`
- `POST`请求，参数：

```
content: 文件base64编码
or:{owner}/{repos} 账号/仓库
name:filename.jpg 文件名
pathname:（可选）自定义路径
```

### 示例
- https://gs.netnr.com

---

### 安装
- clone 项目，进入子目录（代表一个 worker）
- 编辑 `index.js` 和 `wrangler.toml` (配置密钥)
- `wrangler config` 配置邮箱、密钥
- `wrangler build` 构建
- `wrangler publish` 发布
- 详细文档：<https://developers.cloudflare.com/workers/quickstart>

### 套餐
 CPU | 日请求 | 突发速率 | 脚本大小 
 ---- | ---- | ---- | ---- 
 10ms | 100,000 | 10分钟1000个请求 | 压缩后1M

详情：https://developers.cloudflare.com/workers/about/limits/

### Source
- <https://github.com/netnr/workers>