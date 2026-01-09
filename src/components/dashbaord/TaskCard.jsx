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
}) => {
  const priorityStyle =
    priorityConfig[priority.toLowerCase()] || priorityConfig.medium;

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
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs bg-black text-white px-2 py-1 rounded-md">
          ⏱ {timeLeft}
        </span>
        <span className="text-gray-400 cursor-pointer">⋯</span>
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
