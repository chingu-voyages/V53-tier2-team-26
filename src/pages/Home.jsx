import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink, useLoaderData } from "react-router-dom";
import {
  addDays,
  startOfWeek,
  parseISO,
  isBefore,
  formatISO,
  addMonths,
} from "date-fns";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import generatePDF from "../functions/generatePDF";
import Select from "react-select";

export default function Home() {
  const fetchDishes = useLoaderData();

  const storedWeeklyMenu = JSON.parse(
    localStorage.getItem("generatedWeeklyMenu")
  );

  const [generatedWeeklyMenuReplace, setGeneratedWeeklyMenuReplace] =
    useLocalStorage("generatedWeeklyMenu", []);

  const [updatedMenu, setUpdatedMenu] = useState();

  const [storedMondays, setStoredMondays] = useState([]);

  const [mondayOptions, setMondayOptions] = useState([]);

  const [displayedStartOfWeek, setDisplayedStartOfWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  useEffect(() => {
    if (storedWeeklyMenu && storedWeeklyMenu.length > 0) {
      // sorts local storage date/menu objects
      const sortedDays = storedWeeklyMenu.sort(
        (a, b) =>
          Number(a.id.replace(/-/g, "")) - Number(b.id.replace(/-/g, ""))
      );

      // deletes data that is older than 3 months from local storage
      const sixMonthAgoMonday = startOfWeek(addMonths(new Date(), -3), {
        weekStartsOn: 1,
      });

      const updatedMenu = storedWeeklyMenu.filter((item) => {
        const itemDate = parseISO(item.id);
        return !isBefore(itemDate, sixMonthAgoMonday);
      });

      setUpdatedMenu(updatedMenu);
      setGeneratedWeeklyMenuReplace(updatedMenu);

      // Mondays for weeks with assigned menu data
      const mondaysData = [];
      for (let i = 0; i < updatedMenu.length - 6; i += 7) {
        mondaysData.push(parseISO(updatedMenu[i].id));
      }

      setStoredMondays(mondaysData);

      // lists out 12 past monday and 52 Mondays starting from current week for year-to-date option
      const mondayOptionsData = [];
      for (let i = 12 * -7; i < 53 * 7; i += 7) {
        mondayOptionsData.push(
          startOfWeek(addDays(new Date(), i), { weekStartsOn: 1 })
        );
      }

      const mondayOptionsObject = mondayOptionsData.map((x) => ({
        label: `Week Starting: ${formatISO(x, { representation: "date" })}`, // format to display YYYY-MM-DD
        data: x,
      }));

      setMondayOptions(mondayOptionsObject);
    } else {
      console.log("No stored weekly menu data");
    }
  }, []);

  const handleDropDown = (selected) => {
    setDisplayedStartOfWeek(selected.data);
  };

  const isDateInUpdatedMenu = (date) => {
    const formattedDate = formatISO(date, { representation: "date" });
    return updatedMenu.some((item) => item.id === formattedDate);
  };

  const modifiedMondayOptions = mondayOptions.map((x) => {
    const isInUpdatedMenu = isDateInUpdatedMenu(x.data);

    return {
      ...x,
      label: `${x.label} ${isInUpdatedMenu ? `\u00A0\u00A0•` : ""}`, // Append bullet point if date is in updatedMenu
    };
  });

  return (
    <div className="flex flex-col items-center w-[95%] md:w-[95%] lg:w-[80%] py-2">
      {!fetchDishes.error ? (
        <>
          <div className="w-full flex flex-col-reverse md:flex-row md:justify-between  md:items-end">
            <div className="flex flex-row justify-center md:justify-start items-center md:items-baseline w-[100%] md:w-[300px] text-xs">
              <Select
                className="w-full"
                options={modifiedMondayOptions}
                value={{
                  label: `Week Starting: ${formatISO(displayedStartOfWeek, {
                    representation: "date",
                  })}`,
                  data: displayedStartOfWeek,
                }}
                onChange={handleDropDown}
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused
                      ? "rgb(54, 70, 136)"
                      : "rgba(255, 254, 241, 1)",
                    color: state.isFocused ? "white" : "black",
                    textAlign: "left",
                    width: "100%",
                  }),
                }}
              />
            </div>
            <div className="flex flex-row justify-end md:flex-col md:items-end md:justify-center w-full lg:w-[85%]">
              <div
                onClick={() => generatePDF(displayedStartOfWeek)}
                className="md:hidden flex flex-row text-black justify-center items-center w-fit text-white  px-1"
              >
                <DownloadIcon fontSize="medium" className="cursor-pointer" />
              </div>
              <NavLink
                className="flex flex-row justify-center items-center bg-[#364688] border-2 text-white rounded-3xl px-8 my-2 py-10px hover:bg-white hover:text-[#364688] hover:border-2 hover:border-[#364688] py-2"
                to={"/GenerateMenu"}
              >
                <AddIcon fontSize="small" />
                <span className="text-sm md:text-lg font-bold">
                  &nbsp;Generate Menu
                </span>
              </NavLink>
              <div
                onClick={() => generatePDF(displayedStartOfWeek)}
                className="hidden md:flex md:flex-row md:bg-white md:border-2 md:border-[#364688] md:text-[#364688] md:justify-center md:items-center md:rounded-full md:h-[36px] md:w-fit md:px-[24px] md:py-[6px] md:hover:border-2 md:hover:border-solid md:hover:border-white md:hover:bg-[#364688] md:hover:text-white md:cursor-pointer"
              >
                <DownloadIcon fontSize="small" className="cursor-pointer" />
                <span>&nbsp;Export Menu</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center min-w-full lg:w-[85%]  ">
            <ToastContainer />
            {/* Current Week menu */}
            <WeeklyMenu weekStartDay={displayedStartOfWeek} />

            {/* Upcoming Week menu */}
            <WeeklyMenu
              weekStartDay={startOfWeek(addDays(displayedStartOfWeek, 7), {
                weekStartsOn: 1,
              })}
            />
          </div>
        </>
      ) : (
        <div className="text-center italic bg-custom-yellow">
          {fetchDishes.error}
        </div>
      )}
    </div>
  );
}
