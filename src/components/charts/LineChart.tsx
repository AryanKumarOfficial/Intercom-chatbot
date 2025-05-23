import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type DataPoint = {
  x: number | string;
  y: number;
};

type LineChartProps = {
  data: DataPoint[];
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  className?: string;
  title?: string;
  showPercentage?: boolean;
};

export const LineChart = ({
  data,
  height = 150,
  strokeWidth = 2,
  strokeColor = '#0ea5e9',
  fillColor = '#0ea5e9',
  className = '',
  title = 'User Activity',
  showPercentage = true,
}: LineChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Update width when container resizes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    
    // Set initial width
    updateWidth();
    
    // Add resize listener
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  // Process data to handle string x-values
  const processedData = data.map((point, index) => ({
    x: typeof point.x === 'number' ? point.x : index,
    y: point.y
  }));

  // Find min/max values to normalize data
  const minX = Math.min(...processedData.map(point => point.x as number));
  const maxX = Math.max(...processedData.map(point => point.x as number));
  const minY = Math.min(...processedData.map(point => point.y));
  const maxY = Math.max(...processedData.map(point => point.y));
  
  // Normalize data points to fit within SVG viewport
  const normalizedData = processedData.map(point => ({
    x: ((point.x as number - minX) / (maxX - minX || 1)) * containerWidth,
    y: height - ((point.y - minY) / (maxY - minY || 1)) * height,
  }));
  
  // Create path data for the line
  const linePath = normalizedData.length > 0 
    ? normalizedData
        .map((point, index) => (index === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`))
        .join(' ')
    : '';
  
  // Create path data for the area under the line
  const areaPath = normalizedData.length > 0
    ? `${linePath} L ${normalizedData[normalizedData.length - 1].x},${height} L ${normalizedData[0].x},${height} Z`
    : '';

  // For percentage display, get the last data point's y value
  const latestValue = data[data.length - 1]?.y || 0;
  
  return (
    <div className={`${className} w-full`} ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        {showPercentage && (
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
            {typeof latestValue === 'number' ? latestValue : '0'}
            {title.toLowerCase().includes('percentage') ? '%' : ''}
          </span>
        )}
      </div>
      
      {containerWidth > 0 && (
        <svg width="100%" height={height} className="overflow-visible">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={linePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            d={areaPath}
            fill="url(#gradient)"
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fillColor} stopOpacity="0.5" />
              <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
      
      {/* X-axis labels for string-based x values */}
      {data[0] && typeof data[0].x === 'string' && (
        <div className="flex justify-between mt-2">
          {data.map((point, index) => (
            <div key={index} className="text-xs text-gray-500 dark:text-gray-400" style={{ width: `${100 / data.length}%`, textAlign: 'center' }}>
              {point.x}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};