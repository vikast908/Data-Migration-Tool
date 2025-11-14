import { useState, useRef, useEffect, ReactNode } from 'react';
import { X, Minimize2, Maximize2, GripHorizontal } from 'lucide-react';

interface FloatingPanelProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  storageKey: string;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

export function FloatingPanel({
  title,
  children,
  isOpen,
  onClose,
  storageKey,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 400, height: 600 }
}: FloatingPanelProps) {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}-position`);
    return saved ? JSON.parse(saved) : defaultPosition;
  });

  const [size, setSize] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}-size`);
    return saved ? JSON.parse(saved) : defaultSize;
  });

  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const panelRef = useRef<HTMLDivElement>(null);

  // Save position to localStorage
  useEffect(() => {
    localStorage.setItem(`${storageKey}-position`, JSON.stringify(position));
  }, [position, storageKey]);

  // Save size to localStorage
  useEffect(() => {
    localStorage.setItem(`${storageKey}-size`, JSON.stringify(size));
  }, [size, storageKey]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Keep panel within viewport bounds
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    } else if (isResizing) {
      if (!panelRef.current) return;

      const rect = panelRef.current.getBoundingClientRect();
      const newWidth = Math.max(300, e.clientX - rect.left);
      const newHeight = Math.max(200, e.clientY - rect.top);

      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="fixed bg-white rounded-lg shadow-2xl border border-gray-300 flex flex-col z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? 'auto' : `${size.width}px`,
        height: isMinimized ? 'auto' : `${size.height}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="drag-handle flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <GripHorizontal className="h-5 w-5" />
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-blue-800 rounded transition-colors"
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded transition-colors"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>

          {/* Resize Handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsResizing(true);
            }}
            style={{
              background: 'linear-gradient(135deg, transparent 50%, #cbd5e1 50%)'
            }}
          />
        </>
      )}
    </div>
  );
}
