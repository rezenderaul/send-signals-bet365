function convertAttacksAndPossession(attacksAndPossession) {
    
    let data = [];

    attacksAndPossession.forEach(x => { let temp = x.split('\n'); temp.forEach(y => data.push(y)) });

    return {
        home: {
            attacks: data[0],
            dangerousAttacks: data[2],
            possession: data[4] || null
        },
        away: {
            attacks: data[1],
            dangerousAttacks: data[3],
            possession: data[5] || null
        }
    };
}

module.exports = convertAttacksAndPossession;