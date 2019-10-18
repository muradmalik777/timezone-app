export const getUTCDiff = (diff) => {
    let hours = diff/60
    return  hours < 0 ? "UTC " + hours : "UTC +" +hours
}