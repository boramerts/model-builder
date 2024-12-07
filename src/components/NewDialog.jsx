import React from "react";

export default function NewDialog({ onClose, onNew }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Creating a New Model</h2>
        <div className="space-y-2">
          <p className="text-gray-500">
            {" "}
            You're about to create a new model. Are you sure you want to
            continue?
          </p>
        </div>
        <button
          onClick={onNew}
          className="mt-4 w-full py-2 border-2 border-red-300 rounded-xl hover:bg-red-100"
        >
          <p className="text-red-500">Continue</p>
        </button>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
