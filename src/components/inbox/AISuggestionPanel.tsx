import React, { useState } from 'react';
import { FiChevronRight, FiRotateCcw, FiThumbsUp, FiThumbsDown, FiCopy, FiCheck } from 'react-icons/fi';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';

interface Suggestion {
  id: string;
  content: string;
  type: 'simple' | 'detailed' | 'question';
}

interface AISuggestionPanelProps {
  isLoading?: boolean;
  suggestions: Suggestion[];
  onSuggestionSelect: (suggestion: Suggestion) => void;
  onRegenerateSuggestions: () => void;
  className?: string;
}

export const AISuggestionPanel = ({
  isLoading = false,
  suggestions,
  onSuggestionSelect,
  onRegenerateSuggestions,
  className = '',
}: AISuggestionPanelProps) => {
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'positive' | 'negative' | null>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const handleSuggestionClick = (suggestion: Suggestion) => {
    onSuggestionSelect(suggestion);
  };

  const handleFeedback = (suggestionId: string, type: 'positive' | 'negative') => {
    setFeedbackGiven(prev => ({
      ...prev,
      [suggestionId]: type,
    }));
  };

  const handleCopy = (suggestion: Suggestion) => {
    navigator.clipboard.writeText(suggestion.content);
    setCopiedId(suggestion.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`${className}`}>
      <Card title="AI-Suggested Responses" className="h-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Based on conversation context
          </span>
          <Button
            variant="ghost"
            size="sm"
            icon={FiRotateCcw}
            onClick={onRegenerateSuggestions}
            isLoading={isLoading}
            className="text-xs"
          >
            Regenerate
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-primary-600 rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Generating suggestions...</p>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              No suggestions available for this conversation yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="group bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
              >
                <p className="mb-2 text-sm text-gray-900 dark:text-gray-100">
                  {suggestion.content}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                      {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(suggestion)}
                      className="text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon 
                        icon={copiedId === suggestion.id ? FiCheck : FiCopy} 
                        className={copiedId === suggestion.id ? "text-green-500" : ""} 
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={FiThumbsUp}
                      onClick={() => handleFeedback(suggestion.id, 'positive')}
                      className={`text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                        feedbackGiven[suggestion.id] === 'positive' ? 'text-green-500' : ''
                      }`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={FiThumbsDown}
                      onClick={() => handleFeedback(suggestion.id, 'negative')}
                      className={`text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                        feedbackGiven[suggestion.id] === 'negative' ? 'text-red-500' : ''
                      }`}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs px-2"
                    >
                      Use
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};