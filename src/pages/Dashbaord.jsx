import BoardTab from "../components/dashbaord/BoardTab";
import ProgressBar from "../components/dashbaord/ProgressBar";
import TabHeader from "../components/dashbaord/TabHeader";
import { useState } from "react";
import UpcomingTab from "../components/dashbaord/UpcomingTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  return (
    <div className="flex">
      <div className="space-y-6 w-full border-r border-gray-200 p-2">
        {/* Progress */}
        <ProgressBar label="Today" value={65} />

        {/* Tabs */}
        <TabHeader active={activeTab} onChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "Board" && <BoardTab />}
        {activeTab === "Upcoming" && <UpcomingTab/>}
        {activeTab === "Notes" && <div>Notes content</div>}
      </div>
      {/* // <div className="grid grid-cols-12 gap-3 "> */}

      {/* //   Right Panel */}
      <div className="col-span-4 w-90 bg-white rounded-xl shadow-card p-4">
        <h3 className="font-semibold mb-4">Task</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <input type="checkbox" /> Schedule post Dusk&Dawn
          </li>
          <li>
            <input type="checkbox" /> Design post for Holi
          </li>
          <li>
            <input type="checkbox" /> User Research
          </li>
        </ul>

        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">Schedule Task</button>
      </div>
    </div>
  );
};

export default Dashboard;
