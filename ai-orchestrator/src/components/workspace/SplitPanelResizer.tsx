'use client';

import React, { useCallback, useRef } from 'react';
import { cn } from '@/lib/cn';

interface SplitPanelResizerProps {
  onResize: (width: number) => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
}

export function SplitPanelResizer({ onResize, panelRef }: SplitPanelResizerProps) {
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      const handleMouseMove = (ev: MouseEvent) => {
        if (!isDragging.current || !panelRef.current) return;
        const rect = panelRef.current.getBoundingClientRect();
        const newWidth = ev.clientX - rect.left;
        onResize(newWidth);
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [onResize, panelRef]
  );

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        'w-1 cursor-col-resize flex-shrink-0 relative group',
        'bg-sand-200 hover:bg-primary-300 active:bg-primary-400 transition-colors'
      )}
    >
      <div className="absolute inset-y-0 -left-1 -right-1" />
    </div>
  );
}
