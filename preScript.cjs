/**
 * 删除文件夹下所有问价及将文件夹下所有文件清空
 * @param {*} path 
 */
const fs = require('fs')

function emptyDir(path) {
    const files = fs.readdirSync(path);
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            emptyDir(filePath);
        } else {
            fs.unlinkSync(filePath);
            console.log(`删除${file}文件成功`);
        }
    });
}

/**
* 删除指定路径下的所有空文件夹
* @param {*} path 
*/
function rmEmptyDir(path, level = 0) {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
        let tempFile = 0;
        files.forEach(file => {
            tempFile++;
            rmEmptyDir(`${path}/${file}`, 1);
        });
        if (tempFile === files.length && level !== 0) {
            fs.rmdirSync(path);
        }
    }
    else {
        level !== 0 && fs.rmdirSync(path);
    }
}

/**
* 清空指定路径下的所有文件及文件夹
* @param {*} path 
*/
function clearDir(path) {
    console.log('开始删除')
    emptyDir(path);
    rmEmptyDir(path);
    console.log('结束删除')
}

clearDir('./dist')
// clearDir('./public/assets/content')