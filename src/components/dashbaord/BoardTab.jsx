import TaskCard from "./TaskCard";
import AddTaskDialog from "./AddTaskDialog";
import { scaleUpStyle } from "../../utils/styles";
import { getTimeLeft } from "../../utils/time";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../../store/tasks/tasksThunks";

const BoardTab = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogStatus, setDialogStatus] = useState("pending");
  const [editingTask, setEditingTask] = useState(null);

  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector((state) => state.tasks);

  // ---------------- GROUP TASKS ----------------
  const onProgressTasks = tasks.filter((t) => t.status === "ongoing");
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  // ---------------- RENDER COLUMN ----------------
  const renderTasks = (list, emptyText) => {
    if (loading) return <p className="text-xs text-gray-400">Loading...</p>;
    if (error) return <p className="text-xs text-red-500">{error}</p>;
    if (list.length === 0) return <p className="text-xs text-gray-400">{emptyText}</p>;

    return list.map((task) => (
      <TaskCard
        key={task._id}
        _id={task._id}
        title={task.title}
        description={task.desc}
        status={task.status}
        date={task.date}
        time={task.time}
        priority={task.priority}
        timeLeft={task.status === "completed" ? "Completed" : getTimeLeft(task.date, task.time)}
        onEdit={() => {
          setEditingTask(task);
          setDialogStatus(task.status);
          setOpenDialog(true);
        }}
        onStart={() => dispatch(updateTaskStatus({ taskId: task._id, status: "ongoing" }))}
        onComplete={() => dispatch(updateTaskStatus({ taskId: task._id, status: "completed" }))}
      />
    ));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold pb-6">Board</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* ON PROGRESS */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-sm">● On Progress</h3>

          {renderTasks(onProgressTasks, "No tasks in progress")}

          <button
            onClick={() => {
              setDialogStatus("ongoing");
              setOpenDialog(true);
            }}
            className={`w-full border rounded-lg py-2 text-sm text-gray-500
              hover:bg-gray-100 hover:text-gray-900 hover:font-semibold ${scaleUpStyle}`}
          >
            + Add Task
          </button>
        </div>

        {/* PENDING */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-sm">● Pending</h3>

          {renderTasks(pendingTasks, "No pending tasks")}

          <button
            onClick={() => {
              setDialogStatus("pending");
              setOpenDialog(true);
            }}
            className={`w-full border rounded-lg py-2 text-sm text-gray-500
              hover:bg-gray-100 hover:text-gray-900 hover:font-semibold ${scaleUpStyle}`}
          >
            + Add Task
          </button>
        </div>

        {/* COMPLETED */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-sm text-green-600">● Completed</h3>

          {renderTasks(completedTasks, "No completed tasks")}

          <button
            onClick={() => {
              setDialogStatus("completed");
              setOpenDialog(true);
            }}
            className={`w-full border rounded-lg py-2 text-sm text-gray-500
              hover:bg-gray-100 hover:text-gray-900 hover:font-semibold ${scaleUpStyle}`}
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* ADD TASK MODAL */}
      <AddTaskDialog
        open={openDialog}
        defaultStatus={dialogStatus}
        taskToEdit={editingTask}
        onClose={() => {
          setOpenDialog(false);
          setEditingTask(null);
        }}
        onSubmit={() => {
          dispatch(fetchTasks());
          setEditingTask(null);
        }}
      />
    </div>
  );
};

export default BoardTab;
