import { buttonStyle } from "../../utils/styles";
import AddTaskDialog from "./AddTaskDialog";
import PerformanceChart from "./PerformanceChart";
import TaskCard from "./TaskCard";
import { getTimeLeft } from "../../utils/time";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../store/tasks/tasksThunks";

const UpcomingTab = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector(
    (state) => state.tasks
  );

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Upcoming Work</h2>
        <button
          onClick={() => setOpenDialog(true)}
          className={buttonStyle}
        >
          Schedule Task
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-gray-500">Loading tasks...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Tasks */}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-6">
          {pendingTasks.length === 0 ? (
            <p className="text-sm text-gray-500">No pending tasks</p>
          ) : (
            pendingTasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.desc}
                date={task.date}
                time={task.time}
                priority={task.priority}
                status={task.status}
                timeLeft={getTimeLeft(task.date, task.time)}
              />
            ))
          )}
        </div>
      )}

      <PerformanceChart />

      {/* ADD TASK MODAL */}
      <AddTaskDialog
        open={openDialog}
        defaultStatus="pending"
        onClose={() => setOpenDialog(false)}
        onSubmit={() => {
          setOpenDialog(false);
          dispatch(fetchTasks()); // ✅ redux refresh
        }}
      />
    </div>
  );
};

export default UpcomingTab;
