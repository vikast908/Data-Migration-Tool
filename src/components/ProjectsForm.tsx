import { useState } from 'react';
import { Plus, X, GripVertical, Copy, Eraser } from 'lucide-react';
import { Project } from '../types/profile';
import { FormField } from './FormField';

interface ProjectsFormProps {
  projects: Partial<Project>[];
  onChange: (projects: Partial<Project>[]) => void;
  selectedText?: string;
  onTextAssigned: () => void;
  activeProjectIndex: number | null;
  onProjectClick: (index: number) => void;
}

export function ProjectsForm({
  projects,
  onChange,
  selectedText,
  onTextAssigned,
  activeProjectIndex,
  onProjectClick
}: ProjectsFormProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const addProject = () => {
    onChange([
      ...projects,
      {
        project_title: '',
        client: '',
        status: 'in_progress',
        start_date: '',
        end_date: null,
        description: '',
        display_order: projects.length
      }
    ]);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
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

    const updated = [...projects];
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

  const duplicateProject = (index: number) => {
    const projectToDuplicate = projects[index];
    const duplicated = {
      ...projectToDuplicate,
      display_order: projects.length
    };
    onChange([...projects, duplicated]);
  };

  const clearProject = (index: number) => {
    const updated = [...projects];
    updated[index] = {
      project_title: '',
      client: '',
      status: 'in_progress',
      start_date: '',
      end_date: null,
      description: '',
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
          <h2 className="text-xl font-bold text-gray-900 mb-1">Projects</h2>
          <p className="text-sm text-gray-600">Stand out by adding details about projects you have done</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-1">No projects yet</p>
          <p className="text-sm text-gray-500 mb-4">Add college projects, personal projects, or freelance work</p>
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => onProjectClick(index)}
              className={`border rounded-lg p-6 transition-all cursor-move ${
                draggedIndex === index
                  ? 'opacity-50 scale-95'
                  : dragOverIndex === index
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                  : activeProjectIndex === index
                  ? 'border-blue-500 shadow-lg bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-grab active:cursor-grabbing" title="Drag to reorder" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Project #{index + 1}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateProject(index);
                    }}
                    className="p-1 hover:bg-green-100 rounded text-green-600 transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to clear all fields in this project?')) {
                        clearProject(index);
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
                      if (confirm('Are you sure you want to remove this project?')) {
                        removeProject(index);
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
                  label="Project title"
                  value={project.project_title || ''}
                  onChange={(value) => updateProject(index, 'project_title', value)}
                  required
                  selectedText={activeProjectIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="Enter project title"
                />

                <FormField
                  label="Client"
                  value={project.client || ''}
                  onChange={(value) => updateProject(index, 'client', value)}
                  required
                  selectedText={activeProjectIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="Enter client name"
                />

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Project status
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={project.status === 'in_progress' || !project.status}
                        onChange={() => updateProject(index, 'status', 'in_progress')}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">In progress</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={project.status === 'finished'}
                        onChange={() => updateProject(index, 'status', 'finished')}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Finished</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Worked from <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={project.start_date ? project.start_date.split('-')[0] : ''}
                      onChange={(e) => {
                        const year = e.target.value;
                        const month = project.start_date ? project.start_date.split('-')[1] : '01';
                        updateProject(index, 'start_date', `${year}-${month}`);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    >
                      <option value="">Select year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={project.start_date ? project.start_date.split('-')[1] : ''}
                      onChange={(e) => {
                        const month = e.target.value;
                        const year = project.start_date ? project.start_date.split('-')[0] : currentYear.toString();
                        updateProject(index, 'start_date', `${year}-${month}`);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    >
                      <option value="">Select month</option>
                      {months.map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <FormField
                  label="Details of project"
                  value={project.description || ''}
                  onChange={(value) => updateProject(index, 'description', value)}
                  required
                  multiline
                  maxLength={1000}
                  selectedText={activeProjectIndex === index ? selectedText : undefined}
                  onFieldClick={onTextAssigned}
                  placeholder="Type here..."
                  hint="Describe what the project was about, technologies used, and your role"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
