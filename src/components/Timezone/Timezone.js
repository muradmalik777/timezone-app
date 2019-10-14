import React, {useState, useEffect} from 'react';
import './timezone.scss';
import moment from 'moment';

const Timezone = (props)=>{
    const [eventName, setEventName] = useState("")
    const [startDate, setStartDate] = useState("2019-10-10 10:00:00.000000 +00:00")
    const [eventTime, setEventTime] = useState("")
    const [locale, setLocale] = useState("")
    const [timezone, setTimezone] = useState("")
    const [utc, setUTC] = useState(false)
    const [localeSelect, setLocaleSelect] = useState("1")
    const [timezoneSelect, setTimezoneSelect] = useState("1")

    const handleLocaleSelectChange = (e)=>{
        setLocaleSelect(e.target.value)
        if(e.target.value === "1"){
            getLocalTime()
            setLocale(eventTime.toString().split(" ")[5])
        } else{
            getUTCTime()
            setLocale("")
        }
    }

    const handleTimezoneSelectChange = (e)=>{
        setTimezoneSelect(e.target.value)
        if(e.target.value === "1"){
            getLocalTime()
            setTimezone(getLocalTimezone(eventTime))
        } else{
            setTimezone("")
            getUTCTime()
        }
    }

    const getLocalTimezone = (time)=>{
        return /\((.*)\)/.exec(time.toString())[1];
    }

    const getUTCTime = ()=>{
        let time = new Date(startDate)
        let offset = time.getTimezoneOffset()/60
        time.setHours(time.getHours() + offset)
        setEventTime(time)
        setUTC(true)
    }

    const getLocalTime = ()=>{
        let time = new Date(startDate)
        setEventTime(time)
        setUTC(false)
    }

    

    useEffect(()=>{
        setEventName("Latency Timezone Challenge")
        let time = new Date(startDate)
        setEventTime(time)
        setTimezone(getLocalTimezone(time))
        let loc = time.toString().split(" ")[5]
        setLocale(loc)
    }, [startDate])

    return(
        <div className="timezone-wrapper">
            <div className="box">
                <h1>{eventName}</h1>
                {!utc && <h2>{moment(eventTime).format("MMM Do YYYY, h:mm a")}</h2>}
                {utc && <h2>{eventTime.toString()}</h2>}
                {locale && <h3>Locale: <span>{locale}</span></h3>}
                {timezone && <h3>Timezone: <span>{timezone}</span></h3>}
            </div>

            <div className="settings">
                <div className="row">
                    <label>Locale:</label>
                    <select value={localeSelect} onChange={handleLocaleSelectChange}>
                        <option value={0}>None</option>
                        <option value={1}>Load Info</option>
                    </select>
                </div>

                <div className="row">
                    <label>Timezone:</label>
                    <select value={timezoneSelect} onChange={handleTimezoneSelectChange}>
                        <option value={0}>None</option>
                        <option value={1}>Load Info</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Timezone;