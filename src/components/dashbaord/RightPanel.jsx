import React, { useState } from "react";

const RightPanel = () => {
  const today = new Date();

  const [activeTopTab, setActiveTopTab] = useState("calendar");
  const [calendarTab, setCalendarTab] = useState("Monthly");

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const isPastDate = (date) => {
    return new Date(currentYear, currentMonth, date) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const changeMonth = (direction) => {
    setSelectedDate(null);

    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((y) => y - 1);
      } else {
        setCurrentMonth((m) => m - 1);
      }
    }

    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((y) => y + 1);
      } else {
        setCurrentMonth((m) => m + 1);
      }
    }
  };

  return (
    <div className="w-90 bg-white  px-4 py-6 space-y-6">
      {/* TOP ICONS */}
      <div className="flex justify-end gap-6 text-gray-400">
        <button onClick={() => setActiveTopTab("calendar")}>📅</button>
        <button onClick={() => setActiveTopTab("notification")}>🔔</button>
        <button onClick={() => setActiveTopTab("qa")}>💬</button>
      </div>

      {/* CALENDAR */}
      {activeTopTab === "calendar" && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          {/* Tabs */}
          <div className="flex gap-6 text-sm font-medium">
            {["Monthly", "Daily"].map((tab) => (
              <button
                key={tab}
                onClick={() => setCalendarTab(tab)}
                className={`pb-1 ${
                  calendarTab === tab
                    ? "text-black border-b-2 border-indigo-600"
                    : "text-gray-400 border-b-2 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Month Header */}
          <div className="flex items-center justify-between text-sm font-medium">
            <span>
              {monthNames[currentMonth]} {currentYear}
            </span>
            <div className="flex gap-3 text-gray-400">
              <button onClick={() => changeMonth("prev")}>‹</button>
              <button onClick={() => changeMonth("next")}>›</button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-xs ">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="text-center">
                {d}
              </span>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {/* Empty cells before start */}
            {Array.from({ length: startDay }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = i + 1;
              const isPast = isPastDate(date);
              const isSelected = selectedDate === date;

              return (
                <button
                  key={date}
                  disabled={isPast}
                  onClick={() => setSelectedDate(date)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center
                    ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : isPast
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-900 hover:bg-indigo-100"
                    }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* NOTIFICATIONS */}
      {activeTopTab === "notification" && (
        <div className="space-y-4">
          {/* Notification Card 1 */}
          <div className="flex items-start gap-3 border rounded-xl p-4">
            <span className="text-orange-500 text-lg">🔔</span>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-orange-500">Deadline</h4>
              <p className="text-sm text-gray-500">Rebranding meeting in 1 hour.</p>
            </div>
            <button className="text-gray-400">✕</button>
          </div>

          {/* Notification Card 2 */}
          <div className="flex items-start gap-3 border rounded-xl p-4">
            <span className="text-green-500 text-lg">🔔</span>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-green-500">Task Update:</h4>
              <p className="text-sm text-gray-500">2 completed, 3 pending, 2 in progress.</p>
            </div>
            <button className="text-gray-400">✕</button>
          </div>

          {/* Notification Card 3 */}
          <div className="flex items-start gap-3 border rounded-xl p-4">
            <span className="text-indigo-600 text-lg">🔔</span>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-indigo-600">Exciting News:</h4>
              <p className="text-sm text-gray-500">Taskly's new AI for work planning makes work easy and faster!</p>
            </div>
            <button className="text-gray-400">✕</button>
          </div>
        </div>
      )}

      {/* QA SECTION – NEW LAYOUT */}
      {activeTopTab === "qa" && (
        <div className="space-y-3">
          {/* QA Item */}
          <div className="flex gap-3 bg-white border rounded-xl p-4">
            {/* Status Indicator */}
            <span className="mt-1 w-2 h-2 bg-green-500 rounded-full" />

            <div className="flex-1 space-y-2">
              {/* Header */}
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-semibold text-gray-800">How to reschedule a task?</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Answered</span>
              </div>

              {/* Answer */}
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500">
                You can reschedule a task by opening it and selecting a new date from the calendar.
              </div>
            </div>
          </div>

          {/* QA Item */}
          <div className="flex gap-3 bg-white border rounded-xl p-4">
            <span className="mt-1 w-2 h-2 bg-yellow-500 rounded-full" />

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-semibold text-gray-800">Can I assign tasks to multiple users?</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">Pending</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500">
                This feature is currently in progress and will be available soon.
              </div>
            </div>
          </div>

          {/* QA Item */}
          <div className="flex gap-3 bg-white border rounded-xl p-4">
            <span className="mt-1 w-2 h-2 bg-green-500 rounded-full" />

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-semibold text-gray-800">How does Taskly AI work?</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Answered</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500">
                Taskly AI analyzes your tasks and suggests optimal schedules to improve productivity.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TASK SECTION */}
      <div className="space-y-4">
        <h3 className="font-semibold">Task</h3>

        <ul className="space-y-3 text-sm text-gray-500">
          <li className="flex items-center gap-2">
            <input type="checkbox" className="accent-indigo-600" />
            Schedule post Dusk&Dawn
          </li>

          <li className="flex items-center gap-2">
            <input type="checkbox" className="accent-indigo-600" />
            Design post for Holi
          </li>

          <li className="flex items-center gap-2">
            <input type="checkbox" className="accent-indigo-600" />
            Brainstorming new project
          </li>

          <li className="flex items-center gap-2">
            <input type="checkbox" className="accent-indigo-600" />
            Re-Branding Discussion
          </li>

          <li className="flex items-center gap-2">
            <input type="checkbox" className="accent-indigo-600" />
            User Research
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightPanel;
