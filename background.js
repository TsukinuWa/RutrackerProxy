
function isAllowedHost(host) {
    const allowedDomains = [
        "rutracker.org",
        "rutracker.cc"
    ];

    return allowedDomains.some(
        domain => host === domain || host.endsWith("." + domain)
    );
}

function handleProxyRequest(requestInfo) {
    const url = new URL(requestInfo.url);

    const isProxied = isAllowedHost(url.hostname);

    if (!isProxied) {
        return { type: "direct" };
    }
        console.log("Proxying request to:", url.href);
        return {
            type: "https",
            host: "cdn.klukva.mom",
            port: 443,
            proxyAuthorizationHeader: "Basic " + btoa("6c29ae4633dc6e47f0ca0abd81c92f2f:b9884157a7282faec1d1bedd5cb5756b")
        };
}

browser.proxy.onRequest.addListener(handleProxyRequest, {
  urls: ["<all_urls>"],
});
