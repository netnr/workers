# Cloudflare Workers

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
// 二进制的流的方式发送文件，整个上传内容都为文件内容， 其他参数在URL上
binary

// url 参数
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

---

### 通知

额度顶不住了，使用量大请用自己的账号搭建服务吧，谢谢！！！

![图片说明](https://static.netnr.com/2019/11/03/0752457693.png)

如果你不想麻烦，也许你可以[赞助](https://ss.netnr.com/contact)我升级为付费用户 $5/month 1千万请求量，请备注来自 cfw