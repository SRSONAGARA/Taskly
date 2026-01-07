import BoardTab from "../components/dashbaord/BoardTab";
import ProgressBar from "../components/dashbaord/ProgressBar";
import TabHeader from "../components/dashbaord/TabHeader";
import { useState } from "react";
import UpcomingTab from "../components/dashbaord/UpcomingTab";
import RightPanel from "../components/dashbaord/RightPanel";
import {motion} from "framer-motion";
import { fadeUp } from "../core/animations";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  return (
    <motion.div variants={fadeUp} className="flex">
      <div className="space-y-6 w-full border-x border-gray-200 p-4">
        {/* Progress */}
        <ProgressBar label="Today" value={65} />

        {/* Tabs */}
        <TabHeader active={activeTab} onChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "Board" && <BoardTab />}
        {activeTab === "Upcoming" && <UpcomingTab />}
        {activeTab === "Notes" && <div>Notes content</div>}
      </div>

      {/* //   Right Panel */}
      <RightPanel />
    </motion.div>
  );
};

export default Dashboard;
