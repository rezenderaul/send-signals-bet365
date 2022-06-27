const converterAttacksAndPossession = require('../../utils/transformData/converterAttacksAndPossession');
const converterTimer = require('../../utils/transformData/converterTimer');

function appm(matchTimer, dangerousAttack) {
    let timer = converterTimer(matchTimer);
    let attacks = converterAttacksAndPossession(dangerousAttack);
    let biggestAttack = attacks.home.dangerousAttacks > attacks.away.dangerousAttacks ? attacks.home.dangerousAttacks : attacks.away.dangerousAttacks;
    return  biggestAttack / timer;
}

module.exports = appm;