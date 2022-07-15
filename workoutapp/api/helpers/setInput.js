//Function to clean up input for a set
// returns: set object
const cleanSetInput = (set) => {
    //Checking target set amount
    if(set.targetRepAmount < 0) {
        set.targetRepAmount = 0;
    } else if (set.targetRepAmount > 1000) {
        set.targetRepAmount = 1000
    }

    if(set.targetWeight < 0) {
        set.targetWeight = 0;
    } else if (set.targetWeight > 1000) {
        set.targetWeight = 1000
    }

    if(set.targetTimeInSeconds < 0) {
        set.targetTimeInSeconds = 0;
    } else if (set.targetTimeInSeconds > 1000) {
        set.targetTimeInSeconds = 1000
    }

    if(set.targetLoad < 0) {
        set.targetLoad = 0;
    } else if (set.targetLoad > 1000) {
        set.targetLoad = 1000
    }
    //Checking actual sets amounts
    if(set.actualRepAmount < 0) {
        set.actualRepAmount = 0;
    } else if (set.actualRepAmount > 1000) {
        set.actualRepAmount = 1000
    }

    if(set.actualWeight < 0) {
        set.actualWeight = 0;
    } else if (set.actualWeight > 1000) {
        set.actualWeight = 1000
    }

    if(set.actualTimeInSeconds < 0) {
        set.actualTimeInSeconds = 0;
    } else if (set.actualTimeInSeconds > 1000) {
        set.actualTimeInSeconds = 1000
    }

    if(set.actualLoad < 0) {
        set.actualLoad = 0;
    } else if (set.actualLoad > 1000) {
        set.actualLoad = 1000
    }
    return set
    
}

module.exports = cleanSetInput;