import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

interface CardProps {
  children: ReactNode;
  title?: string;
  icon?: IconType;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  footer?: ReactNode;
}

export const Card = ({
  children,
  title,
  icon,
  className = '',
  hover = false,
  onClick,
  footer,
}: CardProps) => {
  const CardComponent = onClick ? motion.div : 'div';

  return (
    <CardComponent
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl 
        shadow-sm 
        border border-gray-100 dark:border-gray-700 
        overflow-hidden 
        ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''} 
        ${className}
      `}
      whileHover={onClick ? { scale: 1.01 } : {}}
      whileTap={onClick ? { scale: 0.99 } : {}}
    >
      {(title || icon) && (
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center">
          {icon && <Icon icon={icon} className="mr-2 text-primary-500 dark:text-primary-400" aria-hidden="true" />}
          {title && <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>}
        </div>
      )}
      <div className={title && title.includes('Weekly Conversations') ? 'px-5 pt-4 pb-5 h-full' : 'p-5'}>{children}</div>
      {footer && (
        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
          {footer}
        </div>
      )}
    </CardComponent>
  );
};