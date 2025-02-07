import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { useLoaderData } from "react-router-dom";
import { addDays, startOfWeek } from "date-fns";
import { ToastContainer } from "react-toastify";

import ExportPDF from "../components/ExportPDF";
import GenerateMenu from "../components/GenerateMenu";

export default function Home() {
    const fetchDishes = useLoaderData();

    return (
        <div className="flex flex-col items-center w-[95%] md:w-[95%] lg:w-[80%] ">
            {!fetchDishes.message ? (
                <>
                    <div className="flex flex-row justify-end md:flex-col md:items-end md:justify-center w-full lg:w-[85%]">
                        <GenerateMenu />
                        <ExportPDF />
                    </div>

                    <div className="flex flex-col items-center w-full lg:w-[85%]  ">
                        <ToastContainer />
                        {/* Current Week menu */}
                        <WeeklyMenu weekStartDay={startOfWeek(new Date(), { weekStartsOn: 1 })} />

                        {/* Upcoming Week menu */}
                        <WeeklyMenu
                            weekStartDay={startOfWeek(addDays(new Date(), 7), {
                                weekStartsOn: 1,
                            })}
                        />
                    </div>
                </>
            ) : (
                <div>{fetchDishes.message}</div>
            )}
        </div>
    );
}
