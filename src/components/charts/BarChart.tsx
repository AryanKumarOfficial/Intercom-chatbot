import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type DataItem = {
  name: string;
  value: number;
  [key: string]: any;
};

type BarChartProps = {
  data: number[] | DataItem[];
  maxValue?: number;
  height?: number;
  color?: string;
  barWidth?: number;
  barGap?: number;
  className?: string;
  darkMode?: boolean;
  showValues?: boolean;
  labels?: string[];
};

export const BarChart = ({
  data,
  maxValue,
  height = 220,
  color = '#2563eb', // Use a professional blue accent
  barWidth = 32,
  barGap = 24,
  className = '',
  darkMode = true,
  showValues = true,
  labels = [],
}: BarChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ idx: number; top: number; left: number } | null>(null);
  const [containerHeight, setContainerHeight] = useState(height);

  useEffect(() => {
    if (!containerRef.current) return;
    setContainerHeight(containerRef.current.clientHeight);
  }, []);

  // Process the data to handle both array of numbers and array of objects
  const processedData = data.map(item => typeof item === 'number' ? item : item.value);
  const processedLabels = data.map((item, idx) => 
    typeof item === 'object' && 'name' in item ? item.name : labels[idx] || `Day ${idx + 1}`
  );

  const calculatedMax = maxValue || Math.max(...processedData, 1) * 1.1;

  const chartStyles = {
    container: `relative w-full h-full flex flex-col justify-end items-stretch ${className}`,
    barRow: 'flex flex-row items-end justify-between w-full h-full',
    bar: 'flex flex-col items-center justify-end',
    labelText: darkMode ? 'mt-3 text-xs font-medium text-gray-300' : 'mt-3 text-xs font-medium text-gray-700',
    tooltip: 'absolute z-50 px-2 py-1 rounded shadow-lg text-xs font-semibold bg-gray-900 text-white pointer-events-none',
  };

  return (
    <div ref={containerRef} className={chartStyles.container} style={{ height }}>
      <div className={chartStyles.barRow} style={{ height: '100%', zIndex: 1 }}>
        {processedData.map((value, idx) => {
          const barHeight = Math.max((value / calculatedMax) * height, 12);
          return (
            <div key={idx} className={chartStyles.bar} style={{ width: barWidth, position: 'relative' }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: barHeight }}
                transition={{ duration: 0.7, delay: idx * 0.07, ease: 'easeOut' }}
                style={{
                  width: barWidth,
                  height: barHeight,
                  background: `linear-gradient(180deg, ${color} 0%, ${darkMode ? '#1e293b' : '#e5e7eb'} 100%)`,
                  borderRadius: '8px 8px 4px 4px',
                  boxShadow: darkMode
                    ? `0 2px 8px 0 #0002`
                    : `0 2px 8px 0 #0001`,
                  border: `1.5px solid ${color}`,
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  transition: 'height 0.5s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
                  backgroundClip: 'padding-box',
                }}
                onMouseEnter={e => {
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setTooltip({ idx, top: rect.top, left: rect.left + barWidth / 2 });
                }}
                onMouseLeave={() => setTooltip(null)}
                whileHover={{ scale: 1.04, boxShadow: `0 0 16px 2px ${color}33` }}
              />
              <div className={chartStyles.labelText} style={{ width: barWidth, textAlign: 'center' }}>
                {processedLabels[idx]}
              </div>
              {/* Tooltip */}
              {tooltip && tooltip.idx === idx && (
                <div
                  className={chartStyles.tooltip}
                  style={{
                    left: '50%',
                    top: -32,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {value}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};