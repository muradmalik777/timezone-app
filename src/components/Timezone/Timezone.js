import React, {useState, useEffect} from 'react';
import './timezone.scss';
import moment from 'moment-timezone';
import Country from 'countries-and-timezones';
import {getUTCDiff} from '../../helpers/Utils';
import LangCode from 'iso-lang-codes'

const Timezone = (props) => {
    const [eventName] = useState("Latency Timezone Challenge")
    const [startDate] = useState("2019-10-10 10:00:00.000000 +00:00")
    const [event] = useState(new Date(startDate))
    const [current] = useState(new Date())
    const [locale, setLocale] = useState("")
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [list, setList] = useState(Object.values(Country.getAllTimezones()))

    useEffect(() => {
        initiate()
        let data = list.filter(item => item.country)
        setList(data)
    }, [])

    const initiate = () => {
        if(list){
            const client = getData("timezone", timezone)
            setTimezone(client ? client.name : "")
            setLocale(client ? client.country : "")
        }
    }

    const getData = (base, data) => {
        if(base === "locale"){
            return list.find(item => item.country === data)
        } else if(base === "timezone"){
            return list.find(item => item.name === data)
        }
    }

    const getClientTimeZoneCountry = () => {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    const selectLocale = (e) => {
        const data = getData("locale", e.target.value)
        setTimezone(data.name)
        setLocale(data.country)
    }

    const selectTimezone = (e) => {
        const data = getData("timezone", e.target.value)
        setLocale(data.country)
        setTimezone(data.name)
    }

    const formattedDate = (data) => {
        let date = new Date(data)
        let lang = LangCode.findCountryLanguages(locale)
        let day = date.getDate()
        let month = date.toLocaleString(lang[0], {month: 'long'})
        let year = date.getFullYear()
        return day + " " + month + ", " + year + " " + moment(date).tz(timezone).format("h:mm a")
    }

    return(
        <div className="timezone-wrapper">
            <div className="box"> 
                <h1>{eventName}</h1>
                <div className="currentTimeList">
                    <h3>Current Time</h3>
                    <h4 className="currentTime">{formattedDate(current, locale)}</h4>
                </div>
                <div className="eventTimeList">
                    <h3>Event Time</h3>
                    <h4 className="eventTime">{formattedDate(event, locale)}</h4>
                </div>
                <h3>Country Code: <span>{locale}</span></h3>
                <h3>Timezone: <span>{timezone}</span></h3>
            </div>

            <div className="settings">
                <div className="row">
                    <label>Locale:</label>
                    <select value={locale} onChange={selectLocale}>
                        { list.map((item, index) => 
                            <option key={item.name} value={item.country}> {"(" + item.country + ") " + getUTCDiff(item.utcOffset)}</option>
                        )}
                    </select>
                </div>

                <div className="row">
                    <label>Timezone:</label>
                    <select value={timezone} onChange={selectTimezone}>
                        { list.map((item, index) => 
                            <option key={item.name} value={item.name}>{item.name}</option>
                        )}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Timezone;