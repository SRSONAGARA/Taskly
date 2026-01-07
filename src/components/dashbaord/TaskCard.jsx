const TaskCard = ({
  title,
  description,
  timeLeft,
  priority = "Medium",
  date,
  time,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] space-y-4">
      
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
        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-500">
          High priority
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
          {priority}
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
