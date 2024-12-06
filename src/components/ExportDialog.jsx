import React from 'react';

export default function ExportDialog({ onClose, onExport }) {
  const formats = [
    { id: 'svg', label: 'SVG Vector Image (.svg)' },
    { id: 'png', label: 'PNG Image (.png)' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Export As</h2>
        <div className="space-y-2">
          {formats.map(format => (
            <button
              key={format.id}
              onClick={() => onExport(format.id)}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {format.label}
            </button>
          ))}
        </div>
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