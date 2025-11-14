import { useState } from 'react';
import { Plus, X, GripVertical, Eraser } from 'lucide-react';
import { Education } from '../types/profile';
import { FormField } from './FormField';

interface EducationFormProps {
  education: Partial<Education>[];
  onChange: (education: Partial<Education>[]) => void;
  selectedText?: string;
  onTextAssigned: () => void;
  activeEducationIndex: number | null;
  onEducationClick: (index: number) => void;
}

export function EducationForm({
  education,
  onChange,
  selectedText,
  onTextAssigned,
  activeEducationIndex,
  onEducationClick
}: EducationFormProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const addEducation = () => {
    onChange([
      ...education,
      {
        degree: '',
        institution: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        display_order: education.length
      }
    ]);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
    if (selectedText && typeof value === 'string') {
      onTextAssigned();
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...education];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, draggedItem);

    onChange(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const clearEducation = (index: number) => {
    const updated = [...education];
    updated[index] = {
      degree: '',
      institution: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      display_order: index
    };
    onChange(updated);
  };

  // Generate year options (current year + 20 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - i);

  // Month options
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Education</h2>
          <p className="text-sm text-gray-600">Add your educational qualifications</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-1">No education yet</p>
          <p className="text-sm text-gray-500 mb-4">Add your degrees, certifications, and courses</p>
          <button
            onClick={addEducation}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => onEducationClick(index)}
              className={`border rounded-lg p-6 transition-all cursor-move ${
                draggedIndex === index
                  ? 'opacity-50 scale-95'
                  : dragOverIndex === index
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                  : activeEducationIndex === index
                  ? 'border-blue-500 shadow-lg bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-grab active:cursor-grabbing" title="Drag to reorder" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Education #{index + 1}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to clear all fields in this education entry?')) {
                        clearEducation(index);
                      }
                    }}
                    className="p-1 hover:bg-orange-100 rounded text-orange-600 transition-colors"
                    title="Clear"
                  >
                    <Eraser className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to remove this education entry?')) {
                        removeEducation(index);
                      }
                    }}
                    className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                    title="Remove"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  label="Degree/Certification"
                  value={edu.degree || ''}
                  onChange={(value) => updateEducation(index, 'degree', value)}
                  required
                  selectedText={activeEducationIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="e.g., Bachelor of Science, MBA, AWS Certified"
                />

                <FormField
                  label="Institution/University"
                  value={edu.institution || ''}
                  onChange={(value) => updateEducation(index, 'institution', value)}
                  required
                  selectedText={activeEducationIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="e.g., Stanford University, Coursera"
                />

                <FormField
                  label="Field of Study"
                  value={edu.field_of_study || ''}
                  onChange={(value) => updateEducation(index, 'field_of_study', value)}
                  selectedText={activeEducationIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="e.g., Computer Science, Business Administration"
                />

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Duration
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Start Year</label>
                      <select
                        value={edu.start_date ? edu.start_date.split('-')[0] : ''}
                        onChange={(e) => {
                          const year = e.target.value;
                          const month = edu.start_date ? edu.start_date.split('-')[1] : '01';
                          updateEducation(index, 'start_date', `${year}-${month}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      >
                        <option value="">Select year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">End Year (or expected)</label>
                      <select
                        value={edu.end_date ? edu.end_date.split('-')[0] : ''}
                        onChange={(e) => {
                          const year = e.target.value;
                          const month = edu.end_date ? edu.end_date.split('-')[1] : '01';
                          updateEducation(index, 'end_date', `${year}-${month}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                      >
                        <option value="">Select year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
