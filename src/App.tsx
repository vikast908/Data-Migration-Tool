import { useState } from 'react';
import { ResumeUpload } from './components/ResumeUpload';
import { DataMigrationTool, ProfileSummary } from './components/DataMigrationTool';
import { CompletionScreen } from './components/CompletionScreen';

type AppState = 'upload' | 'migration' | 'complete';

function App() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profileSummary, setProfileSummary] = useState<ProfileSummary | null>(null);

  const handleUploadComplete = (file: File) => {
    setResumeFile(file);
    setAppState('migration');
  };

  const handleMigrationComplete = (summary: ProfileSummary) => {
    setProfileSummary(summary);
    setAppState('complete');
  };

  const handleViewProfile = () => {
    alert('Profile view would open here');
  };

  const handleStartNetworking = () => {
    alert('Networking feature would open here');
  };

  const handleChangeResume = (newFile: File) => {
    // Update the resume file without changing app state
    setResumeFile(newFile);
  };

  return (
    <>
      {appState === 'upload' && (
        <ResumeUpload onUploadComplete={handleUploadComplete} />
      )}

      {appState === 'migration' && resumeFile && (
        <DataMigrationTool
          resumeFile={resumeFile}
          onComplete={handleMigrationComplete}
          onChangeResume={handleChangeResume}
        />
      )}

      {appState === 'complete' && profileSummary && (
        <CompletionScreen
          profileSummary={profileSummary}
          onViewProfile={handleViewProfile}
          onStartNetworking={handleStartNetworking}
        />
      )}
    </>
  );
}

export default App;
