"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Define the shape of our dropdown options
export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode; // Optional icon prop (e.g., Lucide icon)
  className?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  icon,
  className = ""
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the currently selected option's label to display it
  const selectedOption = options.find(opt => opt.value === value);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* The Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
                    w-full flex items-center justify-between gap-3 
                    bg-gray-50 dark:bg-gray-900 border 
                    ${isOpen ? 'border-[#573CFF] ring-2 ring-[#573CFF]/20' : 'border-gray-200 dark:border-gray-700'} 
                    rounded-xl px-4 py-2.5 text-sm 
                    transition-all duration-200 focus:outline-none
                `}
      >
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          {/* Render the icon if passed */}
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#573CFF]' : ''}`}
        />
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="max-h-60 overflow-y-auto hide-scrollbar">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                                        w-full text-left px-4 py-2.5 text-sm transition-colors duration-150
                                        ${value === option.value
                      ? 'bg-[#573CFF]/10 text-[#573CFF] font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }
                                    `}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}