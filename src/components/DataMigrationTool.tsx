import { useState, useEffect, useRef } from 'react';
import { Save, ArrowRight, CheckCircle, Upload, X, AlertCircle, XCircle, Layout, Sparkles } from 'lucide-react';
import { ResumeViewer } from './ResumeViewer';
import { BasicInfoForm } from './BasicInfoForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { ProjectsForm } from './ProjectsForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { FloatingPanel } from './FloatingPanel';
import { ContextMenu } from './ContextMenu';
import { BasicInfo, WorkExperience, Project, Education, Skill } from '../types/profile';

export interface ProfileSummary {
  basicInfo: {
    full_name: string;
    email: string;
    phone: string;
    location?: string;
    headline?: string;
  };
  experiencesCount: number;
  projectsCount: number;
  educationCount: number;
  skillsCount: number;
}

interface DataMigrationToolProps {
  resumeFile: File;
  onComplete: (summary: ProfileSummary) => void;
  onChangeResume?: (newFile: File) => void;
}

type Section = 'basic' | 'experience' | 'projects' | 'education' | 'skills' | 'review';

export function DataMigrationTool({ resumeFile, onComplete, onChangeResume }: DataMigrationToolProps) {
  const [currentSection, setCurrentSection] = useState<Section>('basic');
  const [selectedText, setSelectedText] = useState<string>('');
  const [basicInfo, setBasicInfo] = useState<Partial<BasicInfo>>({});
  const [experiences, setExperiences] = useState<Partial<WorkExperience>[]>([]);
  const [projects, setProjects] = useState<Partial<Project>[]>([]);
  const [education, setEducation] = useState<Partial<Education>[]>([]);
  const [skills, setSkills] = useState<Partial<Skill>[]>([]);
  const [activeExperienceIndex, setActiveExperienceIndex] = useState<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeEducationIndex, setActiveEducationIndex] = useState<number | null>(null);
  const [mappedRanges, setMappedRanges] = useState<Set<string>>(new Set());
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showChangeResumeModal, setShowChangeResumeModal] = useState(false);
  const [showCompletionError, setShowCompletionError] = useState(false);
  const [pendingClearData, setPendingClearData] = useState(false);
  const [useFloatingPanel, setUseFloatingPanel] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; text: string } | null>(null);
  const [milestoneToast, setMilestoneToast] = useState<{ message: string; show: boolean } | null>(null);
  const [previousProgress, setPreviousProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSelect = (text: string) => {
    setSelectedText(text);
  };

  const handleTextAssigned = () => {
    if (selectedText) {
      setMappedRanges(prev => new Set([...prev, selectedText]));
      setSelectedText('');
    }
  };

  const handleRightClick = (text: string, x: number, y: number) => {
    setContextMenu({ x, y, text });
  };

  const handleSendToField = (fieldPath: string) => {
    if (!contextMenu) return;

    const [section, index, field] = fieldPath.split('.');
    const text = contextMenu.text;

    if (section === 'experience') {
      const expIndex = parseInt(index);
      const updated = [...experiences];
      if (!updated[expIndex]) {
        // Create new experience if it doesn't exist
        updated[expIndex] = {
          job_title: '',
          company_name: '',
          start_date: '',
          end_date: null,
          is_current: false,
          description: '',
          display_order: expIndex
        };
      }
      updated[expIndex] = { ...updated[expIndex], [field]: text };
      setExperiences(updated);
      setMappedRanges(prev => new Set([...prev, text]));
    }

    setContextMenu(null);
  };

  const calculateProgress = (): number => {
    let completed = 0;
    let total = 0;

    total += 4;
    if (basicInfo.full_name) completed++;
    if (basicInfo.email) completed++;
    if (basicInfo.phone) completed++;
    if (basicInfo.location) completed++;

    total += 1;
    if (experiences.length > 0) completed++;

    total += 1;
    if (skills.length >= 5) completed++;

    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  const getEncouragingMessage = (): string => {
    if (progress === 100) {
      return "Perfect! Your profile is complete.";
    } else if (progress >= 75) {
      return "Almost done! Your profile is looking strong.";
    } else if (progress >= 50) {
      return "Halfway there! Keep going.";
    } else if (progress >= 25) {
      return "You're off to a great start!";
    } else if (progress > 0) {
      return "Great! Let's build your profile.";
    }
    return "Let's get started!";
  };

  const getTimeEstimate = (): string => {
    const totalFields = 6; // full_name, email, phone, location, headline, experience
    let completedFields = 0;

    if (basicInfo.full_name) completedFields++;
    if (basicInfo.email) completedFields++;
    if (basicInfo.phone) completedFields++;
    if (basicInfo.location) completedFields++;
    if (basicInfo.headline) completedFields++;
    if (experiences.length > 0) completedFields++;

    const remainingFields = totalFields - completedFields;

    if (remainingFields === 0) {
      return "All done!";
    } else if (remainingFields === 1) {
      return "Just 1 more field to go";
    } else if (remainingFields === 2) {
      return "Just 2 more fields to go";
    } else if (remainingFields === 3) {
      return "Just 3 more fields to go";
    } else if (progress >= 50) {
      return "You're doing great—2 minutes left";
    } else {
      return "This will take about 5 minutes";
    }
  };

  const isBasicInfoComplete = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = basicInfo.email && emailRegex.test(basicInfo.email);
    return !!(basicInfo.full_name && isEmailValid && basicInfo.phone);
  };

  const isExperienceComplete = () => {
    // If no experiences added, it's valid (optional)
    if (experiences.length === 0) return true;

    // If experiences are added, at least one should be filled
    return experiences.some(exp =>
      exp.job_title && exp.company_name
    );
  };

  const isProjectsComplete = () => {
    // If no projects added, it's valid (optional)
    if (projects.length === 0) return true;

    // If projects are added, at least one should be filled
    return projects.some(proj =>
      proj.project_title && proj.client
    );
  };

  const isEducationComplete = () => {
    // If no education added, it's valid (optional)
    if (education.length === 0) return true;

    // If education are added, at least one should be filled
    return education.some(edu =>
      edu.degree && edu.institution
    );
  };

  const isSkillsComplete = () => {
    // If no skills added, it's valid (optional)
    if (skills.length === 0) return true;

    // If skills started, need at least 3
    return skills.length >= 3;
  };

  const canCompleteProfile = () => {
    // Only Basic Info is mandatory
    return isBasicInfoComplete() && isExperienceComplete() && isProjectsComplete() && isEducationComplete() && isSkillsComplete();
  };

  const handleNext = () => {
    if (currentSection === 'basic') {
      setCurrentSection('experience');
    } else if (currentSection === 'experience') {
      setCurrentSection('projects');
    } else if (currentSection === 'projects') {
      setCurrentSection('education');
    } else if (currentSection === 'education') {
      setCurrentSection('skills');
    } else if (currentSection === 'skills') {
      setCurrentSection('review');
    }
  };

  const handleComplete = () => {
    // Comprehensive validation
    if (!canCompleteProfile()) {
      setShowCompletionError(true);
      setTimeout(() => setShowCompletionError(false), 5000);
      return;
    }

    // Create profile summary
    const summary: ProfileSummary = {
      basicInfo: {
        full_name: basicInfo.full_name || '',
        email: basicInfo.email || '',
        phone: basicInfo.phone || '',
        location: basicInfo.location,
        headline: basicInfo.headline
      },
      experiencesCount: experiences.length,
      projectsCount: projects.length,
      educationCount: education.length,
      skillsCount: skills.length
    };

    onComplete(summary);
  };

  const handleChangeResumeClick = () => {
    setShowChangeResumeModal(true);
  };

  const handleChangeResumeConfirm = (clearData: boolean) => {
    setShowChangeResumeModal(false);
    setPendingClearData(clearData);
    // Trigger file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clear data if requested
      if (pendingClearData) {
        setBasicInfo({});
        setExperiences([]);
        setProjects([]);
        setEducation([]);
        setSkills([]);
        setMappedRanges(new Set());
        setCurrentSection('basic');
      }

      // Update resume file in parent
      if (onChangeResume) {
        onChangeResume(file);
      }

      // Reset pending flag
      setPendingClearData(false);
    }

    // Reset file input value to allow selecting the same file again
    event.target.value = '';
  };

  // Auto-save whenever data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (basicInfo || experiences.length > 0 || projects.length > 0 || education.length > 0 || skills.length > 0) {
        setLastSaved(new Date());
        // TODO: Here you would save to backend/localStorage
        console.log('Auto-saved data:', { basicInfo, experiences, projects, education, skills });
      }
    }, 2000); // Save 2 seconds after user stops typing

    return () => clearTimeout(timer);
  }, [basicInfo, experiences, projects, education, skills]);

  // Track progress milestones
  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    // Check if we crossed a milestone
    for (const milestone of milestones) {
      if (previousProgress < milestone && progress >= milestone) {
        let message = '';
        if (milestone === 25) {
          message = "🎉 You're off to a great start!";
        } else if (milestone === 50) {
          message = "🚀 Halfway there! Keep going.";
        } else if (milestone === 75) {
          message = "⭐ Almost done! Your profile is looking strong.";
        } else if (milestone === 100) {
          message = "🎊 Perfect! Your profile is complete.";
        }

        setMilestoneToast({ message, show: true });
        setTimeout(() => {
          setMilestoneToast(prev => prev ? { ...prev, show: false } : null);
        }, 4000);
        break;
      }
    }

    setPreviousProgress(progress);
  }, [progress, previousProgress]);

  return (
    <>
    <div className="h-screen flex flex-col bg-white">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Data Migration</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Progress: {progress}%</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="border-l border-gray-300 pl-3 flex flex-col gap-0.5">
                <span className={`text-sm font-semibold flex items-center gap-1.5 ${
                  progress === 100 ? 'text-green-600' : 'text-blue-600'
                }`}>
                  <Sparkles className={`h-4 w-4 ${progress === 100 ? 'animate-pulse' : ''}`} />
                  {getEncouragingMessage()}
                </span>
                <span className="text-xs text-gray-500 ml-5">
                  {getTimeEstimate()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {lastSaved && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Save className="h-4 w-4" />
                <span>Auto-saved at {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
            {currentSection === 'experience' && (
              <button
                onClick={() => setUseFloatingPanel(!useFloatingPanel)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  useFloatingPanel
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'text-purple-600 hover:bg-purple-50'
                }`}
                title={useFloatingPanel ? 'Use Traditional Layout' : 'Use Floating Panel'}
              >
                <Layout className="h-4 w-4" />
                {useFloatingPanel ? 'Floating Panel' : 'Traditional'}
              </button>
            )}
            <button
              onClick={handleChangeResumeClick}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Change Resume
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Save & Exit
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {(['basic', 'experience', 'projects', 'education', 'skills', 'review'] as Section[]).map((section, index) => (
            <div key={section} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentSection(section)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentSection === section
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section === 'basic' && 'Basic Info'}
                {section === 'experience' && 'Experience'}
                {section === 'projects' && 'Projects'}
                {section === 'education' && 'Education'}
                {section === 'skills' && 'Skills'}
                {section === 'review' && 'Review'}
              </button>
              {index < 5 && (
                <ArrowRight className="h-4 w-4 text-gray-400 mx-2 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className={useFloatingPanel && currentSection === 'experience' ? 'w-full' : 'w-1/2'}>
          <ResumeViewer
            resumeFile={resumeFile}
            onTextSelect={handleTextSelect}
            mappedRanges={mappedRanges}
            onRightClick={useFloatingPanel ? handleRightClick : undefined}
          />
        </div>

        {!(useFloatingPanel && currentSection === 'experience') && (
        <div className="w-1/2 overflow-auto">
          <div className="p-8">
            {selectedText && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">Selected Text:</p>
                <p className="text-sm text-blue-800 italic">"{selectedText}"</p>
                <p className="text-xs text-blue-600 mt-2">Click on any field to fill it with this text</p>
              </div>
            )}

            {currentSection === 'basic' && (
              <BasicInfoForm
                data={basicInfo}
                onChange={setBasicInfo}
                selectedText={selectedText}
                onTextAssigned={handleTextAssigned}
              />
            )}

            {currentSection === 'experience' && (
              <WorkExperienceForm
                experiences={experiences}
                onChange={setExperiences}
                selectedText={selectedText}
                onTextAssigned={handleTextAssigned}
                activeExperienceIndex={activeExperienceIndex}
                onExperienceClick={setActiveExperienceIndex}
              />
            )}

            {currentSection === 'projects' && (
              <ProjectsForm
                projects={projects}
                onChange={setProjects}
                selectedText={selectedText}
                onTextAssigned={handleTextAssigned}
                activeProjectIndex={activeProjectIndex}
                onProjectClick={setActiveProjectIndex}
              />
            )}

            {currentSection === 'education' && (
              <EducationForm
                education={education}
                onChange={setEducation}
                selectedText={selectedText}
                onTextAssigned={handleTextAssigned}
                activeEducationIndex={activeEducationIndex}
                onEducationClick={setActiveEducationIndex}
              />
            )}

            {currentSection === 'skills' && (
              <SkillsForm
                skills={skills}
                onChange={setSkills}
                selectedText={selectedText}
                onTextAssigned={handleTextAssigned}
              />
            )}

            {currentSection === 'review' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Review Your Profile</h2>
                  <p className="text-sm text-gray-600">Check everything looks good before completing</p>
                </div>

                <div className="space-y-4">
                  {/* Basic Information */}
                  <div className={`border-2 rounded-lg p-4 ${
                    isBasicInfoComplete() ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {isBasicInfoComplete() ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        Basic Information
                      </h3>
                      <button
                        onClick={() => setCurrentSection('basic')}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Edit
                      </button>
                    </div>
                    {isBasicInfoComplete() ? (
                      <div className="text-sm text-gray-700 space-y-1">
                        <p><strong>Name:</strong> {basicInfo.full_name}</p>
                        <p><strong>Email:</strong> {basicInfo.email}</p>
                        <p><strong>Phone:</strong> {basicInfo.phone}</p>
                        {basicInfo.location && <p><strong>Location:</strong> {basicInfo.location}</p>}
                      </div>
                    ) : (
                      <p className="text-sm text-red-700">
                        ⚠️ Required fields missing or invalid. Please ensure Name, valid Email, and Phone are filled.
                      </p>
                    )}
                  </div>

                  {/* Work Experience */}
                  <div className={`border-2 rounded-lg p-4 ${
                    isExperienceComplete() ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {isExperienceComplete() ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        Work Experience ({experiences.length}) <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </h3>
                      <button
                        onClick={() => setCurrentSection('experience')}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {experiences.length === 0 ? 'Add' : 'Edit'}
                      </button>
                    </div>
                    {experiences.length === 0 ? (
                      <p className="text-sm text-gray-600">
                        No work experience added yet.
                      </p>
                    ) : isExperienceComplete() ? (
                      experiences.map((exp, i) => (
                        <div key={i} className="text-sm text-gray-700 mb-2">
                          <p className="font-medium">{exp.job_title} at {exp.company_name}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-red-700">
                        ⚠️ Please complete the experience entries you've started.
                      </p>
                    )}
                  </div>

                  {/* Projects */}
                  <div className={`border-2 rounded-lg p-4 ${
                    isProjectsComplete() ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {isProjectsComplete() ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        Projects ({projects.length}) <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </h3>
                      <button
                        onClick={() => setCurrentSection('projects')}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {projects.length === 0 ? 'Add' : 'Edit'}
                      </button>
                    </div>
                    {projects.length === 0 ? (
                      <p className="text-sm text-gray-600">
                        No projects added yet.
                      </p>
                    ) : isProjectsComplete() ? (
                      projects.map((proj, i) => (
                        <div key={i} className="text-sm text-gray-700 mb-2">
                          <p className="font-medium">{proj.project_title} - {proj.client}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-red-700">
                        ⚠️ Please complete the project entries you've started.
                      </p>
                    )}
                  </div>

                  {/* Education */}
                  <div className={`border-2 rounded-lg p-4 ${
                    isEducationComplete() ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {isEducationComplete() ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        Education ({education.length}) <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </h3>
                      <button
                        onClick={() => setCurrentSection('education')}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {education.length === 0 ? 'Add' : 'Edit'}
                      </button>
                    </div>
                    {education.length === 0 ? (
                      <p className="text-sm text-gray-600">
                        No education added yet.
                      </p>
                    ) : isEducationComplete() ? (
                      education.map((edu, i) => (
                        <div key={i} className="text-sm text-gray-700 mb-2">
                          <p className="font-medium">{edu.degree} - {edu.institution}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-red-700">
                        ⚠️ Please complete the education entries you've started.
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div className={`border-2 rounded-lg p-4 ${
                    isSkillsComplete() ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {isSkillsComplete() ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        Skills ({skills.length}) <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </h3>
                      <button
                        onClick={() => setCurrentSection('skills')}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {skills.length === 0 ? 'Add' : 'Edit'}
                      </button>
                    </div>
                    {skills.length === 0 ? (
                      <p className="text-sm text-gray-600">
                        No skills added yet.
                      </p>
                    ) : isSkillsComplete() ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {skill.skill_name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-red-700">
                        ⚠️ Please add at least 3 skills (currently {skills.length}).
                      </p>
                    )}
                  </div>
                </div>

                {canCompleteProfile() ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      <strong>✓ Ready to Complete!</strong>
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      All required information is complete. Click Complete Profile to finish.
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      <strong>⚠️ Action Required</strong>
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      {!isBasicInfoComplete() && 'Please complete Basic Information with valid email (required). '}
                      {!isExperienceComplete() && 'Please complete started experience entries. '}
                      {!isProjectsComplete() && 'Please complete started project entries. '}
                      {!isEducationComplete() && 'Please complete started education entries. '}
                      {!isSkillsComplete() && 'Please add at least 3 skills if you want to include them. '}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex gap-3 justify-center">
              {currentSection !== 'review' ? (
                <>
                  <button
                    onClick={handleNext}
                    className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!canCompleteProfile()}
                    className="px-8 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Save & Exit
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentSection('skills')}
                    className="px-8 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!canCompleteProfile()}
                    className="px-8 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Complete Profile
                  </button>
                </>
              )}
            </div>

            {showCompletionError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium mb-2">
                  ⚠️ Cannot complete profile
                </p>
                <ul className="text-xs text-red-700 list-disc list-inside space-y-1">
                  {!isBasicInfoComplete() && <li>Complete Basic Information with valid email (required)</li>}
                  {!isExperienceComplete() && <li>Complete started experience entries</li>}
                  {!isProjectsComplete() && <li>Complete started project entries</li>}
                  {!isEducationComplete() && <li>Complete started education entries</li>}
                  {!isSkillsComplete() && <li>Add at least 3 skills or remove started skills</li>}
                </ul>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>

    {/* Floating Panel for Work Experience */}
    {useFloatingPanel && currentSection === 'experience' && (
      <FloatingPanel
        title="Work Experience"
        isOpen={true}
        onClose={() => setUseFloatingPanel(false)}
        storageKey="work-experience-panel"
      >
        <WorkExperienceForm
          experiences={experiences}
          onChange={setExperiences}
          selectedText={selectedText}
          onTextAssigned={handleTextAssigned}
          activeExperienceIndex={activeExperienceIndex}
          onExperienceClick={setActiveExperienceIndex}
        />
      </FloatingPanel>
    )}

    {/* Context Menu */}
    {contextMenu && (
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        options={experiences.flatMap((exp, index) => [
          {
            label: `Experience #${index + 1} - Job Title`,
            value: `experience.${index}.job_title`
          },
          {
            label: `Experience #${index + 1} - Company`,
            value: `experience.${index}.company_name`
          },
          {
            label: `Experience #${index + 1} - Description`,
            value: `experience.${index}.description`
          }
        ]).concat([
          {
            label: '+ New Experience - Job Title',
            value: `experience.${experiences.length}.job_title`
          }
        ])}
        onSelect={handleSendToField}
        onClose={() => setContextMenu(null)}
      />
    )}

    {/* Change Resume Modal */}
    {showChangeResumeModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Change Resume?</h3>
              <p className="text-sm text-gray-600 mt-1">
                What would you like to do with your current data?
              </p>
            </div>
            <button
              onClick={() => setShowChangeResumeModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleChangeResumeConfirm(false)}
              className="w-full p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
            >
              <div className="font-semibold text-gray-900 mb-1">
                Keep Current Data
              </div>
              <div className="text-sm text-gray-600">
                Upload a new resume but keep all the information you've already entered
              </div>
            </button>

            <button
              onClick={() => handleChangeResumeConfirm(true)}
              className="w-full p-4 border-2 border-red-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-left"
            >
              <div className="font-semibold text-gray-900 mb-1">
                Clear All Fields
              </div>
              <div className="text-sm text-gray-600">
                Upload a new resume and start fresh (all current data will be lost)
              </div>
            </button>
          </div>

          <button
            onClick={() => setShowChangeResumeModal(false)}
            className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Hidden file input for changing resume */}
    <input
      ref={fileInputRef}
      type="file"
      accept=".pdf,.doc,.docx,image/*"
      onChange={handleFileChange}
      className="hidden"
    />

    {/* Milestone Toast Notification */}
    {milestoneToast && (
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          milestoneToast.show
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
          <Sparkles className="h-6 w-6 animate-pulse" />
          <span className="text-lg font-semibold">{milestoneToast.message}</span>
        </div>
      </div>
    )}
    </>
  );
}
