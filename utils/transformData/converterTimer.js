function transformerTimer(timer) {
    if(timer.indexOf(':') != -1) {
        return +timer.split(':')[0];
    } else {
        return false;
    }
}

module.exports = transformerTimer;