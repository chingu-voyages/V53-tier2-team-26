/* eslint react/prop-types: 0 */
import { DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import { startOfWeek } from "date-fns";
import DaysOff from "./DaysOff";
import useCalendar from "../hooks/useCalendar";

import "react-day-picker/src/style.css";

export default function Calendar({ onSelectedDaysChange, onOffDaysChange }) {
  const {
    handleDayClick,
    handleDaysOffChange,
    formatWeekdayName,
    selectedDays,
    isWithinInterval,
    offDaysDisabled,
    selectedDaysData,
    offDays,
  } = useCalendar();

  // console logs dates when week is clicked
  useEffect(() => {
    console.log(selectedDaysData);
    console.log(offDays);
  }, [selectedDaysData, offDays]);

  // raises selectedDaysData, offDays to Generate Menu
  useEffect(() => {
    onSelectedDaysChange(selectedDaysData);
    onOffDaysChange(offDays);
  }, [selectedDaysData, offDays]);

  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="flex flex-col items-center">
      <DayPicker
        numberOfMonths={2}
        weekStartsOn={1}
        captionLayout={"dropdown"}
        selected={selectedDays}
        formatters={{ formatWeekdayName }}
        modifiers={{
          range_start: selectedDays?.from,
          range_end: selectedDays?.to,
          range_middle: (date) =>
            selectedDays
              ? isWithinInterval(date, {
                  start: selectedDays.from,
                  end: selectedDays.to,
                })
              : false,
        }}
        disabled={[
          { dayOfWeek: offDaysDisabled },
          { before: startOfWeek(new Date(), { weekStartsOn: 1 }) },
        ]}
        onDayClick={handleDayClick}
      />
      {selectedDays && (
        <p className="w-full bg-button-blue text-md text-center text-white p-2 font-semibold">
          Selected Week: {selectedDays.from.toLocaleDateString()} ~{"  "}
          {selectedDays.to.toLocaleDateString()}
        </p>
      )}
      <DaysOff onDaysOffChange={handleDaysOffChange} />

      <style>
        {`
            .rdp-root {
                --rdp-accent-color: #DDEEF8;
                --rdp-disabled-opacity: 0.3; 
                --rdp-day_button-height:50px;
                --rdp-today-color: red;
                --rdp-range_start-color: black;
                --rdp-range_start-background: none;
                --rdp-range_start-date-background-color:none;
                --rdp-range_end-color: black;
                --rdp-range_end-background:#C5E9FF;
                --rdp-range_end-date-background-color: none;
                --rdp-range_middle-background-color:#C5E9FF;
                background-color: white;
                padding: 20px;
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
            }

            .rdp-day:hover {
            color: blue
            }
            .rdp-day_button{
            height: 10px
            }
            .rdp-day_button:disabled {
                cursor: not-allowed;
            }

            .rdp-months {
              position: relative;
              display: flex;
              flex-flow: row wrap;
              justify-content: center;
              gap: var(--rdp-months-gap);
              max-width: fit-content;
              width: 100%
            }
            .rdp-chevron {
              fill: blue;
            }
            .rdp-range_start {
              border-top-left-radius: 50%;
              border-bottom-left-radius: 50%;
            }
            .rdp-range_end {
              border-top-right-radius: 50%;
              border-bottom-right-radius: 50%;
            }
          }
        `}
      </style>
    </div>
  );
}
