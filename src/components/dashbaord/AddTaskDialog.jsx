import React, { useEffect, useState } from "react";
import { buttonStyle } from "../../utils/styles";
import api from "../../api/axios";
import { formatTimeToAMPM } from "../../utils/time";

const AddTaskDialog = ({ open, onClose, onSubmit, defaultStatus = "pending" }) => {
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

  useEffect(() => {
    if (open) {
      setForm((prev) => ({
        ...prev,
        status: defaultStatus,
      }));
    }
  }, [open, defaultStatus]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await api.post("/tasks", {
        ...form,
        time: formatTimeToAMPM(form.time),
      });

      onSubmit(); // refresh tasks
      onClose();

      // Reset form
      setForm({
        title: "",
        desc: "",
        priority: "medium",
        date: "",
        time: "",
        status: "pending",
      });
    } catch (err) {
      setError("Failed to create task");
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
          <h3 className="text-lg font-semibold">Add New Task</h3>
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
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
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
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </button>

            <button type="submit" disabled={loading} className={`${buttonStyle} disabled:opacity-50`}>
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskDialog;
