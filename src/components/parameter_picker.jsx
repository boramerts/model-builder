import React from "react";

export default function CustomPicker({ text, onNumberChange, value }) {
    return (
        <div className="flex items-center w-full justify-between">
            <span className="text-gray-700 font-medium">{text}</span>
            <input
                type="number"
                value={value || ""}
                className="w-20 border-2 border-gray-300 rounded-md text-center"
                onChange={(e) => onNumberChange?.(e.target.value)}
                min="1"
                onWheel={(e) => e.target.blur()}
            />
        </div>
    );
}