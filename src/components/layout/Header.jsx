import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, User, LogOut } from "lucide-react";

const Header = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between h-18 px-4 pt-6 pb-3 border-l border-b border-gray-200 bg-white">
      
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          placeholder="Search for anything..."
          className="pl-10 pr-4 py-2 w-120 rounded-md bg-gray-100 text-sm focus:outline-none"
        />
      </div>

      {/* Profile */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3"
        >
          <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
            <User size={18} className="text-gray-800" />
          </div>

          <span className="font-medium">Sagar Sonagara</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* DROPDOWN */}
        <div
          className={`absolute right-0 mt-3 w-56 rounded-xl bg-white shadow-xl border
          transition-all duration-300 origin-top
          ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
          }`}
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold">Sagar Sonagara</p>
            <p className="text-xs text-gray-400">sagar@email.com</p>
          </div>

          {/* Actions */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:rounded-b-xl"
            onClick={() => {
              console.log("Logout");
              setOpen(false);
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
