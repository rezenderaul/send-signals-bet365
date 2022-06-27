function convertCardAndCorners(cardAndCorners) {
    return {
        yellowCardsHome: +cardAndCorners[0],
        redCardsHome: +cardAndCorners[1],
        cornersHome: +cardAndCorners[2],
        cornersAway: +cardAndCorners[3],
        redCardsAway: +cardAndCorners[4],
        yellowCardsAway: +cardAndCorners[5]        
    }
}

module.exports = convertCardAndCorners;