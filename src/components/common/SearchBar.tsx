import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { Icon } from './Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { Button } from './Button';

interface SearchBarProps {
  onSearch: (value: string) => void;
  onFilterToggle: () => void;
  isFilterOpen: boolean;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  onSearch,
  onFilterToggle,
  isFilterOpen,
  placeholder = 'Search...',
  className = '',
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <Card className={`${className} p-0 bg-white dark:bg-gray-800 shadow-sm`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(searchValue);
        }}
        className="flex items-center p-2"
      >
        <div
          className={`relative flex-grow transition-all duration-200 ${
            isFocused
              ? 'bg-white dark:bg-gray-800 shadow-md ring-2 ring-primary-300 dark:ring-primary-700'
              : 'bg-gray-100 dark:bg-gray-800'
          } rounded-full overflow-hidden border border-transparent`}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              icon={FiSearch}
              className={`text-gray-400 ${
                isFocused ? 'text-primary-500' : ''
              }`}
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-10 py-2 border-0 bg-transparent focus:ring-0 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500"
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <AnimatePresence>
            {searchValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Clear search"
              >
                <Icon icon={FiX} className="text-gray-500" aria-hidden="true" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <Button
          variant={isFilterOpen ? 'primary' : 'ghost'}
          size="sm"
          icon={FiFilter}
          onClick={onFilterToggle}
          className="ml-2"
          aria-label={isFilterOpen ? 'Close filters' : 'Open filters'}
        >
          Filter
        </Button>
      </form>
    </Card>
  );
};