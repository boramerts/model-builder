import React from "react";

export default function LayerPicker({ label, options, onSelect, value, onDelete }) {
  return (
    <div className="w-full flex flex-col items-start space-y-1 group">
      <div className="w-full flex justify-between items-center">
        <span className="text-white font-medium flex-grow">{label}</span>
        <button 
          onClick={onDelete}
          className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white text-sm opacity-20 group-hover:opacity-100 transition-opacity duration-300"
        >
          X
        </button>
      </div>
      <select
        value={value || ""}
        className="min-w-[25%] max-w-[75%] w-fit px-2 py-2 border rounded-lg bg-white text-gray-700 flex-grow-0"
        onChange={(e) => onSelect?.(e.target.value)}
      >
        <option value="" disabled>Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
