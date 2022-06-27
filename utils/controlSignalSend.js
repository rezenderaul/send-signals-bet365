function addToAlreadySent(id, signalAlreadySent) {
    let idExists = signalAlreadySent.filter(x => x.id.indexOf(id) != -1);
    if(!idExists.length) {
        signalAlreadySent.push({
            id: id,
            timer: new Date().getTime() + 1000 * 60 * 10
        });
        return true;
    }
    
    return false;
}

// Return Arr to remove from  signalAlreadySent
function removeFromAlreadySent(signalAlreadySent) {
    let timeToRemove = new Date().getTime();
    signalAlreadySent.forEach(x => console.log(timeToRemove >= x.time));
    signalAlreadySent
        .filter(x => timeToRemove >= x.timer)
        .map(x => console.log(`Dados a remover: ${x.id} => ${x.timer}`))
        .map(x => signalAlreadySent.splice(signalAlreadySent.indexOf(x)));
}

module.exports = {
    addToAlreadySent,
    removeFromAlreadySent
}