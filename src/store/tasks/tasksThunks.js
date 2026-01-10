import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const res = await api.get("/tasks");
    return res.data;
  }
);
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ taskId, status }, { dispatch }) => {
    console.log(`-----> TaskID= ${taskId}`);
    
    await api.put(`/tasks/${taskId}`, { status });

    // refresh task list after update
    dispatch(fetchTasks());
  }
);