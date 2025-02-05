import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink } from "react-router-dom";
import { addDays, startOfWeek, formatISO9075, format } from "date-fns";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from "react-toastify";
import generatePDF from "../functions/generatePDF";


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full items-end justify-end">
        <NavLink
          className="flex flex-row justify-center items-center bg-button-blue border-2 text-white rounded-3xl h-[36px] w-fit px-[30px]  my-2 hover:bg-white hover:text-button-blue hover:border-2 hover:border-button-blue"
          to={"/GenerateMenu"}
        >
          <AddIcon fontSize="small" className=""/>
          <span className="">Generate Menu</span>
        </NavLink>
        <div
          onClick={generatePDF}
          className="flex flex-row bg-gray-500 border-2 text-white justify-center items-center rounded-full h-[36px] w-fit px-[24px] py-[6px] hover:border-2 hover:border-solid hover:border-gray-500 hover:bg-white hover:text-gray-500 cursor-pointer"
        >
          <span>Export Menu</span>
          <FileUploadIcon
            fontSize="small"
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <ToastContainer />
        {/* Current Week menu */}
        <WeeklyMenu
          weekStartDay={startOfWeek(new Date(), { weekStartsOn: 1 })}
        />

        {/* Upcoming Week menu */}
        <WeeklyMenu
          weekStartDay={startOfWeek(addDays(new Date(), 7), {
            weekStartsOn: 1,
          })}
        />
      </div>
    </div>
  );
}
