import { Plus, X, ArrowUp, ArrowDown, Copy, Eraser } from 'lucide-react';
import { WorkExperience } from '../types/profile';
import { FormField } from './FormField';

interface WorkExperienceFormProps {
  experiences: Partial<WorkExperience>[];
  onChange: (experiences: Partial<WorkExperience>[]) => void;
  selectedText?: string;
  onTextAssigned: () => void;
  activeExperienceIndex: number | null;
  onExperienceClick: (index: number) => void;
}

export function WorkExperienceForm({
  experiences,
  onChange,
  selectedText,
  onTextAssigned,
  activeExperienceIndex,
  onExperienceClick
}: WorkExperienceFormProps) {
  const addExperience = () => {
    onChange([
      ...experiences,
      {
        job_title: '',
        company_name: '',
        start_date: '',
        end_date: null,
        is_current: false,
        description: '',
        display_order: experiences.length
      }
    ]);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
    if (selectedText && typeof value === 'string') {
      onTextAssigned();
    }
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= experiences.length) return;

    const updated = [...experiences];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  const duplicateExperience = (index: number) => {
    const expToDuplicate = experiences[index];
    const duplicated = {
      ...expToDuplicate,
      display_order: experiences.length
    };
    onChange([...experiences, duplicated]);
  };

  const clearExperience = (index: number) => {
    const updated = [...experiences];
    updated[index] = {
      job_title: '',
      company_name: '',
      start_date: '',
      end_date: null,
      is_current: false,
      description: '',
      display_order: index
    };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Work Experience</h2>
          <p className="text-sm text-gray-600">Add your work experience and internships</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-1">No work experience yet</p>
          <p className="text-sm text-gray-500 mb-4">Add your professional work experience and internships</p>
          <button
            onClick={addExperience}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              onClick={() => onExperienceClick(index)}
              className={`border rounded-lg p-6 transition-all ${
                activeExperienceIndex === index
                  ? 'border-blue-500 shadow-lg bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience #{index + 1}
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveExperience(index, 'up');
                    }}
                    disabled={index === 0}
                    className="p-1 hover:bg-blue-100 rounded text-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    title="Move Up"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveExperience(index, 'down');
                    }}
                    disabled={index === experiences.length - 1}
                    className="p-1 hover:bg-blue-100 rounded text-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    title="Move Down"
                  >
                    <ArrowDown className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateExperience(index);
                    }}
                    className="p-1 hover:bg-green-100 rounded text-green-600 transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to clear all fields in this experience?')) {
                        clearExperience(index);
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
                      if (confirm('Are you sure you want to remove this experience?')) {
                        removeExperience(index);
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
                  label="Job Title"
                  value={exp.job_title || ''}
                  onChange={(value) => updateExperience(index, 'job_title', value)}
                  required
                  selectedText={activeExperienceIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="e.g., Senior Product Manager, Software Engineer"
                />

                <FormField
                  label="Company Name"
                  value={exp.company_name || ''}
                  onChange={(value) => updateExperience(index, 'company_name', value)}
                  required
                  selectedText={activeExperienceIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="e.g., Tech Corp, StartupXYZ"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={exp.start_date || ''}
                      onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      End Date {!exp.is_current && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="month"
                      value={exp.end_date || ''}
                      onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                      disabled={exp.is_current}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.is_current || false}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[index] = {
                        ...updated[index],
                        is_current: e.target.checked,
                        end_date: e.target.checked ? '' : updated[index].end_date || ''
                      };
                      onChange(updated);
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">I currently work here</span>
                </label>

                <FormField
                  label="Description"
                  value={exp.description || ''}
                  onChange={(value) => updateExperience(index, 'description', value)}
                  multiline
                  maxLength={2000}
                  selectedText={activeExperienceIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="Describe your key responsibilities and achievements"
                  hint="Highlight key achievements, responsibilities, and impact (2-3 sentences work best)"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
