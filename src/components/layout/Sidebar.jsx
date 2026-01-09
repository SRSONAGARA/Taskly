import { LayoutGrid, CheckSquare, BarChart3, Users, Settings, HelpCircle, ChevronsLeft } from "lucide-react";
import { pageContainer, slideLeft } from "../../utils/animations";
import { motion } from "framer-motion";
import { buttonStyle } from "../../utils/styles";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const menu = [
    { label: "Dashboard", icon: LayoutGrid, active: true },
    { label: "Tasks", icon: CheckSquare },
    { label: "Performance", icon: BarChart3 },
    { label: "Teams", icon: Users },
    { label: "Settings", icon: Settings },
  ];

  return (
    <motion.div variants={slideLeft} className="h-full bg-white ">
      <aside
        className={`h-screen bg-white
      flex flex-col ${collapsed ? "items-center" : "items-start"} transition-all duration-300
      ${collapsed ? "w-20" : "w-60"}`}
      >
        {/* Logo + Collapse */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } w-full h-18  px-4 pt-6 pb-3 border-b border-gray-200`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                🙂
              </div>
              <h1 className="text-lg font-semibold">Taskly</h1>
            </div>
          )}

          <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-lg hover:bg-gray-100">
            <ChevronsLeft size={18} className={`transition-transform ${collapsed && "rotate-180"}`} />
          </button>
        </div>

        {/* Navigation */}
        <motion.nav
          variants={pageContainer}
          initial="hidden"
          animate="show"
          className="flex-1 px-2 pt-4 w-full space-y-2 text-sm"
        >
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`
                  cursor-pointer transition rounded-xl
                  ${item.active ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"}

                  ${
                    collapsed
                      ? "w-10 h-10 mx-auto flex items-center justify-center"
                      : "flex items-center gap-3 px-3 py-2"
                  }

                  ${item.active ? "bg-indigo-50" : ""}
                `}
              >
                <Icon size={18} />
                {!collapsed && item.label}
              </div>
            );
          })}
        </motion.nav>

        {/* Upgrade Card */}
        {!collapsed && (
          <div className="bg-indigo-50 rounded-xl p-4 mx-4 mb-6">
            <p className="text-sm font-semibold mb-1">Be 137% more productive</p>
            <p className="text-xs text-gray-500 mb-3">Use AI to plan your work, automatically</p>
            <button className={`w-full ${buttonStyle}`}>Upgrade</button>
          </div>
        )}

        {/* Help Desk */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 cursor-pointer">
            <HelpCircle size={18} />
            {!collapsed && "Help desk"}
          </div>
        </div>
      </aside>
    </motion.div>
  );
};

export default Sidebar;
