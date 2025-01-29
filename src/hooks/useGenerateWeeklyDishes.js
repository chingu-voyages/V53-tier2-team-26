// import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useLoaderData } from "react-router-dom";

import getSafeDishesFromLocal from "../functions/getSafeDishesFromLocal";

export default function useGenerateWeeklyDishes() {
    const fetchDishes = useLoaderData();
    const [menuDishes, setDishes] = useLocalStorage("menuDishes", {});

    function setMenuDishes() {
        const safeDishes = getSafeDishesFromLocal();

        function randomizeSortSlice(array) {
            console.log(array.length);
            return array.sort(() => Math.random() - 0.5).slice(0, 7);
        }
        if (!safeDishes || safeDishes.length === 0) {
            setDishes({
                currentWeek: randomizeSortSlice(fetchDishes),
                nextWeek: randomizeSortSlice(fetchDishes),
            });
            return;
        } else {
            setDishes({
                currentWeek: randomizeSortSlice(getSafeDishesFromLocal()),
                nextWeek: randomizeSortSlice(getSafeDishesFromLocal()),
            });
        }
    }

    return [menuDishes, setMenuDishes];
}
