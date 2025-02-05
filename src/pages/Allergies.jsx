import { useLoaderData } from "react-router-dom";
import { ALLERGENS } from "../data/allergens";
import { INITIAL_EMPLOYEE_DATA } from "../data/initialEmployeeData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Select, { components } from "react-select";
import identifySafeDishes from "../functions/identifySafeDishes";
import { useState } from "react";
import { customStyles } from "../data/customStyles";
import DeleteAllModal from "../components/DeleteAllModal";
import DeleteItemModal from "../components/DeleteItemModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";

export default function Allergies() {
  const fetchDishes = useLoaderData();
  const [employeesData, setEmployeesData] = useLocalStorage(
    "employeesData",
    INITIAL_EMPLOYEE_DATA
  );
  const [safeDishes, setSafeDishes] = useLocalStorage(
    "safeDishes",
    fetchDishes
  );
  console.log(safeDishes);
  const [activeEditingEmployeeName, setActiveEditingEmployeeName] =
    useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState(null);

  function handleClosingDeleteAllDialog(agree) {
    setShowDeleteAllModal(false);
    if (agree) {
      const employeeToDelete = employeesData.find(
        (employee) => employee.name === deletingEmployee
      );
      if (employeeToDelete) {
        deleteAllergies(employeeToDelete);
      }
    }
    setDeletingEmployee(null);
  }

  function handleClosingDeleteItemDialog(agree) {
    setShowDeleteItemModal(false);
    if (agree) {
      const employeeBeingEdited = employeesData.find(
        (employee) => employee.name === activeEditingEmployeeName
      );
      updateEmployeeAllergies(employeeBeingEdited, optionsSelected);
    }
    setActiveEditingEmployeeName(null);
    setOptionsSelected(null);
  }

  function updateEmployeeAllergies(selectedEmployee, selectedOptions) {
    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.name === selectedEmployee.name) {
        return {
          ...employee,
          allergies: selectedOptions.map((allergy) => ({
            value: allergy.value,
            label: allergy.label,
          })),
        };
      }
      return employee;
    });

    //save update employees allergies to local storage
    setEmployeesData(updatedEmployeesData);
    //filter employees with allergies
    const employeesWithAllergies = updatedEmployeesData.filter(
      (employee) => employee.allergies.length > 0
    );
    const employeesAllergens = employeesWithAllergies.map((employee) =>
      employee.allergies.flatMap((allergy) => {
        if (
          allergy.label === "Fish" ||
          allergy.label === "Gluten" ||
          allergy.label === "Dairy" ||
          allergy.label === "Shellfish" ||
          allergy.label === "Eggs" ||
          allergy.label === "Citrus" ||
          allergy.label === "Tomatoes" ||
          allergy.label === "Onions"
        ) {
          return allergy.value.split(" ").concat(allergy.label);
        }
        return allergy.value;
      })
    );
    //list of allergens selected unique values
    const uniqueAllergens = [...new Set(employeesAllergens.flat())];
    //dishes safe for employees
    const updatedSafeDishes = identifySafeDishes(fetchDishes, uniqueAllergens);
    //save safe dishes to local storage
    setSafeDishes(updatedSafeDishes);
  }

  function deleteAllergies(selectedEmployee) {
    updateEmployeeAllergies(selectedEmployee, []);
    setActiveEditingEmployeeName(null);
  }

  return (
    <section className="flex flex-col items-center w-full">
      <div className="grid grid-col grid-cols-3 py-5 items-center justify-between w-full">
        <NavLink
          className="w-fit hover:text-button-blue flex flex-row items-center justify-start"
          to={"/"}
        >
          <ArrowBackIcon fontSize="medium" className="" />
          <span className="">Return to Home</span>
        </NavLink>
        <h2 className="text-center text-2xl ">Allergies</h2>
      </div>
      <section className="flex flex-col w-full items-center">
        <ul className="flex flex-col w-4/5 items-center gap-4 text-lg">
          <li className="flex w-full items-center  gap-4">
            <span className="w-1/2 py-2 bg-custom-blue flex justify-center items-center shadow-md">
              Employee Name
            </span>
            <span className="w-1/2 py-2 bg-custom-blue flex justify-center items-center shadow-md">
              Allergy
            </span>
          </li>
          {employeesData.map((employee) => (
            <li
              className="flex w-full justify-start items-center  gap-4"
              key={employee.id}
            >
              <span className="w-1/2 py-2 bg-custom-blue flex justify-center items-center shadow-md">
                {employee.name}
              </span>
              <div className="w-1/2 flex justify-between items-center">
                <span className="w-11/12 bg-custom-blue relative shadow-md">
                  <Select
                    styles={customStyles}
                    onChange={(selectedOptions, actionMeta) => {
                      setActiveEditingEmployeeName(employee.name);
                      if (actionMeta.removedValue) {
                        setShowDeleteItemModal(true);
                        setOptionsSelected(selectedOptions);
                      }
                      if (actionMeta.action === "select-option") {
                        updateEmployeeAllergies(employee, selectedOptions);
                      }
                    }}
                    menuIsOpen={activeEditingEmployeeName === employee.name}
                    closeMenuOnSelect={false}
                    isMulti
                    options={ALLERGENS}
                    value={employee.allergies}
                    placeholder={"[Allergy]"}
                    isClearable={false}
                    isDisabled={
                      employee.allergies.length > 0 &&
                      !activeEditingEmployeeName
                    }
                    onMenuOpen={() => {
                      setActiveEditingEmployeeName(employee.name);
                    }}
                    onMenuClose={() => {}}
                    components={{
                      MultiValueRemove: (props) =>
                        activeEditingEmployeeName === employee.name ? (
                          <components.MultiValueRemove {...props}>
                            <DeleteIcon />
                          </components.MultiValueRemove>
                        ) : null,
                    }}
                  />
                  {activeEditingEmployeeName !== employee.name &&
                    employee.allergies.length > 0 && (
                      <>
                        <button
                          className="bg-custom-blue flex justify-center text-black hover:text-button-blue flex justify-center items-center h-8 absolute right-2 top-1/2 transform -translate-y-1/2 "
                          onClick={(event) => {
                            setActiveEditingEmployeeName(employee.name);
                          }}
                        >
                          <ModeEditOutlineOutlinedIcon fontSize="medium" />
                        </button>
                      </>
                    )}
                  {employee.allergies.length > 0 &&
                  employee.name === activeEditingEmployeeName ? (
                    <button
                      className="bg-custom-blue flex justify-center text-black hover:text-button-blue flex justify-center items-center h-8 absolute right-2 top-1/2 transform -translate-y-1/2 "
                      onClick={(event) => {
                        setActiveEditingEmployeeName(null);
                      }}
                    >
                      <SaveOutlinedIcon fontSize="medium" />
                    </button>
                  ) : (
                    ""
                  )}
                </span>
                <button
                  className="w-1/12 flex flex-row justify-center items-center text-black hover:text-[red]"
                  onClick={(event) => {
                    setDeletingEmployee(employee.name);
                    if (employee.allergies.length > 0) {
                      setShowDeleteAllModal(true);
                    }
                  }}
                  title="Delete all allergies"
                >
                  <DeleteIcon fontSize="large" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <DeleteAllModal
        showDeleteAllModal={showDeleteAllModal}
        handleClosingDeleteAllDialog={handleClosingDeleteAllDialog}
      />
      <DeleteItemModal
        showDeleteItemModal={showDeleteItemModal}
        handleClosingDeleteItemDialog={handleClosingDeleteItemDialog}
      />
    </section>
  );
}
