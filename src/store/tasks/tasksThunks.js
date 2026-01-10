import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const res = await api.get("/tasks");
    return res.data;
  }
);
