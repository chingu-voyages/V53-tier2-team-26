import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export default function GenerateMenu() {
    return (
        <NavLink
            className="flex flex-row justify-center items-center bg-button-blue border-2 text-white rounded-3xl h-[36px] w-fit px-[18px] md:px-[60px] my-2 hover:bg-white hover:text-button-blue hover:border-2 hover:border-button-blue"
            to={"/GenerateMenu"}>
            <AddIcon fontSize="small" className="" />
            <span className="text-sm md:text-lg">Generate Menu</span>
        </NavLink>
    );
}
