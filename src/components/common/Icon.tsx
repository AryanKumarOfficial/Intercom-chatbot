import { IconBaseProps, IconType } from 'react-icons';
import { cloneElement } from 'react';

interface IconProps extends IconBaseProps {
  icon: IconType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon = ({ icon, size = 'md', color, ...rest }: IconProps) => {
  const IconComponent = icon;
  const iconSize = typeof size === 'string' ? sizeMap[size] : size;

  return <IconComponent size={iconSize} color={color} {...rest} />;
};