import React, { useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskDialog from "./AddTaskDialog";

// const BoardTab = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold pb-6">Board</h2>

//       <div className="grid grid-cols-3 gap-4">
//         {/* ON PROGRESS */}
//         <div className="bg-gray-50 rounded-xl p-4 space-y-4">
//           <h3 className="font-semibold text-sm">● On Progress</h3>

//           <TaskCard
//             title="User Research"
//             description="Discussion on re-branding of demo Brand"
//             timeLeft="Ongoing"
//             date="23 Mar 2024"
//             time="—"
//             priority="Medium"
//           />

//           <TaskCard
//             title="Change copies"
//             description="Change copies of website"
//             timeLeft="Ongoing"
//             date="23 Mar 2024"
//             time="—"
//             priority="Low"
//           />

//           <button className="w-full border rounded-lg py-2 text-sm text-gray-500">
//             + Add Task
//           </button>
//         </div>

//         {/* PENDING */}
//         <div className="bg-gray-50 rounded-xl p-4 space-y-4">
//           <h3 className="font-semibold text-sm">● Pending</h3>

//           <TaskCard
//             title="Re-branding Discussion"
//             description="Discussion on re-branding of demo Brand"
//             timeLeft="58 Min Left"
//             date="23 Mar 2024"
//             time="1:30 pm"
//             priority="Medium"
//           />

//           <TaskCard
//             title="Brainstorming"
//             description="Brainstorming with team on storly app"
//             timeLeft="12 Min Left"
//             date="23 Mar 2024"
//             time="12:45 pm"
//             priority="Medium"
//           />

//           <TaskCard
//             title="UI/UX testing"
//             description="Perform user testing on product"
//             timeLeft="2 Days Left"
//             date="25 Mar 2024"
//             time="10:00 am"
//             priority="High"
//           />

//           <button className="w-full border rounded-lg py-2 text-sm text-gray-500">
//             + Add Task
//           </button>
//         </div>

//         {/* COMPLETED */}
//         <div className="bg-gray-50 rounded-xl p-4 space-y-4">
//           <h3 className="font-semibold text-sm text-green-600">● Completed</h3>

//           <TaskCard
//             title="Schedule Post"
//             description="Schedule instagram post of dusk & dawn"
//             timeLeft="Completed"
//             date="—"
//             time="Done"
//             priority="Medium"
//           />

//           <TaskCard
//             title="Holi Post"
//             description="Design Post for Holi"
//             timeLeft="Completed"
//             date="—"
//             time="Done"
//             priority="Medium"
//           />

//           <button className="w-full border border-dashed rounded-lg py-2 text-sm text-gray-500">
//             + Add Task
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardTab;



const BoardTab = () => {
  const [openDialog, setOpenDialog] = useState(false);

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

          <button
            onClick={() => setOpenDialog(true)}
            className="w-full border rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-100"
          >
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

          <button
            onClick={() => setOpenDialog(true)}
            className="w-full border rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-100"
          >
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

          <button
            onClick={() => setOpenDialog(true)}
            className="w-full border border-dashed rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-100"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* ADD TASK MODAL */}
      <AddTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={() => console.log("Task added")}
      />
    </div>
  );
};

export default BoardTab;
