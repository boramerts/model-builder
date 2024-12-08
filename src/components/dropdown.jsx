import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ChevronDown from "@mui/icons-material/KeyboardArrowDownOutlined";

export default function Dropdown({ options, value, onChange, isDarkMode }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        style={{ width: "10rem", height: "40px" }}
        className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg shadow-md ${
          isDarkMode 
            ? 'bg-gray-800 text-white ring-1 ring-gray-600 hover:bg-gray-700' 
            : 'bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-100'
        } focus:outline-none`}
      >
        <p className="text-left flex-grow">{value}</p>
        <ChevronDown className={isDarkMode ? 'text-white' : 'text-gray-700'} />
      </MenuButton>

      <MenuItems 
        className={`absolute right-0 mt-2 w-96 shadow-lg rounded-lg ring-1 focus:outline-none ${
          isDarkMode 
            ? 'bg-gray-800 ring-gray-600' 
            : 'bg-white ring-black ring-opacity-5'
        }`}
      >
        <div className="flex flex-col">
          {options.map((option) => (
            <MenuItem key={option}>
              {({ active }) => (
                <button
                  type="button"
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode
                      ? active ? 'bg-gray-700 text-white' : 'text-gray-300'
                      : active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                  onClick={() => onChange(option)}
                >
                  {option}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
