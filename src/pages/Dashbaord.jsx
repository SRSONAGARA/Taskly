import BoardTab from "../components/dashbaord/BoardTab";
import ProgressBar from "../components/dashbaord/ProgressBar";
import TabHeader from "../components/dashbaord/TabHeader";
import { useState } from "react";
import UpcomingTab from "../components/dashbaord/UpcomingTab";
import RightPanel from "../components/dashbaord/RightPanel";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  return (
    <div className="flex">
      <div className="space-y-6 w-full border-x border-gray-200 p-2">
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
    </div>
  );
};

export default Dashboard;
