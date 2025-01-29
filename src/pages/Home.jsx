import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import moment from "moment";
import useGenerateWeeklyDishes from "../hooks/useGenerateWeeklyDishes";

export default function Home({ offDays }) {
    const [menuDishes, setMenuDishes] = useGenerateWeeklyDishes();

    useEffect(() => {
        // Temporary -- generates a menu on mount
        if (!localStorage.getItem("menuDishes")) setMenuDishes();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row w-full justify-end">
                <NavLink
                    className="bg-blue-400 rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200"
                    to={"/GenerateMenu"}>
                    + Generate Menu
                </NavLink>
            </div>
            <div className="flex flex-row w-full justify-end">
                <NavLink
                    className="bg-blue-400 rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200"
                    onClick={() => setMenuDishes()}>
                    Test Regenerate Menu
                </NavLink>
            </div>

            <div className="flex flex-col gap-10">
                {/* Current Week menu */}
                <WeeklyMenu
                    weekStartDay={moment().startOf("isoWeek")}
                    dishes={menuDishes.currentWeek}
                    offDays={offDays}
                />

                {/* Upcoming Week menu */}
                <WeeklyMenu
                    weekStartDay={moment().add(7, "days").startOf("isoWeek")}
                    dishes={menuDishes.nextWeek}
                    offDays={offDays}
                />
            </div>
        </div>
    );
}
