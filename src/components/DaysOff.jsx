import { useEffect, useState } from "react";

export default function DaysOff({ onDaysOffChange }) {
  //initially Sat and Sun are checked as off days
  const [offDays, setOffDays] = useState([
    false,
    false,
    false,
    false,
    false,
    true,
    true,
  ]);

  //updates the offDays array whenever a checkbox is checked/unchecked
  const handleCheckboxChange = (index) => {
    setOffDays((prevOffDays) => {
      const updatedOffDays = [...prevOffDays];
      updatedOffDays[index] = !updatedOffDays[index];
      return updatedOffDays;
    });
  };

  useEffect(() => {
    onDaysOffChange(offDays);
  });
  return (
    <div className="flex flex-col items-center w-full m-3">
      <h2 className="text-center text-lg items-center font-semibold">
        Days Off
      </h2>
      <form type="submit" className="flex flex-row justify-center w-full">
        <div className="px-3">
          <input
            type="checkbox"
            id="mon"
            key="mon"
            checked={offDays[0]}
            onChange={() => handleCheckboxChange(0)}
          />
          <label> Mon</label>
        </div>
        <div className="px-3">
          <input
            type="checkbox"
            id="tue"
            key="tue"
            checked={offDays[1]}
            onChange={() => handleCheckboxChange(1)}
          />
          <label> Tue</label>
        </div>
        <div className="px-3">
          <input
            type="checkbox"
            id="wed"
            key="wed"
            checked={offDays[2]}
            onChange={() => handleCheckboxChange(2)}
          />
          <label> Wed</label>
        </div>
        <div className="px-3">
          <input
            type="checkbox"
            id="thu"
            key="thu"
            checked={offDays[3]}
            onChange={() => handleCheckboxChange(3)}
          />
          <label> Thu</label>
        </div>
        <div className="px-3">
          <input
            type="checkbox"
            id="fri"
            key="fri"
            checked={offDays[4]}
            onChange={() => handleCheckboxChange(4)}
          />
          <label> Fri</label>
        </div>
        <div className="px-3">
          <input
            type="checkbox"
            id="sat"
            key="sat"
            checked={offDays[5]}
            onChange={() => handleCheckboxChange(5)}
          />
          <label> Sat</label>
        </div>
        <div className="px-3">
          <input
            type="checkbox"
            id="sun"
            key="sun"
            checked={offDays[6]}
            onChange={() => handleCheckboxChange(6)}
          />
          <label> Sun</label>
        </div>
      </form>
    </div>
  );
}
