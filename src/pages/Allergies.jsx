import { useState } from "react";
import "./Allergies.css";
import Select from "react-select";
import { useLoaderData } from "react-router-dom";

const ALLERGENS = [
  {
    value: "Wheat, Pasta, Flour, Bread, Cake",
    label: "Gluten",
  },
  { value: "Tuna, Salmon", label: "Fish" },
  { value: "Mushrooms", label: "Mushrooms" },
  { value: "Milk, Cream, Cheese, Butter, Yogurt", label: "Dairy" },
  { value: "Eggs", label: "Eggs" },
  { value: "Crab, Lobster, Shrimp", label: "Shellfish" },
  { value: "Vanilla", label: "Vanilla" },
  { value: "Corn", label: "Corn" },
  { value: "Honey", label: "Honey" },
  { value: "Garlic", label: "Garlic" },
  { value: "Soy", label: "Soy" },
];

const EMPLOYEES_DEFAULT_INFO = [
  { name: "Lisa Rexroad", allergies: [] },
  { name: "Jon Deichmann", allergies: [] },
  { name: "Jun Kyung Lee ", allergies: [] },
  { name: "Ivan Rebolledo", allergies: [] },
  { name: "JC Smiley Jr", allergies: [] },
  { name: "Vartika Patel", allergies: [] },
  { name: "Jessica Beazer", allergies: [] },
  { name: "Jennifer Alexander", allergies: [] },
  { name: "Radhika Lele", allergies: [] },
];

export default function Allergies() {
  //dishes from dishes API
  const dishes = useLoaderData();
  console.log(dishes);
  const [employees, setEmployees] = useState(
    localStorage.getItem("employeesInformation") !== null
      ? JSON.parse(localStorage.getItem("employeesInformation"))
      : EMPLOYEES_DEFAULT_INFO
  );

  function handleAllergiesUpdated(updatedEmployeeAllergies, selectedOptions) {
    const updatedEmployeesData = employees.map((employee) => {
      if (employee.name === updatedEmployeeAllergies.name) {
        employee.allergies = selectedOptions.map((allergy) => {
          return { value: allergy.value, label: allergy.label };
        });
      }
      return employee;
    });
    setEmployees(updatedEmployeesData);
    //save update employees allergies to local storage
    localStorage.setItem(
      "employeesInformation",
      JSON.stringify(updatedEmployeesData)
    );

    const employeesWithAllergies = updatedEmployeesData.filter(
      (employee) => employee.allergies.length > 0
    );
    //here take allergens and return ingredients that cause allergies
    const listOfAllergiesAmongEmployees = employeesWithAllergies.map(
      (employee) =>
        employee.allergies.flatMap((allergy) => {
          if (
            allergy.label === "Fish" ||
            allergy.label === "Gluten" ||
            allergy.label === "Dairy" ||
            allergy.label === "Shellfish"
          ) {
            return allergy.value.split(" ");
          }
          return allergy.value;
        })
    );

    const listOfUniqueAllergies = [
      ...new Set(listOfAllergiesAmongEmployees.flat()),
    ];
    console.log(listOfUniqueAllergies);
    //get dishes from api and
    const dishesWithoutEmployeesAllergents = dishes.filter((dish) => {
      dish.ingredients.forEach((ingredient) => {
        return listOfUniqueAllergies.includes(ingredient);
      });
    });

    console.log(dishesWithoutEmployeesAllergents);
    //filter dishes that contain any of the allergens listed
  }

  return (
    <>
      <section className="allergies_container">
        <h2 className="allergies_title">Allergies</h2>{" "}
        <ul>
          {employees.map((employee) => (
            <li key={employee.name} className="allergies_list_container">
              <span className="employee_name_container">{employee.name}</span>
              <span className="drop_menu_container">
                <Select
                  onChange={(selectedOptions) =>
                    handleAllergiesUpdated(employee, selectedOptions)
                  }
                  closeMenuOnSelect={false}
                  isMulti
                  name="colors"
                  options={ALLERGENS}
                  value={employee.allergies}
                />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

//Dishes API loader
export async function dishesLoader() {
  try {
    const ApiResponse = await fetch("https://menus-api.vercel.app/dishes");
    if (!ApiResponse.ok) {
      throw new Error(`Response status: ${ApiResponse.status}`);
    }
    const dishesData = await ApiResponse.json();
    return dishesData;
  } catch (error) {
    console.error(error.message);
  }
}
