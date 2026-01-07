import PerformanceChart from "./PerformanceChart";
import TaskCard from "./TaskCard";

const UpcomingTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Upcoming Work</h2>

      <div className="grid grid-cols-2 gap-6 pr-2">
        <TaskCard
          title="Brainstorming"
          description="Brainstorming with team on storly app"
          timeLeft="12 Min Left"
          date="23 Mar 2024"
          time="12:45 pm"
          priority="Medium"
        />

        <TaskCard
          title="Re-branding Discussion"
          description="Discussion on re-branding of demo Brand"
          timeLeft="58 Min Left"
          date="23 Mar 2024"
          time="1:30 pm"
          priority="Medium"
        />
      </div>

      <PerformanceChart/>
    </div>
  );
};

export default UpcomingTab;
