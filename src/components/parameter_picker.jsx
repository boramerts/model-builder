import React from "react";

export default function CustomPicker({ text, onNumberChange }) {
    return (
        <div className="flex items-center w-full justify-between">
            <span>{text}</span>
            <input
                type="number"
                className="w-12 border-2 border-gray-300 rounded-md text-center"
                onChange={(e) => onNumberChange?.(e.target.value)}
            />
        </div>
    );
}