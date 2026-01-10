import React, { useEffect, useState } from "react";
import { buttonStyle } from "../../utils/styles";
import api from "../../api/axios";
import { ampmTo24, formatTimeToAMPM } from "../../utils/time";

const AddTaskDialog = ({ open, onClose, onSubmit, defaultStatus = "pending", taskToEdit = null }) => {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    priority: "medium",
    date: "",
    time: "",
    status: defaultStatus,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isOngoingEdit = taskToEdit && taskToEdit.status === "ongoing";

  useEffect(() => {
    if (!open) return;

    if (taskToEdit) {
      setForm({
        title: taskToEdit.title || "",
        desc: taskToEdit.desc || "",
        priority: taskToEdit.priority || "medium",
        date: taskToEdit.date || "",
        time: ampmTo24(taskToEdit.time), // ✅ FIX HERE
        status: taskToEdit.status || defaultStatus,
      });
    } else {
      setForm({
        title: "",
        desc: "",
        priority: "medium",
        date: "",
        time: "",
        status: defaultStatus,
      });
    }
  }, [open, taskToEdit, defaultStatus]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const payload = {
        ...form,
        time: formatTimeToAMPM(form.time),
      };

      if (taskToEdit) {
        // ✏️ EDIT
        await api.put(`/tasks/${taskToEdit._id}`, payload);
      } else {
        // ➕ ADD
        await api.post("/tasks", payload);
      }

      onSubmit();
      onClose();
    } catch (err) {
      setError(taskToEdit ? "Failed to update task" : "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl w-full max-w-md p-6 space-y-5 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{taskToEdit ? "Edit Task" : "Add New Task"}</h3>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              type="text"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Date</label>
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                type="date"
                disabled={isOngoingEdit}
                className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm
                  ${isOngoingEdit ? "bg-gray-100 cursor-not-allowed" : ""}`}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Time</label>
              <input
                name="time"
                value={form.time}
                onChange={handleChange}
                type="time"
                disabled={isOngoingEdit}
                className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm
                  ${isOngoingEdit ? "bg-gray-100 cursor-not-allowed" : ""}`}
                required
              />
            </div>
          </div>
          {isOngoingEdit && <p className="text-xs text-gray-400">Date & time cannot be changed once task is started</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </button>

            <button type="submit" disabled={loading} className={`${buttonStyle} disabled:opacity-50`}>
              {loading ? (taskToEdit ? "Updating..." : "Adding...") : taskToEdit ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskDialog;
