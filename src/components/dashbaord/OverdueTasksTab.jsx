import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskDialog from "./AddTaskDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../store/tasks/tasksThunks";

const OverdueTasksTab = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector((state) => state.tasks);

  const overdueTasks = tasks.filter((task) => task.status === "overdue");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-red-600">⚠️ Overdue Tasks</h2>
        <p className="text-sm text-gray-500">Tasks that have passed their scheduled time</p>
      </div>

      {/* Loading */}
      {loading && <p className="text-sm text-gray-500">Loading overdue tasks...</p>}

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Tasks */}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-6">
          {overdueTasks.length === 0 ? (
            <div className="col-span-2 text-center text-sm text-gray-500 py-10">🎉 No overdue tasks — great job!</div>
          ) : (
            overdueTasks.map((task) => (
              <TaskCard
                key={task._id}
                _id={task._id}
                title={task.title}
                description={task.desc}
                date={task.date}
                time={task.time}
                priority={task.priority}
                status={task.status}
                timeLeft="Overdue"
                onEdit={() => {
                  setEditingTask(task);
                  setOpenDialog(true);
                }}
              />
            ))
          )}
        </div>
      )}

      <AddTaskDialog
        open={openDialog}
        defaultStatus="overdue"
        taskToEdit={editingTask}
        onClose={() => {
          setOpenDialog(false);
          setEditingTask(null);
        }}
        onSubmit={() => {
          setOpenDialog(false);
          setEditingTask(null);
          dispatch(fetchTasks());
        }}
      />
    </div>
  );
};

export default OverdueTasksTab;
