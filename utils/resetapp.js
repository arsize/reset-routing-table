/**
 * 重置app.json路由表
 */
const fs = require("fs");
const firstPage = "index";

let files = fs.readFileSync("../app.json", "utf-8");
if (files) {
    let tempObj = JSON.parse(files);
    let newRoute = readPages("../pages")
    tempObj.pages = diffRoute(newRoute, handleBakRoute(newRoute))
    fs.writeFileSync("../app.json", JSON.stringify(tempObj, null, "\t"), "utf-8");
    let temp = {
        "route": tempObj.pages
    }
    fs.writeFileSync("./routebak.json", JSON.stringify(temp, null, "\t"), "utf-8")
}

/**
 * @newRoute Array 实时生成路由
 */
function diffRoute(newRoute, bakroute) {
    let tempArr = []
    let leftArr = bakroute
    let rightArr = []
    newRoute.map(item => {
        if (!leftArr.includes(item)) {
            rightArr.push(item)
        }
    })
    tempArr = leftArr.concat(rightArr)
    return tempArr
}
// 清理bak路由
function handleBakRoute(newRoute) {
    let bakroute2
    try {
        let bakroute = fs.readFileSync("./routebak.json", "utf-8")
        bakroute2 = JSON.parse(bakroute).route.filter(item => {
            if (newRoute.includes(item)) {
                return true
            }
        })
    } catch (err) {
        let temp = {
            "route": newRoute
        }
        console.log("正在生成route...")
        fs.writeFileSync("./routebak.json", JSON.stringify(temp, null, "\t"), "utf-8")
        bakroute2 = newRoute
    }
    return bakroute2
}

function readPages(startPath) {
    let tempNamesArr = [];
    let files = fs.readdirSync(startPath);
    files.map(item => {
        if (item != firstPage && item != 'component') {
            tempNamesArr.push(`pages/${item}/index`);
        }
    });
    tempNamesArr.unshift(`pages/${firstPage}/index`);
    return tempNamesArr;
}
