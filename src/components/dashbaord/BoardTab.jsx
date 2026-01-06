// import React from "react";

// const BoardTab = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold pb-6">Board</h2>

//       <div className="grid grid-cols-3 gap-6">
//         {/* On Progress */}
//         <div className="bg-gray-50 rounded-xl p-4">
//           <h3 className="font-semibold mb-4">● On Progress</h3>
//           {/* cards */}
//           <button className="mt-4 w-full border rounded-lg py-2 text-sm text-gray-500">+ Add Task</button>
//         </div>

//         {/* Pending */}
//         <div className="bg-gray-50 rounded-xl p-4">
//           <h3 className="font-semibold mb-4">● Pending</h3>
//           {/* cards */}
//           <button className="mt-4 w-full border rounded-lg py-2 text-sm text-gray-500">+ Add Task</button>
//         </div>

//         {/* Completed */}
//         <div className="bg-gray-50 rounded-xl p-4 border border-indigo-500">
//           <h3 className="font-semibold mb-4 text-green-600">● Completed</h3>
//           {/* cards */}
//           <button className="mt-4 w-full border border-dashed rounded-lg py-2 text-sm text-gray-500">+ Add Task</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardTab;



import React from "react";
import TaskCard from "./TaskCard";

const BoardTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold pb-6">Board</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* ON PROGRESS */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-sm">● On Progress</h3>

          <TaskCard
            title="User Research"
            description="Discussion on re-branding of demo Brand"
            timeLeft="Ongoing"
            date="23 Mar 2024"
            time="—"
            priority="Medium"
          />

          <TaskCard
            title="Change copies"
            description="Change copies of website"
            timeLeft="Ongoing"
            date="23 Mar 2024"
            time="—"
            priority="Low"
          />

          <button className="w-full border rounded-lg py-2 text-sm text-gray-500">
            + Add Task
          </button>
        </div>

        {/* PENDING */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-sm">● Pending</h3>

          <TaskCard
            title="Re-branding Discussion"
            description="Discussion on re-branding of demo Brand"
            timeLeft="58 Min Left"
            date="23 Mar 2024"
            time="1:30 pm"
            priority="Medium"
          />

          <TaskCard
            title="Brainstorming"
            description="Brainstorming with team on storly app"
            timeLeft="12 Min Left"
            date="23 Mar 2024"
            time="12:45 pm"
            priority="Medium"
          />

          <TaskCard
            title="UI/UX testing"
            description="Perform user testing on product"
            timeLeft="2 Days Left"
            date="25 Mar 2024"
            time="10:00 am"
            priority="High"
          />

          <button className="w-full border rounded-lg py-2 text-sm text-gray-500">
            + Add Task
          </button>
        </div>

        {/* COMPLETED */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-sm text-green-600">● Completed</h3>

          <TaskCard
            title="Schedule Post"
            description="Schedule instagram post of dusk & dawn"
            timeLeft="Completed"
            date="—"
            time="Done"
            priority="Medium"
          />

          <TaskCard
            title="Holi Post"
            description="Design Post for Holi"
            timeLeft="Completed"
            date="—"
            time="Done"
            priority="Medium"
          />

          <button className="w-full border border-dashed rounded-lg py-2 text-sm text-gray-500">
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardTab;
