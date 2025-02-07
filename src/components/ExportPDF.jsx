import generatePDF from "../functions/generatePDF";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function ExportPDF() {
    return (
        <div
            onClick={generatePDF}
            className="hidden md:flex md:flex-row md:bg-gray-500 md:border-2 md:text-white md:justify-center md:items-center md:rounded-full md:h-[36px] md:w-fit md:px-[24px] md:py-[6px] md:hover:border-2 md:hover:border-solid md:hover:border-gray-500 md:hover:bg-white md:hover:text-gray-500 md:cursor-pointer">
            <span>Export Menu</span>
            <FileUploadIcon fontSize="small" className="cursor-pointer" />
        </div>
    );
}
