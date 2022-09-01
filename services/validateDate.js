module.exports = date => {
    let [day, month, year] = date.split('/')

    day = parseInt(day) >= 1 && parseInt(day) <= 31 ? parseInt(day) : 1;
    
    month =  parseInt(month) >= 0 && parseInt(month) <= 11 ? parseInt(month) : parseInt(month - 1);

    const dateValid = new Date(parseInt(year), month, day);
    return dateValid;
}