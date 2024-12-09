import React from "react";

export default function CustomPicker({ text, onNumberChange, value, isDarkMode }) {
    return (
        <div className="flex items-center w-full justify-between">
            <span className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-700'
            }`}>
                {text}
            </span>
            <div className="flex items-center">
                <button
                    className={`h-[38px] px-2 rounded-l-md border-2 ${
                        isDarkMode 
                            ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                    onClick={() => onNumberChange(Math.max(1, Number(value) - 1))}
                >
                    -
                </button>
                <input
                    type="number"
                    value={value || ""}
                    className={`w-14 border-y-2 text-center px-2 py-1 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        isDarkMode 
                            ? 'bg-gray-800 text-white border-gray-600' 
                            : 'bg-white text-gray-700 border-gray-300'
                    }`}
                    onChange={(e) => onNumberChange?.(e.target.value)}
                    min="1"
                    onWheel={(e) => e.target.blur()}
                />
                <button
                    className={`h-[38px] px-2 rounded-r-md border-2 ${
                        isDarkMode 
                            ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                    onClick={() => onNumberChange(Number(value) + 1)}
                >
                    +
                </button>
            </div>
        </div>
    );
}