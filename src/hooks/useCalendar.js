import { useState, useEffect } from "react";
import {
  endOfWeek,
  startOfWeek,
  isWithinInterval,
  addDays,
  eachDayOfInterval,
  formatISO9075,
  format,
} from "date-fns";

import "react-day-picker/src/style.css";

// used for producing dates in ISO format to be used as id
const cleanUpDates = (days) => {
  const cleanedUpDays = [];
  for (let i = 0; i < 7; i += 1) {
    cleanedUpDays.push(formatISO9075(days[i], { representation: "date" }));
  }
  return cleanedUpDays;
};

export default function useCalendar() {
  // defaults highlighted week to next week
  const [selectedDays, setSelectedDays] = useState({
    from: startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 }),
    to: endOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 }),
  });

  // produces array of dates in ISO format to be used as id
  const [selectedDaysData, setSelectedDaysData] = useState(
    cleanUpDates(
      eachDayOfInterval({
        start: startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 }),
        end: endOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 }),
      })
    )
  );

  const handleDayClick = (day) => {
    if (
      selectedDays &&
      isWithinInterval(day, { start: selectedDays.from, end: selectedDays.to })
    ) {
      setSelectedDays(null); // Clear selection if clicking within the selected week
    } else {
      // used by modifier
      setSelectedDays({
        from: startOfWeek(day, { weekStartsOn: 1 }),
        to: endOfWeek(day, { weekStartsOn: 1 }),
      });
      // used for data
      setSelectedDaysData(
        cleanUpDates(
          eachDayOfInterval({
            start: startOfWeek(day, { weekStartsOn: 1 }),
            end: endOfWeek(day, { weekStartsOn: 1 }),
          })
        )
      );
    }
  };

  const formatWeekdayName = (day) => format(day, "ccc");

  // default off days
  const [offDays, setOffDays] = useState([
    false,
    false,
    false,
    false,
    false,
    true,
    true,
  ]);
  const [offDaysDisabled, setOffDaysDisabled] = useState([6, 0]);

  const handleDaysOffChange = (offDaysArray) => {
    setOffDays(offDaysArray);
  };

  // updates the disabled weekdays
  useEffect(() => {
    setOffDaysDisabled(
      offDays.flatMap((x, index) =>
        x ? (index + 1 === 7 ? 0 : index + 1) : []
      )
    );
  }, [offDays]);

  return {
    handleDayClick,
    handleDaysOffChange,
    formatWeekdayName,
    selectedDays,
    isWithinInterval,
    offDaysDisabled,
    selectedDaysData,
    offDays,
  };
}
