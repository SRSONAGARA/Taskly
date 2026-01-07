import { scaleUpStyle } from "../../core/styles";

const ProgressBar = ({ label = "Today", value = 65 }) => {
  return (
    <div className={`flex items-center gap-4 w-full py-2 px-6 ${scaleUpStyle}`}>
      {/* Left label */}
      <span className="text-sm text-gray-500 whitespace-nowrap">{label}</span>

      {/* Progress bar */}
      <div className="flex-1 h-1.75 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${value}%` }} />
      </div>

      {/* Right label */}
      <span className="text-sm text-gray-400 whitespace-nowrap">{value}% completed</span>
    </div>
  );
};

export default ProgressBar;
