function converterScore(data) {
    return {
        homeScore: data[0],
        awayScore: data[1]
    }
}

module.exports = converterScore;