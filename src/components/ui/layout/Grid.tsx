import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';

export interface GridProps {
  children: React.ReactNode;
  columns?: number | 'auto-fit' | 'auto-fill';
  gap?: 'none' | 'small' | 'medium' | 'large';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

export interface GridItemProps {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}

const useStyles = makeStyles({
  grid: {
    display: 'grid',
  },
  gapNone: {
    gap: '0',
  },
  gapSmall: {
    gap: tokens.spacingHorizontalS,
  },
  gapMedium: {
    gap: tokens.spacingHorizontalM,
  },
  gapLarge: {
    gap: tokens.spacingHorizontalL,
  },
  alignStart: {
    alignItems: 'start',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'end',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  justifyStart: {
    justifyItems: 'start',
  },
  justifyCenter: {
    justifyItems: 'center',
  },
  justifyEnd: {
    justifyItems: 'end',
  },
  justifyStretch: {
    justifyItems: 'stretch',
  },
  gridItem: {
    display: 'block',
  },
});

const Grid: React.FC<GridProps> & {
  Item: React.FC<GridItemProps>;
} = ({
  children,
  columns = 'auto-fit',
  gap = 'medium',
  alignItems = 'stretch',
  justifyItems = 'stretch',
  className = '',
}) => {
  const styles = useStyles();
  
  const gridTemplateColumns = 
    typeof columns === 'number' 
      ? `repeat(${columns}, 1fr)`
      : `repeat(${columns}, minmax(250px, 1fr))`;
  
  const gapClass = {
    none: styles.gapNone,
    small: styles.gapSmall,
    medium: styles.gapMedium,
    large: styles.gapLarge,
  }[gap];
  
  const alignClass = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    stretch: styles.alignStretch,
  }[alignItems];
  
  const justifyClass = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    stretch: styles.justifyStretch,
  }[justifyItems];
  
  const combinedClassName = [
    styles.grid,
    gapClass,
    alignClass,
    justifyClass,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={combinedClassName}
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
};

const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  className = '',
}) => {
  const styles = useStyles();
  
  const style = {
    gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
    gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
  };
  
  return (
    <div 
      className={`${styles.gridItem} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

Grid.Item = GridItem;

export default Grid;
export { GridItem };