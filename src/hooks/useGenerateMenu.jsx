import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { addToLocalStorage } from "../functions/addToLocalStorage";

import useGenerateWeeklyDishes from "./useGenerateWeeklyDishes";

export default function useGenerateMenu() {
  const [selectedDaysFromCalendar, setSelectedDaysFromCalendar] = useState([]);
  const [offDaysFromCalendar, setOffDaysFromCalendar] = useState([]);
  const [menuDishes, setMenuDishes] = useGenerateWeeklyDishes();

  const handleSelectedDaysUpdate = (dataArray) => {
    setSelectedDaysFromCalendar(dataArray);
  };

  const handleOffDaysUpdate = (dataArray) => {
    setOffDaysFromCalendar(dataArray);
  };

  useEffect(() => {
    // Temporary -- generates a menu on mount
    setMenuDishes();
  }, [selectedDaysFromCalendar, offDaysFromCalendar]);

  // Replaces local storage
  const [generatedWeeklyMenuReplace, setGeneratedWeeklyMenuReplace] =
    useLocalStorage("generatedWeeklyMenu", []);

  // Adds to local storage
  const [generatedWeeklyMenuAdd, setGeneratedWeeklyMenuAdd] = addToLocalStorage(
    "generatedWeeklyMenu",
    []
  );

  const storedWeeklyMenu = JSON.parse(
    localStorage.getItem("generatedWeeklyMenu")
  );

  const [modalType, setModalType] = useState(null);

  const handleGenerate = () => {
    // (Generate) if local storage is already populated
    if (storedWeeklyMenu !== null) {
      // (Generate) if a week already has a menu
      if (storedWeeklyMenu.find((x) => x.id === selectedDaysFromCalendar[0])) {
        setModalType("B");
      } else {
        // (Generate) combines dates, off-days, safe-dishes into objects
        const combinedArray = selectedDaysFromCalendar.map((date, index) => ({
          id: date,
          off: offDaysFromCalendar[index] || false,
          menu: menuDishes[index] || null,
        }));

        setGeneratedWeeklyMenuAdd(combinedArray);

        setMenuDishes();

        setModalType("A");
      }
    } else {
      // (Generate) if local storage does not exist
      // (Generate) combines dates, off-days, safe-dishes into objects
      const combinedArray = selectedDaysFromCalendar.map((date, index) => ({
        id: date,
        off: offDaysFromCalendar[index] || false,
        menu: menuDishes[index] || null,
      }));

      setGeneratedWeeklyMenuAdd(combinedArray);

      setMenuDishes();

      setModalType("A");
    }
  };

  const handleRegenerate = () => {
    // used to enable useEffect for randomization in case dates and days off were untouched
    setMenuDishes();

    // (Regenerate) if selected week already has generated menu
    if (
      storedWeeklyMenu &&
      storedWeeklyMenu.find((x) => x.id === selectedDaysFromCalendar[0])
    ) {
      // (Regenerate) deletes selected week from local storage
      const updatedStoredWeeklyMenu = storedWeeklyMenu.filter(
        (x) => !selectedDaysFromCalendar.includes(x.id)
      );
      setGeneratedWeeklyMenuReplace(updatedStoredWeeklyMenu);

      // combines dates, off-days, safe-dishes into objects
      const combinedArray = selectedDaysFromCalendar.map((date, index) => ({
        id: date,
        off: offDaysFromCalendar[index] || false,
        menu: menuDishes[index] || null,
      }));

      setGeneratedWeeklyMenuAdd(combinedArray);

      setMenuDishes();

      setModalType("D");
    } else {
      // (Regenerate) if selected week DO NOT have a generated menu
      setModalType("E");
    }
  };

  return {
    handleSelectedDaysUpdate,
    handleOffDaysUpdate,
    handleGenerate,
    handleRegenerate,
    modalType,
    setModalType,
  };
}
