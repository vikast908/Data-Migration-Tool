import { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ResumeViewerProps {
  resumeFile: File;
  onTextSelect: (text: string) => void;
  mappedRanges: Set<string>;
  onRightClick?: (text: string, x: number, y: number) => void;
}

export function ResumeViewer({ resumeFile, onTextSelect, mappedRanges, onRightClick }: ResumeViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [resumeUrl] = useState(() => URL.createObjectURL(resumeFile));

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleFitWidth = () => setZoom(100);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedText && selectedText.length > 0) {
      onTextSelect(selectedText);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (onRightClick) {
      e.preventDefault();
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (selectedText && selectedText.length > 0) {
        onRightClick(selectedText, e.clientX, e.clientY);
      }
    }
  };

  const isTextMapped = (text: string): boolean => {
    return Array.from(mappedRanges).some(mapped =>
      text.includes(mapped) || mapped.includes(text)
    );
  };

  const highlightMappedText = (text: string): string => {
    let highlightedText = text;

    // Sort mapped ranges by length (longest first) to avoid partial matches
    const sortedRanges = Array.from(mappedRanges).sort((a, b) => b.length - a.length);

    sortedRanges.forEach(mapped => {
      const regex = new RegExp(mapped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      highlightedText = highlightedText.replace(
        regex,
        `<mark class="bg-green-100 border-b-2 border-green-300 text-gray-900">$&</mark>`
      );
    });

    return highlightedText;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Your Resume</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4 text-gray-600" />
            </button>
            <span className="text-sm text-gray-600 font-medium min-w-[60px] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={handleFitWidth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
              title="Fit to Width"
            >
              <Maximize2 className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6" onMouseUp={handleMouseUp} onContextMenu={handleContextMenu}>
        <div
          className="bg-white shadow-lg mx-auto transition-transform"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center'
          }}
        >
          {resumeFile.type === 'application/pdf' ? (
            <iframe
              src={resumeUrl}
              className="w-full h-[800px] border-0"
              title="Resume Preview"
            />
          ) : (
            <div className="p-8 text-gray-700 leading-relaxed" style={{ userSelect: 'text' }}>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h1
                    className="text-3xl font-bold text-gray-900 mb-2"
                    dangerouslySetInnerHTML={{ __html: highlightMappedText('JOHN SMITH') }}
                  />
                  <p
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: highlightMappedText('john.smith@email.com | +1 (555) 123-4567 | New York, NY')
                    }}
                  />
                  <p
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: highlightMappedText('linkedin.com/in/johnsmith | github.com/johnsmith')
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">PROFESSIONAL SUMMARY</h2>
                  <p
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: highlightMappedText(
                        'Product Manager with 5+ years of experience leading cross-functional teams to deliver innovative solutions. Proven track record of launching successful products that drive user engagement and revenue growth. Skilled in agile methodologies, data analytics, and stakeholder management.'
                      )
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">WORK EXPERIENCE</h2>

                  <div className="mb-4">
                    <h3
                      className="font-semibold text-gray-900"
                      dangerouslySetInnerHTML={{ __html: highlightMappedText('Senior Product Manager') }}
                    />
                    <p
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: highlightMappedText('Tech Corp | San Francisco, CA | Jan 2022 - Present')
                      }}
                    />
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                      <li>Led product strategy for flagship SaaS platform serving 50,000+ users</li>
                      <li>Increased user engagement by 45% through feature optimization and A/B testing</li>
                      <li>Managed cross-functional team of 8 engineers and designers</li>
                      <li>Drove $2M in annual recurring revenue through new product launches</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900">Product Manager</h3>
                    <p className="text-gray-600">StartupXYZ | Boston, MA | Jun 2019 - Dec 2021</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                      <li>Launched mobile application that achieved 100K downloads in first 6 months</li>
                      <li>Conducted user research with 200+ customers to inform product roadmap</li>
                      <li>Collaborated with engineering team to implement agile development processes</li>
                      <li>Reduced customer churn by 30% through improved onboarding experience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">Associate Product Manager</h3>
                    <p className="text-gray-600">Digital Solutions Inc | New York, NY | Aug 2017 - May 2019</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                      <li>Supported product lifecycle management for enterprise software solutions</li>
                      <li>Analyzed user metrics and feedback to prioritize feature development</li>
                      <li>Created product documentation and training materials for internal teams</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">EDUCATION</h2>
                  <div>
                    <h3 className="font-semibold text-gray-900">Bachelor of Science in Computer Science</h3>
                    <p className="text-gray-600">Massachusetts Institute of Technology | Cambridge, MA | 2013 - 2017</p>
                    <p className="text-gray-700 mt-1">GPA: 3.8/4.0 | Dean's List</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">SKILLS</h2>
                  <p
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: highlightMappedText(
                        'Product Management, Agile/Scrum, Data Analytics, User Research, A/B Testing, SQL, Python, JavaScript, Jira, Figma, Google Analytics, Tableau, Strategic Planning, Stakeholder Management'
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span>Unassigned</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span>Mapped</span>
          </div>
        </div>
      </div>
    </div>
  );
}
