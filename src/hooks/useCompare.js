import { useState } from "react";
import Swal from "sweetalert2";

export const useCompare = () => {
    const [compareList, setCompareList] = useState([]);

    const toggleCompare = (car) => {
        if (compareList.some((item) => item._id === car._id)) {
            setCompareList(compareList.filter((item) => item._id !== car._id));
        } else if (compareList.length < 3) {
            setCompareList([...compareList, car]);
        } else {
            Swal.fire("Error", "You can compare up to 3 cars at a time.", "error");
        }
    };

    return [compareList, toggleCompare];
};
