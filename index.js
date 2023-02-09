
function getUrlParam(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
};

const testCase = getUrlParam("id");
let scriptElm = document.createElement("script");
scriptElm.src = "./src/" + testCase + ".js";
document.body.appendChild(scriptElm);