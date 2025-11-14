import { CheckCircle, Eye, Users, XCircle } from 'lucide-react';
import { ProfileSummary } from './DataMigrationTool';

interface CompletionScreenProps {
  profileSummary: ProfileSummary;
  onViewProfile: () => void;
  onStartNetworking: () => void;
}

export function CompletionScreen({ profileSummary, onViewProfile, onStartNetworking }: CompletionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Your Profile is Live!</h1>
          <p className="text-lg text-gray-600">
            You've successfully created your professional profile and can now start connecting with others.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h2>
          <div className="space-y-3 text-left">
            {/* Basic Information - Always present */}
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Basic Information</p>
                  <p className="text-sm text-gray-600">{profileSummary.basicInfo.full_name}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Added</span>
            </div>

            {/* Work Experience */}
            <div className={`flex items-center justify-between p-4 border rounded-lg ${
              profileSummary.experiencesCount > 0
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                {profileSummary.experiencesCount > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-900">Work Experience</p>
                  <p className="text-sm text-gray-600">
                    {profileSummary.experiencesCount > 0
                      ? `${profileSummary.experiencesCount} ${profileSummary.experiencesCount === 1 ? 'entry' : 'entries'}`
                      : 'Not added'}
                  </p>
                </div>
              </div>
              {profileSummary.experiencesCount > 0 ? (
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Added</span>
              ) : (
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">Skipped</span>
              )}
            </div>

            {/* Projects */}
            <div className={`flex items-center justify-between p-4 border rounded-lg ${
              profileSummary.projectsCount > 0
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                {profileSummary.projectsCount > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-900">Projects</p>
                  <p className="text-sm text-gray-600">
                    {profileSummary.projectsCount > 0
                      ? `${profileSummary.projectsCount} ${profileSummary.projectsCount === 1 ? 'project' : 'projects'}`
                      : 'Not added'}
                  </p>
                </div>
              </div>
              {profileSummary.projectsCount > 0 ? (
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Added</span>
              ) : (
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">Skipped</span>
              )}
            </div>

            {/* Education */}
            <div className={`flex items-center justify-between p-4 border rounded-lg ${
              profileSummary.educationCount > 0
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                {profileSummary.educationCount > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-900">Education</p>
                  <p className="text-sm text-gray-600">
                    {profileSummary.educationCount > 0
                      ? `${profileSummary.educationCount} ${profileSummary.educationCount === 1 ? 'entry' : 'entries'}`
                      : 'Not added'}
                  </p>
                </div>
              </div>
              {profileSummary.educationCount > 0 ? (
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Added</span>
              ) : (
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">Skipped</span>
              )}
            </div>

            {/* Skills */}
            <div className={`flex items-center justify-between p-4 border rounded-lg ${
              profileSummary.skillsCount > 0
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                {profileSummary.skillsCount > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-900">Skills</p>
                  <p className="text-sm text-gray-600">
                    {profileSummary.skillsCount > 0
                      ? `${profileSummary.skillsCount} ${profileSummary.skillsCount === 1 ? 'skill' : 'skills'}`
                      : 'Not added'}
                  </p>
                </div>
              </div>
              {profileSummary.skillsCount > 0 ? (
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Added</span>
              ) : (
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">Skipped</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onViewProfile}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="h-5 w-5" />
            View Your Profile
          </button>
          <button
            onClick={onStartNetworking}
            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Users className="h-5 w-5" />
            Start Networking
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            You can always update your profile later by visiting your settings
          </p>
        </div>
      </div>
    </div>
  );
}
