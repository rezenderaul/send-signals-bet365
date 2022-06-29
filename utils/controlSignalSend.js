function addToAlreadySent(id, signalAlreadySent, minutesToRemove = 10) {
    let idExists = signalAlreadySent.filter(x => x.id.indexOf(id) != -1);
    if(!idExists.length) {
        signalAlreadySent.push({
            id: id,
        });
        removeFromAlreadySent(signalAlreadySent, id, minutesToRemove);
        return true;
    }
    
    return false;
}

// Return Arr to remove from  signalAlreadySent
function removeFromAlreadySent(signalAlreadySent, link, minutesToRemove) {
    setTimeout(() => {
        console.log(`Remove: ${link}`);
        signalAlreadySent
        .map(x => signalAlreadySent.splice(x.id.indexOf(link)));
    }, 1000 * 60 * minutesToRemove);
}

module.exports = addToAlreadySent;