import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Dropdown Button */}
      <MenuButton
        style={{ width: "20rem", height: "40px" }} // Equivalent to w-96
        className="inline-flex items-start justify-between px-4 py-3 bg-white text-gray-900 text-sm font-medium rounded-lg shadow-md ring-1 ring-gray-300 hover:bg-gray-100 focus:outline-none"
      >
        <p className="text-left">Options</p>
        <img
          src="src/assets/chevron.down.svg"
          alt="Dropdown Icon"
          style={{width: "1rem", height: "1rem"}}
          className=""
        />
      </MenuButton>

      {/* Dropdown Menu */}
      <MenuItems className="absolute right-0 mt-2 !w-96 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem>
          {({ active }) => (
            <a
              href="#"
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Account settings
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <a
              href="#"
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Support
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <a
              href="#"
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              License
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              type="button"
              className={`block w-full text-left px-4 py-2 text-sm ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Sign out
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
