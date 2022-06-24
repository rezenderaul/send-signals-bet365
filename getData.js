function getData(matchesArr) {

    let matchesWithTimer = matchesArr
                            .filter(arr => arr.length > 1)
                            .filter(x => x[2].indexOf(':') != -1);



    matchesWithTimer.map(match => {
        switch (match.length) {
            case 9:
                setObj(match[0], match[1], match[3], match[4], match[5], match[6], match[7], match[2]);
                break;

            default:
                console.log(match.length);
                console.log(match);
                break;
        }
    })
}

function setObj(teamHome, teamAway, scoreHome, scoreAway, homeWinner, draw, awayWinner, timer=null) {
    console.log({
        teamHome: teamHome,
        teamAway: teamAway,
        timer: timer,
        scoreHome: scoreHome,
        scoreAway: scoreAway,
        HomeWinner: homeWinner,
        draw: draw,
        AwayWinner: awayWinner
    });
}

module.exports = getData;