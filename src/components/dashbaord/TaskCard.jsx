import { useState, useRef, useEffect } from "react";

const priorityConfig = {
  high: {
    label: "High",
    bg: "bg-red-100",
    text: "text-red-600",
    ring: "ring-red-200",
  },
  medium: {
    label: "Medium",
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    ring: "ring-yellow-200",
  },
  low: {
    label: "Low",
    bg: "bg-green-100",
    text: "text-green-600",
    ring: "ring-green-200",
  },
};

const TaskCard = ({
  title,
  description,
  timeLeft,
  priority = "medium",
  date,
  time,
  onEdit,
  onDelete,
}) => {
  const priorityStyle =
    priorityConfig[priority.toLowerCase()] || priorityConfig.medium;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="bg-white rounded-xl p-4 space-y-4
      border border-transparent
      shadow-[0_8px_24px_rgba(0,0,0,0.08)]
      transition-all duration-200
      hover:border-indigo-200
      hover:shadow-[0_12px_32px_rgba(79,70,229,0.15)]
      hover:-translate-y-1"
    >
      {/* Top row */}
      <div className="flex items-center justify-between relative">
        <span className="flex items-center gap-1 text-xs bg-black text-white px-2 py-1 rounded-md">
          ⏱ {timeLeft}
        </span>

        {/* Menu trigger */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-400 hover:text-gray-600 px-2 cursor-pointer"
          >
            ⋯
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.();
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-t-lg"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-[12px] text-gray-400">{description}</p>
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium
          ${priorityStyle.bg} ${priorityStyle.text}`}
        >
          {priorityStyle.label} Priority
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-[10px] text-gray-500">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
          📅 {date}
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
          ⏰ {time}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
