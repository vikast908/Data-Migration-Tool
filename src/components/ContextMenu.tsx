import { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface ContextMenuOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  options: ContextMenuOption[];
  onSelect: (value: string) => void;
  onClose: () => void;
}

export function ContextMenu({ x, y, options, onSelect, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position to keep menu in viewport
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const adjustedX = x + rect.width > window.innerWidth ? window.innerWidth - rect.width - 10 : x;
      const adjustedY = y + rect.height > window.innerHeight ? window.innerHeight - rect.height - 10 : y;

      menuRef.current.style.left = `${adjustedX}px`;
      menuRef.current.style.top = `${adjustedY}px`;
    }
  }, [x, y]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100] min-w-[200px]"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
          <Send className="h-3 w-3" />
          <span>Send to field</span>
        </div>
      </div>
      <div className="max-h-[300px] overflow-auto">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              if (!option.disabled) {
                onSelect(option.value);
                onClose();
              }
            }}
            disabled={option.disabled}
            className={`w-full px-4 py-2 text-left text-sm transition-colors ${
              option.disabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
