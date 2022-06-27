const converterTimer = require('../../utils/transformData/converterTimer');

function betweenMinutes(timer, initialTime, finalTime) {
    let minutes = converterTimer(timer);
    return minutes >= +initialTime && minutes <= +finalTime ? true : false;
}

module.exports = betweenMinutes;