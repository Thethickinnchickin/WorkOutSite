const moment = require('moment');

const createChartData = (workouts) => {
    let chartData = {
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0
    }

    for(let workout of workouts) {

        let formatDate = moment(workout.dateScheduled).format('MMM');
        formatDate = formatDate.toString();
        switch(formatDate) {
            case 'Jan':
                chartData.jan ++;
                break;
            case 'Feb':
                chartData.feb ++;
                break;
            case 'Mar':
                chartData.mar ++;
                break;
            case 'Apr':
                chartData.apr ++;
                break;
            case 'May':
                chartData.may ++;
                break;
            case 'Jun':
                chartData.jun ++;
                break;
            case 'Jul':
                chartData.jul ++;
                break;
            case 'Aug':
                chartData.aug ++;
                break;
            case 'Sep':
                chartData.sep ++;
                break;
            case 'Oct':
                chartData.oct ++;
                break;
            case 'Nov':
                chartData.nov ++;
                break;
            case 'Dec':
                chartData.dec ++;
                break;
            default: 
                break;
        }

    }
    
    return chartData;
}

module.exports = createChartData;