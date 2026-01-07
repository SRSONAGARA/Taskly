import { buttonStyle } from "../../core/styles";
import AddTaskDialog from "./AddTaskDialog";
import PerformanceChart from "./PerformanceChart";
import TaskCard from "./TaskCard";
import React, { useState } from "react";

const UpcomingTab = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Upcoming Work</h2>
        <button onClick={() => setOpenDialog(true)} className={buttonStyle}>
          Schedule Task
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
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

      <PerformanceChart />

      {/* ADD TASK MODAL */}
      <AddTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={() => console.log("Task added")}
      />
    </div>
  );
};

export default UpcomingTab;
