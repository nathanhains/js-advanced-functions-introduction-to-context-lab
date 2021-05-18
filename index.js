function createEmployeeRecord(array){
        return {
            firstName: array[0],
            familyName: array[1],
            title: array[2],
            payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: [],
        }
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(record, date){

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.slice(-4)),
        date: date.slice(0,10)
    })
    return record
}

function createTimeOutEvent(record, date){

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.slice(-4)),
        date: date.slice(0,10)
    })
    return record
}

function hoursWorkedOnDate(record, date){
    let timeOutHour = record.timeOutEvents.find((e)=> e.date === date).hour
    let timeInHour = record.timeInEvents.find((e)=> e.date === date).hour
    return (timeOutHour - timeInHour)/100
}

function wagesEarnedOnDate(record, date){
    let hours = hoursWorkedOnDate(record, date)
    return hours*record.payPerHour

}

function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}
