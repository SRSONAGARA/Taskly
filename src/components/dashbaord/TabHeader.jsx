const TabHeader = ({ active, onChange }) => {
  const tabs = ["Upcoming", "Board", "Notes"];

  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
      <div className="flex gap-6 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`relative pb-2 transition ${
              active === tab
                ? "text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-indigo-600"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-4 text-gray-800">
        <span>⟳</span>
        <span>↗</span>
        <span>≡</span>
      </div>
    </div>
  );
};

export default TabHeader;
