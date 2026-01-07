import { Search, ChevronDown, User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-18 px-4 pt-6 pb-3  border-l border-b border-gray-200 bg-white">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search for anything..."
          className="pl-10 pr-4 py-2 w-120 rounded-md bg-gray-100 text-sm focus:outline-none"
        />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="relative bg-gray-100 rounded-full w-10 h-10  flex items-center justify-center">
          <User size={18} className="text-gray-800" />
        </div>
        <div className="font-medium">Sagar Sonagara</div>
        <ChevronDown />
      </div>
    </header>
  );
};

export default Header;
