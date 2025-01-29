/* eslint-disable react/prop-types -- bypass proptypes error */
import { DayCard } from "./DayCard";
import { useState, useEffect } from "react";
import moment from "moment";
import getWeekDays from "../../functions/getWeekDays.js";

//looks at today's date and produce an array of days of the current week
function getWeekLabels(weekStart) {
    const days = [];

    for (let i = 0; i < 7; i += 1) {
        //changes DATE data into a STRING and removes time data (ex: "Mon Jan 20 2025")
        days.push(moment(weekStart).add(i, "days").toString().slice(0, 15));
    }

    return days;
}

export function WeeklyMenu({ weekStartDay, dishes, offDays }) {
    const [currentWeekDaysLabels, setCurrentWeekDaysLabels] = useState([]);
    const [currentWeekDays, setCurrentWeekDays] = useState([]);

    //populates currentWeekDaysLabels and currentWeekDays at component render
    useEffect(() => {
        setCurrentWeekDaysLabels(getWeekLabels(weekStartDay));
        setCurrentWeekDays(getWeekDays(weekStartDay));
    }, []);

    return (
        <>
            <div className="gap-14 bg-slate-100 p-6">
                <h2 className="text-center my-8">
                    {getWeekDays(weekStartDay).includes(moment().toISOString().slice(0, 10)) ? "This" : "Upcoming"}{" "}
                    Week&apos;s Menu
                </h2>
                <button onClick={() => console.log(currentWeekDays)}>test</button>
                <div className="grid grid-cols-4 gap-6">
                    {Array.from(dishes || []).map((dish, i) => (
                        <DayCard key={i} dish={offDays[i] ? "OFF" : dish.name} day={currentWeekDaysLabels[i]} />
                    ))}
                </div>
            </div>
        </>
    );
}
