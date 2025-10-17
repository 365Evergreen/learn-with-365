import React from 'react';
import {
  Avatar as FluentAvatar,
  makeStyles
} from '@fluentui/react-components';

export interface AvatarProps {
  name?: string;
  image?: string;
  size?: 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;
  shape?: 'circular' | 'square';
  badge?: React.ReactElement;
  className?: string;
  onClick?: () => void;
}

const useStyles = makeStyles({
  clickable: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
});

const Avatar: React.FC<AvatarProps> = ({
  name,
  image,
  size = 32,
  shape = 'circular',
  badge,
  className = '',
  onClick,
}) => {
  const styles = useStyles();
  
  const combinedClassName = [
    className,
    onClick && styles.clickable,
  ].filter(Boolean).join(' ');

  return (
    <FluentAvatar
      name={name}
      image={image ? { src: image } : undefined}
      size={size}
      shape={shape}
      badge={badge}
      className={combinedClassName}
      onClick={onClick}
    />
  );
};

export default Avatar;