import { useState } from "react";
import { ChevronDown, CalendarDays } from "lucide-react";

const RangeSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = ["Weekly", "Monthly"];

  return (
    <div className="relative w-28 font-semibold">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border rounded-sm px-2 py-1.5 text-[12px] text-gray-600"
      >
        <CalendarDays  size={16}/>
        {value}
        <span className="text-gray-400">
          {" "}
          <ChevronDown size={18} className="text-indigo-600" />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-sm shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-3 py-2 text-[12px] cursor-pointer
                hover:bg-indigo-600 hover:text-white
                ${value === option ? "bg-indigo-50 text-indigo-600" : ""}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RangeSelect;
