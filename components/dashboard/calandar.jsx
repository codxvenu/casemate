import React, { useEffect, useState } from "react";
import { week } from "@/constants/weekName";
import { months } from "@/constants/months";
import { handleInitializeDate } from "@/utility/lib/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Calandar = () => {
  const [currentDate, setCurrentDate] = useState({});
  const days = [...Array(currentDate?.month?.Days)];
  function handleDec() {
    setCurrentDate((prev) => {
      return prev?.month?.id === 1
        ? { ...prev, month: months[12], year: prev.year - 1 }
        : { ...prev, month: months[prev?.month?.id - 1] };
    });
  }
  function handleInc() {
    setCurrentDate((prev) => {
      return prev?.month?.id === 12
        ? { ...prev, month: months[1], year: prev.year + 1 }
        : { ...prev, month: months[prev?.month?.id + 1]};
    });
  }
  function handleDate(day) {
    setCurrentDate((prev) => {
      return { ...prev, day };
    });
  }
  useEffect(() => {
    handleInitializeDate(setCurrentDate);
  }, []);
  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);
  return (
    <div className="bg-[var(--foreground)] p-3 rounded-xl  row-span-2  shadow-sm">
      <span className="flex justify-between items-center text-[14px] mb-2 text-center">
        <span
          className="max-[768px]:p-1  p-2 hover:bg-[var(--fileBox)] rounded-md"
          onClick={() => handleDec()}
        >
          <ChevronLeft className="w-4 h-4" />
        </span>
        {currentDate?.month?.monthName} {currentDate?.year}
        <span
          className="max-[768px]:p-1 p-2 rounded-md  hover:bg-[var(--fileBox)]"
          onClick={() => handleInc()}
        >
          <ChevronRight className="w-4 h-4" />
        </span>
      </span>
      <ul className="grid grid-cols-7 max-[768px]:text-[12px]  text-[13px] mt-3">
        {week.map((i, index) => (
          <li
            key={index}
            className="px-1.5 font-medium text-center text-[var(--fileText)]"
          >
            {i}
          </li>
        ))}
        {days.map((i, index) => (
          <li className="mt-2" onClick={() => handleDate(index+1)} key={index}>
            <button
              className={`flex items-center justify-center aspect-square w-full rounded-md text-sm leading-none transition-all outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-[var(--fileBox)] hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring ${currentDate.day === index+1 && "!bg-[var(--text)] text-[var(--foreground)]"}`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calandar;
