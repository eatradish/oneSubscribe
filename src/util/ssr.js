"use strict";
exports.__esModule = true;
function ssr(nodes) {
    var a = [];
    var ssrServers = '';
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var i = nodes_1[_i];
        if (i.type == 'SSR') {
            a.push(i.info);
        }
    }
    for (var i in a) {
        var proto = '';
        if (a[i].obfs === "none" || a[i].obfs === "") {
            a[i].obfs = 'plain';
        }
        if (a[i].proto !== "none" || a[i].obfs !== "" || a[i].obfs !== "origin") {
            // a[i].proto = 'plain'
            proto = '&' + 'protoparam=';
        }
        var remarks = Buffer.from(a[i].title).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        var base64Pw = Buffer.from(a[i].password).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        var group = Buffer.from("ONESubscribe").toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        var url = '' + a[i].host + ':' + a[i].port + ':' + a[i].proto + ':' + a[i].method
            + ':' + a[i].obfs + ':' + base64Pw + '/?' + 'obfsparam='
            + a[i].obfsParam
            + proto
            // + a[i].protoParam 
            + '&' + 'remarks=' + remarks + '&' + 'group=' + group;
        //  + '&udpport=0&uot=0'
        var baseSSR = Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        var server = Buffer.from('ssr://' + baseSSR);
        ssrServers = ssrServers + server + '\n';
    }
    return ssrServers;
}
exports.ssr = ssr;
var main = function () {
    var obj = {
        type: "SSR",
        info: {
            title: 'abc',
            host: 'cdn.jp.baiduapi.xyz',
            port: '1025',
            password: 'abcdefg',
            method: 'chacha20-ietf',
            obfs: "http_simple",
            obfsParam: "static.hdslb.com.w.kunlunhuf.com",
            proto: "auth_sha1_v4"
        }
    };
    console.log(ssr([obj]));
};
main();
