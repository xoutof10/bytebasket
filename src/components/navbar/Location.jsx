import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

function Location({ location, toggleDropdown, openDropdown, getLocation }) {
  return (
    <div className="flex items-center gap-4 sm:gap-10">
      <button
        type="button"
        onClick={toggleDropdown}
        className="hidden sm:flex gap-2 items-center text-gray-700 group rounded-md px-2 py-1 hover:bg-red-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 transition"
        aria-haspopup="menu"
        aria-expanded={openDropdown}
      >
        <MapPin className="text-red-600 h-5 w-5" />

        <div className="font-semibold text-left">
          {location ? (
            <div className="-space-y-2">
              <p>{location.county}</p>
              <p className="text-gray-500 text-sm">{location.state}</p>
            </div>
          ) : (
            "Add Address"
          )}
        </div>

        <FaCaretDown
          className={`transition-transform duration-200 ${
            openDropdown ? "rotate-180 text-red-600" : "text-gray-500"
          }`}
        />
      </button>

      {openDropdown && (
        <div className="w-[260px] shadow-2xl z-50 bg-white fixed top-16 left-6 sm:left-60 border border-neutral-200 rounded-lg p-4 ring-1 ring-red-500/10">
          <h1 className="font-semibold mb-3 text-lg flex items-center justify-between">
            Change Location
            <button
              type="button"
              onClick={toggleDropdown}
              className="ml-3 h-5 w-5 rounded hover:bg-neutral-100 grid place-items-center"
              aria-label="Close"
            >
              ×
            </button>
          </h1>

          <button
            onClick={getLocation}
            className="bg-red-600 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-500 active:bg-red-700 transition w-full text-sm font-medium shadow-[0_8px_20px_-8px_rgba(239,68,68,0.5)]"
          >
            Detect my location
          </button>
        </div>
      )}
    </div>
  );
}

export default Location;
