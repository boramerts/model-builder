import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import ChevronDown from "@mui/icons-material/KeyboardArrowDownOutlined";

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Dropdown Button */}
      <MenuButton
        style={{ width: "10rem", height: "40px" }} // Equivalent to w-96
        className="flex items-center justify-between px-4 py-3 bg-white text-gray-900 text-sm font-medium rounded-lg shadow-md ring-1 ring-gray-300 hover:bg-gray-100 focus:outline-none"
      >
        <p className="text-left flex-grow">Custom</p>
        {/* <img
          src="src/assets/chevron.down.svg"
          alt="Dropdown Icon"
          style={{ width: "1rem", height: "1rem" }}
          className="ml-2"
        /> */}
        <ChevronDown></ChevronDown>
      </MenuButton>

      {/* Dropdown Menu */}
      <MenuItems className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="flex flex-col">
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Model1
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Model2
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`block w-full text-left px-4 py-2 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Model3
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
                Model4
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
