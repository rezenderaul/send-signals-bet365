const appm = require('./strategies/itemStrategies/appm');
const betweenMinutes = require('./strategies/itemStrategies/betweenMinutes');
const { cornersAll } = require('./strategies/itemStrategies/corners');
const { homeLosing, draw } = require('./strategies/itemStrategies/score');
const telegram = require('./telegraf/telegraf');
const addToAlreadySent = require('./utils/controlSignalSend');

function getData(matchesArr, alreadySent) {

    const data = [];

    matchesArr
        .filter(match => betweenMinutes(match.timer, 30, 37))
        .filter(match => appm(match.timer, match.attacksAndPossession) >= 1.3)
        .filter(match => cornersAll(match.cardsAndCorners) >= 3)
        .filter(match => homeLosing(match.score) || draw(match.score))
        .filter(match => addToAlreadySent(match.linkOfMatch, alreadySent, 10))
        .map(match => data.push(setObj(match)))

    matchesArr
        .filter(match => betweenMinutes(match.timer, 82, 85))
        .filter(match => appm(match.timer, match.attacksAndPossession) >= 1.3)
        .filter(match => addToAlreadySent(match.linkOfMatch, alreadySent, 10))
        .map(match => data.push(setObj(match)));

    telegram(data);

}

function setObj(match) {

    return `
${match.competitionName} \n
${match.teams[0]} ${match.score[0]} x ${match.score[1]} ${match.teams[1]} \n
Tempo de jogo: ${match.timer} \n
Link do jogo na bet365:
${match.linkOfMatch} \n
ATPM: ${appm(match.timer, match.attacksAndPossession).toFixed(2)}
`
}



module.exports = getData;

