const convertScore = require('../../utils/transformData/converterScore');

function homeLosing(data) {
    let score = convertScore(data);
    return score.homeScore < score.awayScore;
}

function AwayLosing(data) {
    let score = convertScore(data);
    return score.homeScore > score.awayScore;
}

function draw(data) {
    let score = convertScore(data);
    return score.homeScore == score.awayScore;
}

module.exports = {
    homeLosing,
    AwayLosing,
    draw
}