/* eslint-disable react/prop-types -- bypass proptypes error */
import { DayCard } from "./DayCard";
import { formatISO9075, addDays, format, startOfWeek, isEqual } from "date-fns";
import { useState, useEffect } from "react";

//looks at today's date and produce an array of days of the current week
function getWeekLabels(weekStart) {
  const days = [];

  for (let i = 0; i < 7; i += 1) {
    //changes DATE data into a STRING and removes time data (ex: "Mon Jan 20 2025")
    days.push(format(addDays(weekStart, i), "EEE MMM-dd-yyyy"));
  }

  return days;
}

function getWeekDays(weekStart) {
  const days = [];

  for (let i = 0; i < 7; i += 1) {
    //changes DATE data into an ISO date format STRING and keeps only yyyy-mm-dd (ex: "2025-01-23")
    days.push(formatISO9075(addDays(weekStart, i), { representation: "date" }));
  }

  return days;
}

export function WeeklyMenu({ weekStartDay }) {
  const [currentWeekDaysLabels, setCurrentWeekDaysLabels] = useState([]);
  const [currentWeekDays, setCurrentWeekDays] = useState([]);
  const [initialReady, setInitialReady] = useState(false);

  // populates currentWeekDaysLabels and currentWeekDays at component render
  useEffect(() => {
    setCurrentWeekDaysLabels(getWeekLabels(weekStartDay));
    setCurrentWeekDays(getWeekDays(weekStartDay));
    setInitialReady(true);
  }, [weekStartDay]);

  const storedWeeklyMenu = JSON.parse(
    localStorage.getItem("generatedWeeklyMenu")
  );

  const [daysObjectsFromStorage, setDaysObjectsFromStorage] = useState([]);

  // runs only after initial useEffect due to dependancy
  // runs only if local storage is NOT empty
  useEffect(() => {
    if (initialReady && storedWeeklyMenu !== null) {
      const updatedStoredWeeklyMenu = storedWeeklyMenu.filter((x) =>
        currentWeekDays.includes(x.id)
      );

      const daysObjects = [];

      for (let i = 0; i < 7; i += 1) {
        daysObjects.push(
          updatedStoredWeeklyMenu.find((x) => x.id === currentWeekDays[i])
        );
      }

      setDaysObjectsFromStorage(daysObjects);

      setInitialReady(false);
    }
  }, [initialReady]);

  return (
    <div className="flex flex-col items-around mt-1 mb-5 py-4 px-2 w-full bg-custom-yellow">
      <h2 className="text-center text-md md:text-2xl pb-5 underline">
        {isEqual(weekStartDay, startOfWeek(new Date(), { weekStartsOn: 1 }))
          ? "This Week's Menu"
          : isEqual(
              weekStartDay,
              addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7)
            )
          ? "Upcoming Week's Menu"
          : `${formatISO9075(weekStartDay, {
              representation: "date",
            })} ~ ${formatISO9075(addDays(weekStartDay, 6), {
              representation: "date",
            })}`}
      </h2>

      <div className="flex flex-col md:grid md:grid-cols-4 w-full gap-3">
        {Array.from(
          daysObjectsFromStorage.length > 0
            ? daysObjectsFromStorage
            : currentWeekDaysLabels
        ).map((object, i) => (
          <DayCard
            key={i}
            data={object !== undefined ? object : undefined}
            placeholder={"Menu Not Generated"}
            day={currentWeekDaysLabels[i]}
          />
        ))}
      </div>
    </div>
  );
}
