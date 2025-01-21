import { useState } from "react";
import "./Allergies.css";
import Select from "react-select";
import { useLoaderData } from "react-router-dom";

const ALLERGENS = [
  {
    value: "Wheat Pasta Flour Bread Cake",
    label: "Gluten",
  },
  { value: "Milk Cream Cheese Butter Yogurt", label: "Dairy" },
  { value: "Eggs Egg", label: "Eggs" },
  { value: "Soy", label: "Soy" },
  { value: "Crab Lobster Shrimp", label: "Shellfish" },
  { value: "Tuna Salmon", label: "Fish" },
  { value: "Nuts", label: "Nuts" },
  { value: "Peanuts", label: "Peanuts" },
  { value: "Lemon Orange Lime", label: "Citrus" },
  { value: "Tomatoes Tomato", label: "Tomatoes" },
  { value: "Garlic", label: "Garlic" },
  { value: "Onions Onion", label: "Onions" },
  { value: "Corn", label: "Corn" },
  { value: "Avocado", label: "Avocado" },
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
    //take allergens and return ingredients that cause allergies
    const listOfAllergiesAmongEmployees = employeesWithAllergies.map(
      (employee) =>
        employee.allergies.flatMap((allergy) => {
          if (
            allergy.label === "Fish" ||
            allergy.label === "Gluten" ||
            allergy.label === "Dairy" ||
            allergy.label === "Shellfish"
          ) {
            return allergy.value.split(" ").concat(allergy.label);
          }
          return allergy.value;
        })
    );

    const listOfUniqueAllergies = [
      ...new Set(listOfAllergiesAmongEmployees.flat()),
    ];
    //take allergens and return ingredients that cause allergies
    console.log(listOfUniqueAllergies);

    //dishes without employees allergens
    const dishesWithoutEmployeesAllergens = dishes.filter((dish) => {
      //exclude dishes with allergen on name
      console.log(dish.name);
      const match = dish.name
        .split(" ")
        .some((name) => listOfUniqueAllergies.includes(name));
      console.log(match);
      // if (listOfUniqueAllergies.includes(dish.name.split(" ")[0])) {
      if (match) {
        return false;
      }
      //exclude dishes with allergen on name
      const results = dish.ingredients.every(
        (ingredient) => !listOfUniqueAllergies.includes(ingredient)
      );
      return results;
    });
    console.log(dishesWithoutEmployeesAllergens);
    //dishes without employees allergens
    ///save this to local storage
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
