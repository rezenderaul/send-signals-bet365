const getCorners = require('../../utils/transformData/converterCardAndCorners');

function cornersAll(data) {
    return getCorners(data).cornersHome + getCorners(data).cornersAway;
}

function cornersHome(data) {
    return getCorners(data).cornersHome;
}

function cornersAway(data) {
    return getCorners(data).cornersAway;
}

module.exports = { 
    cornersAll, 
    cornersHome, 
    cornersAway
};