import Calendar from "../components/Calendar.jsx";
import useGenerateMenu from "../hooks/useGenerateMenu.jsx";
import ModalA from "../components/GenerateMenuPageModals/ModalA.jsx";
import ModalB from "../components/GenerateMenuPageModals/ModalB.jsx";
import ModalC from "../components/GenerateMenuPageModals/ModalC.jsx";
import ModalD from "../components/GenerateMenuPageModals/ModalD.jsx";
import ModalE from "../components/GenerateMenuPageModals/ModalE.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";

export default function GenerateMenu() {
  const {
    handleSelectedDaysUpdate,
    handleOffDaysUpdate,
    handleGenerate,
    handleRegenerate,
    modalType,
    setModalType,
  } = useGenerateMenu();

  return (
    <div className="w-full flex flex-col items-center bg-custom-yellow">
      <div className="grid grid-col grid-cols-3 py-5 items-center justify-between w-full">
        <NavLink
          className="w-fit hover:text-button-blue flex flex-row items-center justify-start"
          to={"/"}
        >
          <ArrowBackIcon fontSize="medium" className=""/>
          <span className="">Return to Home</span>
        </NavLink>
        <h2 className="text-center text-2xl ">Generate Menu</h2>
      </div>
      <div className="flex flex-col w-full bg-custom-blue py-3">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-center text-lg items-center m-3">Select Date</h2>
          <span className="text-center items-center m-2 ">
            Choose a week to generate a menu for
          </span>
          <Calendar
            onSelectedDaysChange={handleSelectedDaysUpdate}
            onOffDaysChange={handleOffDaysUpdate}
          />
        </div>
        <div className="flex flex-row justify-center w-full">
          <button
            onClick={handleGenerate}
            className="bg-button-blue border-2 text-white rounded-3xl p-2 m-3 w-3/12 text-center  hover:bg-white hover:text-button-blue hover:border-2 hover:border-button-blue"
          >
            Generate
          </button>
          <button
            onClick={() => setModalType("C")}
            className="bg-button-blue border-2 text-white rounded-3xl p-2 m-3 w-3/12 text-center  hover:bg-white hover:text-button-blue hover:border-2 hover:border-button-blue"
          >
            Regenerate
          </button>
        </div>
      </div>
      {modalType === "A" && <ModalA onClose={() => setModalType(null)} />}
      {modalType === "B" && <ModalB onClose={() => setModalType(null)} />}
      {modalType === "C" && (
        <ModalC
          onAgree={handleRegenerate}
          onDisagree={() => setModalType(null)}
        />
      )}
      {modalType === "D" && <ModalD onClose={() => setModalType(null)} />}
      {modalType === "E" && <ModalE onClose={() => setModalType(null)} />}
    </div>
  );
}
