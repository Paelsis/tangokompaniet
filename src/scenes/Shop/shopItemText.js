import Weekdays from 'Settings/Weekdays';

const _shoe= (item) => {
    let shoe='ProductId:' + item.productId + ' Brand:' + item.brandId + ' Size:' + item.value;
    return shoe 
}

const _course = (item) => {
    const weekday = Weekdays[item.language][item.dayOfWeek-1];   
    let leaderString='follower';
    if (item.leader) {
        leaderString = 'leader'
    } 
    let course='Course ' + ' ' + 
        item.name + ' ' +
        leaderString + ' ' + 
        item.city + ' ' +
        item.startDate + ' ' +
        item.dayOfWeek + ' ' +
        item.startTime + ' ' +
        item.teachers + ' ' +
        item.debitable?item.price + ' SEK':null +    
        item.payForPartner?' Note: PAYING FOR TWO':null;
    return course
}

const _unknown = (item) => {
    const weekday = Weekdays[item.language][item.dayOfWeek-1];   
    let unknownProduct = item.productType + ' ' + item.name + ' ' + item.itemId;  
    return unknownProduct        
}


const shopItemText = (item) => {
    if (item.productType === 'shoe') {
        return(_shoe(item));
    } else if (item.productType=='course') {
        return(_course(item));
    } else {    
        return(_unknown(item));
    }
}

export default shopItemText;

