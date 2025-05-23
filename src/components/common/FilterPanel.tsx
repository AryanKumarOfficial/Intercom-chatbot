import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import { Button } from './Button';
import * as Switch from '@radix-ui/react-switch';
import * as Tabs from '@radix-ui/react-tabs';

type FilterOption = {
  id: string;
  label: string;
};

interface FilterPanelProps {
  statusOptions: FilterOption[];
  agentOptions: FilterOption[];
  aiOptions: FilterOption[];
  selectedStatus: string[];
  selectedAgents: string[];
  selectedAI: string[];
  isAIEnabled: boolean;
  onStatusChange: (status: string[]) => void;
  onAgentChange: (agents: string[]) => void;
  onAIChange: (ai: string[]) => void;
  onAIToggle: (enabled: boolean) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  className?: string;
}

export const FilterPanel = ({
  statusOptions,
  agentOptions,
  aiOptions,
  selectedStatus,
  selectedAgents,
  selectedAI,
  isAIEnabled,
  onStatusChange,
  onAgentChange,
  onAIChange,
  onAIToggle,
  onApplyFilters,
  onClearFilters,
  className = '',
}: FilterPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className={`overflow-hidden ${className}`}
    >
      <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm border-t-0 rounded-t-none">
        <Tabs.Root defaultValue="status" className="flex flex-col">
          <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-4" aria-label="Filter categories">
            <Tabs.Trigger
              value="status"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
            >
              Status
            </Tabs.Trigger>
            <Tabs.Trigger
              value="agents"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
            >
              Agents
            </Tabs.Trigger>
            <Tabs.Trigger
              value="ai"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
            >
              AI Suggestions
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="status" className="p-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {statusOptions.map((option) => (
                <label
                  key={option.id}
                  className={`
                    flex items-center p-2 rounded-md cursor-pointer
                    ${selectedStatus.includes(option.id) 
                      ? 'bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-400' 
                      : 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-2"
                    checked={selectedStatus.includes(option.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onStatusChange([...selectedStatus, option.id]);
                      } else {
                        onStatusChange(selectedStatus.filter(id => id !== option.id));
                      }
                    }}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="agents" className="p-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {agentOptions.map((option) => (
                <label
                  key={option.id}
                  className={`
                    flex items-center p-2 rounded-md cursor-pointer
                    ${selectedAgents.includes(option.id) 
                      ? 'bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-400' 
                      : 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-2"
                    checked={selectedAgents.includes(option.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onAgentChange([...selectedAgents, option.id]);
                      } else {
                        onAgentChange(selectedAgents.filter(id => id !== option.id));
                      }
                    }}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="ai" className="p-2">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable AI suggestions</span>
              <Switch.Root
                checked={isAIEnabled}
                onCheckedChange={onAIToggle}
                className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-primary-600 outline-none"
              >
                <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            {isAIEnabled && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {aiOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`
                      flex items-center p-2 rounded-md cursor-pointer
                      ${selectedAI.includes(option.id) 
                        ? 'bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-400' 
                        : 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-2"
                      checked={selectedAI.includes(option.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAIChange([...selectedAI, option.id]);
                        } else {
                          onAIChange(selectedAI.filter(id => id !== option.id));
                        }
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </Tabs.Content>
        </Tabs.Root>

        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" onClick={onClearFilters} size="sm">
            Clear All
          </Button>
          <Button variant="primary" onClick={onApplyFilters} size="sm">
            Apply Filters
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};