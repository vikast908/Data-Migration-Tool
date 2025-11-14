import { Eraser } from 'lucide-react';
import { BasicInfo } from '../types/profile';
import { FormField } from './FormField';

interface BasicInfoFormProps {
  data: Partial<BasicInfo>;
  onChange: (data: Partial<BasicInfo>) => void;
  selectedText?: string;
  onTextAssigned: () => void;
}

export function BasicInfoForm({ data, onChange, selectedText, onTextAssigned }: BasicInfoFormProps) {
  const updateField = (field: keyof BasicInfo, value: string) => {
    onChange({ ...data, [field]: value });
    if (selectedText) {
      onTextAssigned();
    }
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const clearAll = () => {
    onChange({
      full_name: '',
      email: '',
      phone: '',
      location: '',
      headline: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Basic Information</h2>
          <p className="text-sm text-gray-600">Select text from your resume and click the field to fill it</p>
        </div>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear all basic information fields?')) {
              clearAll();
            }
          }}
          className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-sm font-medium"
          title="Clear All Fields"
        >
          <Eraser className="h-4 w-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <FormField
          label="Full Name"
          value={data.full_name || ''}
          onChange={(value) => updateField('full_name', value)}
          required
          selectedText={selectedText}
          onFieldClick={onTextAssigned}
          tooltip="Your full name as you'd like it to appear professionally"
        />

        <FormField
          label="Email"
          value={data.email || ''}
          onChange={(value) => updateField('email', value)}
          required
          selectedText={selectedText}
          onFieldClick={onTextAssigned}
          tooltip="Professional email address for contact"
          error={data.email ? validateEmail(data.email) : undefined}
        />

        <FormField
          label="Phone"
          value={data.phone || ''}
          onChange={(value) => updateField('phone', value)}
          required
          selectedText={selectedText}
          onFieldClick={onTextAssigned}
          tooltip="Contact phone number"
        />

        <FormField
          label="Location"
          value={data.location || ''}
          onChange={(value) => updateField('location', value)}
          selectedText={selectedText}
          onFieldClick={onTextAssigned}
          placeholder="City, State/Country"
          tooltip="Your current location or preferred work location"
        />

        <FormField
          label="Professional Headline"
          value={data.headline || ''}
          onChange={(value) => updateField('headline', value)}
          selectedText={selectedText}
          onFieldClick={onTextAssigned}
          placeholder="e.g., Senior Product Manager | 5+ years experience"
          hint="Optional: A brief headline that describes your professional identity"
        />
      </div>
    </div>
  );
}
