import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import api from "../../api/axios";

const OverdueTasksTab = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- FETCH TASKS ----------------
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load overdue tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- FILTER OVERDUE TASKS ----------------
  const overdueTasks = tasks.filter(
    (task) => task.status === "overdue"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-red-600">
          ⚠️ Overdue Tasks
        </h2>
        <p className="text-sm text-gray-500">
          Tasks that have passed their scheduled time
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-gray-500">Loading overdue tasks...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Tasks */}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-6">
          {overdueTasks.length === 0 ? (
            <div className="col-span-2 text-center text-sm text-gray-500 py-10">
              🎉 No overdue tasks — great job!
            </div>
          ) : (
            overdueTasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.desc}
                date={task.date}
                time={task.time}
                priority={task.priority}
                status={task.status}
                timeLeft="Overdue"
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OverdueTasksTab;
