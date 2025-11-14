import { useState } from 'react';
import { Check, AlertCircle, HelpCircle } from 'lucide-react';
import type { FieldStatus } from '../types/profile';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  multiline?: boolean;
  maxLength?: number;
  error?: string;
  selectedText?: string;
  onFieldClick?: () => void;
  tooltip?: string;
}

export function FormField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  required,
  multiline,
  maxLength,
  error,
  selectedText,
  onFieldClick,
  tooltip
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  const getFieldStatus = (): FieldStatus => {
    if (error) return 'error';
    if (value) return 'filled';
    if (focused) return 'focused';
    return 'empty';
  };

  const status = getFieldStatus();

  const borderColors = {
    empty: 'border-gray-300',
    focused: 'border-blue-500 ring-2 ring-blue-100',
    filled: 'border-green-500 bg-green-50',
    error: 'border-red-500 bg-red-50'
  };

  const handleClick = () => {
    if (selectedText && onFieldClick) {
      onChange(selectedText);
      onFieldClick();
    }
  };

  const showPreview = selectedText && focused && !value;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <div className="group relative">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClick={handleClick}
            placeholder={placeholder || `Select ${label.toLowerCase()} from resume`}
            maxLength={maxLength}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg transition-all ${borderColors[status]} focus:outline-none resize-none`}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClick={handleClick}
            placeholder={placeholder || `Select ${label.toLowerCase()} from resume`}
            maxLength={maxLength}
            className={`w-full px-3 py-2 border rounded-lg transition-all ${borderColors[status]} focus:outline-none`}
          />
        )}

        {showPreview && (
          <div className="absolute inset-0 px-3 py-2 text-gray-400 pointer-events-none">
            {selectedText}
          </div>
        )}

        {status === 'filled' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Check className="h-5 w-5 text-green-600 animate-bounce-once" />
          </div>
        )}

        {status === 'error' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
        )}
      </div>

      {maxLength && multiline && (
        <div className="text-xs text-gray-500 text-right">
          {value.length}/{maxLength} characters
        </div>
      )}

      {hint && !error && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}

      {selectedText && focused && (
        <p className="text-xs text-blue-600 animate-pulse">
          Click to fill with selected text
        </p>
      )}
    </div>
  );
}
