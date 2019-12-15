/*
 * https://github.com/netnr/workers
 * 
 * 2019-12-16
 * netnr
 * 
 */

//public_repo 填写你的 TOKEN
const YOUR_TOKEN = "";
//Allowed Repos 仓库白名单
const YOUR_REPOS = ["netnr/test", "netnr/static"];
//受限制的文件格式
const LIMIT_EXT = [".exe"];
//最大文件 MB
const MAX_SIZE = 50;

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

    //返回对象
    let outBody, outStatus = 204, outHeaders = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
    }), reqHeaders = new Headers(request.headers);

    try {

        //接收
        let tip = [], or, filename, pathname, ext, file, content;

        if (request.method == "POST") {
            //参数
            let sp = new URL(request.url).searchParams;

            console.log(sp.get("or"))

            //仓库
            or = sp.get("or") || "";
            //文件名
            filename = (sp.get("name") || "").trim().replace(/\//g, '');
            //自定义路径及名称
            pathname = (sp.get("pathname") || "").trim();
            //格式
            ext = "." + filename.split('.')[1];

            //文件binary转为base64编码
            let buffer = await request.arrayBuffer();
            content = await arrayBufferToBase64(buffer);

            if (!YOUR_REPOS.includes(or)) {
                tip.push("仅允许的仓库白名单：" + YOUR_REPOS.join())
            }
            if (filename.length < 3) {
                tip.push("参数name文件名无效")
            }
            if (ext == "" || LIMIT_EXT.includes(ext) || !ext.includes('.')) {
                tip.push("文件格式错误或受限制的文件格式：" + LIMIT_EXT.join())
            }
            if (buffer.byteLength > MAX_SIZE * 1024 * 1024) {
                tip.push("最大文件限制 " + MAX_SIZE + " MB");
            }
        } else {
            tip.push("基于 Token 授权上传（可限制格式的）文件到（白名单）GitHub仓库");
        }

        //需要忽略的请求
        if (tip.length) {
            tip.push("Source：https://github.com/netnr/workers");
            outBody = JSON.stringify(tip);
            outStatus = 200;
        } else {

            //（UTC + 08:00）北京时间
            let now = new Date(Date.now() + 8 * 3600 * 1000).toISOString().replace('Z', '');

            //路径及名称
            if (pathname == "") {
                pathname = now.replace(/-/g, '/').replace('T', '/').replace(/:/g, '').replace('.', '') + Math.random().toString().slice(-1);
            }

            //完整链接
            let uri = "https://api.github.com/repos/" + or + "/contents/" + pathname + ext;

            //调整头
            reqHeaders.set("Authorization", "token " + YOUR_TOKEN);
            reqHeaders.set("Content-Type", "application/json");

            //发起 fetch   
            let res = await fetch(uri, {
                method: "PUT",
                body: JSON.stringify({
                    message: "update",
                    content: content || file
                }),
                headers: reqHeaders
            });

            //成功
            if (res.status == 201) {
                let rj = await res.json();
                outBody = JSON.stringify(rj["content"]);
                outStatus = 200;
            } else {
                outBody = res.body;
                outStatus = res.status;
            }
        }
    } catch (err) {
        outBody = JSON.stringify(err.stack) || err;
    }

    return new Response(outBody, {
        status: outStatus,
        headers: outHeaders
    })
}

/**
 * buffer转成base64
 */
async function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i += 1) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};