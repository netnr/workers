/*
 * https://github.com/netnr/workers
 *
 * 2019-10-12 - 2021-03-10
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
            if (url.indexOf("://") == -1) {
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

    //日志接口（申请自己的应用修改密钥后可取消注释）
    //sematext.add(event, request, response);

    return response;

    // return new Response('OK', { status: 200 })
}

/**
 * 日志
 */
const sematext = {

    /**接口（从 https://sematext.com/ 申请并修改密钥） */
    api: "https://logsene-receiver.sematext.com/c7cb059a-4a50-4ceb-baeb-da27adb528bb/example/",

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
     * 构建发送主体
     * @param {any} request
     * @param {any} response
     */
    buildBody: (request, response) => {

        const hua = request.headers.get("user-agent")
        const hip = request.headers.get("cf-connecting-ip")
        const hrf = request.headers.get("referer")
        const url = new URL(request.url)

        const body = {
            method: request.method,
            statusCode: response.status,
            clientIp: hip,
            referer: hrf,
            userAgent: hua,
            host: url.host,
            path: url.pathname,
            proxyHost: null,
            proxyHeader: sematext.headersToObj(request.headers),
            cf: request.cf
        }

        if (body.path.includes(".") && body.path != "/" && !body.path.includes("favicon.ico")) {
            try {
                let purl = decodeURIComponent(body.path.substr(1));
                if (purl.indexOf("://") == -1) {
                    purl = "http://" + purl;
                }
                body.path = purl;
                body.proxyHost = new URL(purl).host;
            } catch { }
        }

        return {
            method: "POST",
            body: JSON.stringify(body)
        }
    },

    /**
     * 添加
     * @param {any} event
     * @param {any} request
     * @param {any} response
     */
    add: (event, request, response) => {
        const body = sematext.buildBody(request, response);
        event.waitUntil(fetch(sematext.api, body))
    }
};
