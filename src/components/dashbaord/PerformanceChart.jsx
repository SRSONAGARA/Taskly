import { useState } from "react";
import { ChevronDown } from "lucide-react";
import RangeSelect from "./RangeSelect";

const weeklyData = [
  { day: "16 Mar", value: 20 },
  { day: "17 Mar", value: 80 },
  { day: "18 Mar", value: 97 },
  { day: "19 Mar", value: 70 },
  { day: "20 Mar", value: 45 },
  { day: "21 Mar", value: 60 },
  { day: "22 Mar", value: 55 },
];

const monthlyData = [
  { day: "Week 1", value: 65 },
  { day: "Week 2", value: 80 },
  { day: "Week 3", value: 40 },
  { day: "Week 4", value: 75 },
];

const PerformanceChart = () => {
  const [range, setRange] = useState("Weekly");
  const [activeIndex, setActiveIndex] = useState(2);

  const data = range === "Weekly" ? weeklyData : monthlyData;
  const activeValue = data[activeIndex]?.value || 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-card grid grid-cols-12 gap-6">
      {/* LEFT */}
      <div className="col-span-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg">Performance</h3>
            <p className="text-sm text-gray-400">Last {range}</p>
          </div>

          {/* <div className="relative inline-block">
            <select
              value={range}
              onChange={(e) => {
                setRange(e.target.value);
                setActiveIndex(0);
              }}
              className="appearance-none border rounded-sm px-2 pr-6 py-1.5  text-sm text-gray-600 cursor-pointer"
            >
              <option>Weekly</option>
              <option>Monthly</option>
            </select>

            <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-400">
              <ChevronDown size={18} className="text-indigo-600" />
            </span>
          </div> */}
          <RangeSelect
            value={range}
            onChange={(val) => {
              setRange(val);
              setActiveIndex(0);
            }}
          />
        </div>

        {/* Chart */}
        <div className="flex items-end gap-6 h-44 relative">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 relative cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              {/* Tooltip */}
              {activeIndex === index && (
                <div className="absolute -top-12 bg-white shadow-lg text-xs px-3 py-1 rounded-lg">
                  <p className="font-semibold">Hurraahhh!</p>
                  <p className="text-gray-400">
                    Super Productive <span className="font-semibold text-black">{item.value}%</span>
                  </p>
                </div>
              )}

              {/* Bar */}
              <div className="h-36 w-3 bg-gray-100 rounded-full flex items-end overflow-hidden">
                <div
                  className={`w-full rounded-full transition-all duration-500 ${
                    activeIndex === index ? "bg-indigo-600" : "bg-indigo-200"
                  }`}
                  style={{ height: `${item.value}%` }}
                />
              </div>

              <span className="text-xs text-gray-400">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-4 bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full mb-4">
          <span className="text-sm font-medium">Long term Goals</span>
          <span className="text-gray-400">⋯</span>
        </div>

        {/* Donut */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#E0E7FF" strokeWidth="10" fill="none" />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#4F46E5"
              strokeWidth="10"
              fill="none"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={2 * Math.PI * 56 * (1 - activeValue / 100)}
              className="transition-all duration-700"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-indigo-600">{activeValue}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
          <span className="w-2 h-2 bg-indigo-600 rounded-full" />
          Goal Achieved
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
