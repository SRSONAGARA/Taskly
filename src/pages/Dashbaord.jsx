import BoardTab from "../components/dashbaord/BoardTab";
import ProgressBar from "../components/dashbaord/ProgressBar";
import TabHeader from "../components/dashbaord/TabHeader";
import UpcomingTab from "../components/dashbaord/UpcomingTab";
import OverdueTasksTab from "../components/dashbaord/OverdueTasksTab";
import RightPanel from "../components/dashbaord/RightPanel";

import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/tasks/tasksThunks";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.tasks);

  // ✅ FETCH TASKS ONLY ONCE
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, items.length]);

  return (
    <motion.div variants={fadeUp} className="flex">
      <div className="space-y-6 w-full border-x border-gray-200 p-4">
        {/* Progress */}
        <ProgressBar label="Today" value={65} />

        {/* Tabs */}
        <TabHeader active={activeTab} onChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "Upcoming" && <UpcomingTab />}
        {activeTab === "Board" && <BoardTab />}
        {activeTab === "Overdue Tasks" && <OverdueTasksTab />}
        {activeTab === "Notes" && <div>Notes content</div>}
      </div>

      {/* Right Panel */}
      <RightPanel />
    </motion.div>
  );
};

export default Dashboard;
