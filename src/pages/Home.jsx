import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink, useLoaderData } from "react-router-dom";
import { addDays, startOfWeek } from "date-fns";
import { ToastContainer } from "react-toastify";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import generatePDF from "../functions/generatePDF";

export default function Home() {
    
    const fetchDishes = useLoaderData();
    return (
        <div className="flex flex-col items-center w-[95%] md:w-[95%] lg:w-[80%] ">
            {!fetchDishes.error ? (
                <>
                    <div className="flex flex-row justify-end md:flex-col md:items-end md:justify-center w-full lg:w-[85%]">
                        <div
                            onClick={generatePDF}
                            className="md:hidden flex flex-row text-button-blue justify-center items-center w-fit border-button-blue px-1">
                            <FileUploadIcon fontSize="medium" className="cursor-pointer" />
                        </div>
                        <NavLink
                            className="flex flex-row justify-center items-center bg-button-blue border-2 text-white rounded-3xl h-[36px] w-fit px-[18px] md:px-[60px] my-2 hover:bg-white hover:text-button-blue hover:border-2 hover:border-button-blue"
                            to={"/GenerateMenu"}>
                            <AddIcon fontSize="small" className="" />
                            <span className="text-sm md:text-lg">Generate Menu</span>
                        </NavLink>
                        <div
                            onClick={generatePDF}
                            className="hidden md:flex md:flex-row md:bg-gray-500 md:border-2 md:text-white md:justify-center md:items-center md:rounded-full md:h-[36px] md:w-fit md:px-[24px] md:py-[6px] md:hover:border-2 md:hover:border-solid md:hover:border-gray-500 md:hover:bg-white md:hover:text-gray-500 md:cursor-pointer">
                            <span>Export Menu</span>
                            <FileUploadIcon fontSize="small" className="cursor-pointer" />
                        </div>
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
                <div className="text-center italic ">{fetchDishes.error}</div>
            )}
        </div>
    );
}
