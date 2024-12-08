import React from "react";

export default function ParameterSelector({ label, options, onSelect, value, isDarkMode }) {
  return (
    <div className="w-full flex items-center justify-between space-x-4">
      <span className={`${isDarkMode ? 'text-white' : 'text-gray-700'} font-medium`}>
        {label}
      </span>
      <select
        value={value || ""}
        className={`min-w-[25%] max-w-[50%] w-fit px-2 py-2 border rounded-lg ${
          isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
        }`}
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