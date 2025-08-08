// src/components/overlay/DragHandle.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface DragHandleProps {
  isVisible: boolean;
  className?: string;
}

const DragHandle: React.FC<DragHandleProps> = ({ isVisible, className }) => {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 right-0 h-8 z-50 transition-all duration-300',
        'bg-gradient-to-r from-purple-500/20 via-purple-400/30 to-purple-500/20',
        'border-b-2 border-purple-400/40',
        'shadow-lg shadow-purple-500/30',
        'flex items-center justify-center',
        'select-none cursor-move',
        'animate-pulse-glow',
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        className
      )}
      style={{
        WebkitAppRegion: 'drag'
      } as React.CSSProperties}
    >
      <div className="flex items-center space-x-2 text-purple-300 text-xs font-semibold uppercase tracking-wider">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        <span>Drag to Move</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
};

export default DragHandle;