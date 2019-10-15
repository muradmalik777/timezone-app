export const getLocalTimezone = (time)=>{
    return /\((.*)\)/.exec(time.toString())[1];
}

export const getUTCTime = (time)=>{
    let offset = time.getTimezoneOffset()/60
    time.setHours(time.getHours() + offset)
    setEventTime(time)
    setUTC(true)
}