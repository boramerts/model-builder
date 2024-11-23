import React from "react";

export default function ParameterSelector({ label, options, onSelect, value }) {
  return (
    <div className="w-full flex items-center justify-between space-x-4">
      <span className="text-gray-700 font-medium">{label}</span>
      <select
        value={value || ""}
        className="min-w-[25%] max-w-[50%] w-fit px-2 py-2 border rounded-lg bg-white text-gray-700"
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