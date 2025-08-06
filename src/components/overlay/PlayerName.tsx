import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

interface PlayerNameProps {
  name: string;
  isActive: boolean;
  className?: string;
}

const PlayerName: React.FC<PlayerNameProps> = ({ name, isActive, className }) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    setShouldScroll(name.length > 12);
  }, [name]);

  return (
    <div
      className={cn(
        'font-semibold transition-colors duration-200',
        isActive ? 'text-primary-300' : 'text-gray-300',
        shouldScroll ? 'scrolling-text' : '',
        className
      )}
    >
      <div className={shouldScroll ? 'scrolling-text active' : ''}>
        {name}
      </div>
    </div>
  );
};

export default PlayerName;