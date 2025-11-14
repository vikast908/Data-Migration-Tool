import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface ResumeUploadProps {
  onUploadComplete: (file: File) => void;
}

export function ResumeUpload({ onUploadComplete }: ResumeUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOC file');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleContinue = () => {
    if (selectedFile) {
      onUploadComplete(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Your Professional Profile</h1>
        <p className="text-gray-600 mb-8">Upload your resume and we'll help you create a compelling profile in minutes</p>

        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Drop your resume here</h3>
            <p className="text-sm text-gray-500 mb-4">or click to browse</p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Upload Resume
            </label>
            <p className="text-xs text-gray-400 mt-4">Supports PDF, DOC, DOCX (Max 10MB)</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <FileText className="h-12 w-12 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Estimated time:</strong> 5-8 minutes
              </p>
              <p className="text-xs text-blue-600 mt-1">
                We'll guide you through extracting information from your resume to build your profile
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleContinue}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Let's Build Your Profile
              </button>
              <button
                onClick={() => setSelectedFile(null)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Change File
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Your resume is secure and only visible to you
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
