import { X, Plus, Eraser } from 'lucide-react';
import { Skill } from '../types/profile';
import { useState } from 'react';

interface SkillsFormProps {
  skills: Partial<Skill>[];
  onChange: (skills: Partial<Skill>[]) => void;
  selectedText?: string;
  onTextAssigned: () => void;
}

export function SkillsForm({ skills, onChange, selectedText, onTextAssigned }: SkillsFormProps) {
  const [inputValue, setInputValue] = useState('');

  const addSkills = (text: string) => {
    const skillNames = text
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const newSkills = skillNames.map((name, index) => ({
      skill_name: name,
      display_order: skills.length + index
    }));

    onChange([...skills, ...newSkills]);
    setInputValue('');
    onTextAssigned();
  };

  const handleAddFromInput = () => {
    if (inputValue.trim()) {
      addSkills(inputValue);
    }
  };

  const handleAddFromSelection = () => {
    if (selectedText) {
      addSkills(selectedText);
    }
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    onChange([]);
    setInputValue('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Skills</h2>
          <p className="text-sm text-gray-600">Add your professional skills</p>
        </div>
        {skills.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all skills?')) {
                clearAll();
              }
            }}
            className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-sm font-medium"
            title="Clear All Skills"
          >
            <Eraser className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Add Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddFromInput()}
              placeholder="Type skills separated by commas or select from resume"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
            <button
              onClick={handleAddFromInput}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Tip: Select multiple skills at once (comma or line-separated)
          </p>
        </div>

        {selectedText && (
          <button
            onClick={handleAddFromSelection}
            className="w-full px-4 py-3 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            Add selected text as skills: "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"
          </button>
        )}
      </div>

      {skills.length > 0 ? (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Your Skills ({skills.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium group hover:bg-blue-200 transition-colors"
              >
                <span>{skill.skill_name}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="hover:bg-blue-300 rounded-full p-0.5 transition-colors"
                  title="Remove skill"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-1">No skills added yet</p>
          <p className="text-sm text-gray-500">Select from your resume or type them manually</p>
        </div>
      )}

      {skills.length > 0 && skills.length < 8 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <strong>Tip:</strong> Add 8-15 skills for best visibility on your profile
          </p>
        </div>
      )}
    </div>
  );
}
