/*
 * https://github.com/netnr/workers
 *
 * 2019-10-12 - 2021-03-08
 * netnr
 */

addEventListener('fetch', event => {
    event.passThroughOnException()

    event.respondWith(handleRequest(event))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(event) {
    const { request } = event;

    //请求头部、返回对象
    let reqHeaders = new Headers(request.headers),
        outBody, outStatus = 200, outStatusText = 'OK', outCt = null, outHeaders = new Headers({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": reqHeaders.get('Access-Control-Allow-Headers') || "Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With, Token, x-access-token"
        });

    try {
        //取域名第一个斜杠后的所有信息为代理链接
        let url = request.url.substr(8);
        url = decodeURIComponent(url.substr(url.indexOf('/') + 1));

        //需要忽略的代理
        if (request.method == "OPTIONS" || url.length < 3 || url.indexOf('.') == -1 || url == "favicon.ico" || url == "robots.txt") {
            //输出提示
            outBody = JSON.stringify({
                code: 0,
                usage: 'Host/{URL}',
                source: 'https://github.com/netnr/workers'
            });
            outCt = "application/json";
        }
        //阻断
        else if (url.toLowerCase().includes(".m3u8")) {
            outBody = JSON.stringify({
                code: 415,
                msg: 'The keyword ".m3u8" was blacklisted by the operator of this proxy.'
            });
            outCt = "application/json";
        }
        else {
            //补上前缀 http://
            if (url.toLowerCase().indexOf("http") == -1) {
                url = "http://" + url;
            }

            //构建 fetch 参数
            let fp = {
                method: request.method,
                headers: {}
            }

            //保留头部其它信息
            let he = reqHeaders.entries();
            for (let h of he) {
                if (!['content-length', 'content-type'].includes(h[0])) {
                    fp.headers[h[0]] = h[1];
                }
            }

            // 是否带 body
            if (["POST", "PUT", "PATCH", "DELETE"].indexOf(request.method) >= 0) {
                const ct = (reqHeaders.get('content-type') || "").toLowerCase();
                if (ct.includes('application/json')) {
                    fp.body = JSON.stringify(await request.json());
                } else if (ct.includes('application/text') || ct.includes('text/html')) {
                    fp.body = await request.text();
                } else if (ct.includes('form')) {
                    fp.body = await request.formData();
                } else {
                    fp.body = await request.blob();
                }
            }

            // 发起 fetch
            let fr = (await fetch(url, fp));
            outCt = fr.headers.get('content-type');
            outStatus = fr.status;
            outStatusText = fr.statusText;
            outBody = fr.body;
        }
    } catch (err) {
        outCt = "application/json";
        outBody = JSON.stringify({
            code: -1,
            msg: JSON.stringify(err.stack) || err
        });
    }

    //设置类型
    if (outCt && outCt != "") {
        outHeaders.set("content-type", outCt);
    }

    let response = new Response(outBody, {
        status: outStatus,
        statusText: outStatusText,
        headers: outHeaders
    })

    //输出日志（从 https://logflare.app/ 申请并修改密钥后可取消注释）
    //logflare.add(event, logflare.buildBody(request, response));

    return response;

    // return new Response('OK', { status: 200 })
}

/**日志 */
const logflare = {

    /** 从 https://logflare.app/ 申请并改为自己的密钥 */
    config: {
        sourceKey: "7e4493f8-0275-4725-8d05-8b46e134098d",
        apiKey: "MC96pX5DvmMs"
    },

    /**
     * 头转object
     * @param {any} headers
     */
    headersToObj: headers => {
        const obj = {}
        Array.from(headers).forEach(([key, value]) => {
            obj[key.replace(/-/g, "_")] = value
        })
        return obj
    },

    /**
     * 构建日志输出
     * @param {any} request
     */
    buildLogEntry: (request, response) => {
        const uAgent = request.headers.get("user-agent")
        const cIP = request.headers.get("cf-connecting-ip")
        return `${request.method} | ${response.status} | ${cIP} | ${request.url} | ${uAgent}`;
    },

    /**
     * 构建元数据
     * @param {any} request
     * @param {any} response
     */
    buildMetaData: (request, response) => {
        return {
            response: {
                headers: logflare.headersToObj(response.headers),
                status_code: response.status
            },
            request: {
                url: request.url,
                method: request.method,
                headers: logflare.headersToObj(request.headers),
                cf: request.cf,
            }
        }
    },

    /**
     * 构建发送主体
     * @param {any} request
     * @param {any} response
     */
    buildBody: (request, response) => {

        return {
            method: "POST",
            headers: {
                "X-API-KEY": logflare.config.apiKey,
                "Content-Type": "application/json",
                "User-Agent": `Cloudflare Worker`
            },
            body: JSON.stringify({
                source: logflare.config.sourceKey,
                log_entry: logflare.buildLogEntry(request, response),
                metadata: logflare.buildMetaData(request, response)
            })
        }
    },

    /**
     * 添加
     * @param {any} event
     * @param {any} body
     */
    add: (event, body) => {
        event.waitUntil(fetch("https://api.logflare.app/logs", body))
    }
};
