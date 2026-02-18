import React, { useState, useEffect } from 'react';
import { ResumeData, TemplateType, INITIAL_DATA } from './types';
import { PersonalForm } from './components/Editor/PersonalForm';
import { ExperienceForm } from './components/Editor/ExperienceForm';
import { EducationForm } from './components/Editor/EducationForm';
import { SkillsForm } from './components/Editor/SkillsForm';
import { ResumePreview } from './components/Preview/ResumePreview';
import { Icons } from './components/ui/Icon';

const App: React.FC = () => {
  // Load initial state from local storage or default
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('modern');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor'); // For Mobile View

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      setResumeData(INITIAL_DATA);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-slate-100 overflow-hidden">
      
      {/* Mobile Tab Switcher */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 flex">
        <button 
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-3 flex flex-col items-center justify-center text-xs font-medium ${activeTab === 'editor' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <Icons.Briefcase size={20} className="mb-1" />
          Editor
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 flex flex-col items-center justify-center text-xs font-medium ${activeTab === 'preview' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <Icons.Summary size={20} className="mb-1" />
          Preview
        </button>
      </div>

      {/* Sidebar Editor */}
      <div className={`
        w-full md:w-[450px] lg:w-[500px] flex-shrink-0 flex flex-col bg-white border-r border-slate-200 h-full transition-transform duration-300 z-20
        absolute md:relative
        ${activeTab === 'editor' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Editor Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Icons.Summary className="text-white" size={20} />
            </div>
            <h1 className="font-bold text-lg text-slate-800">ResumeCraft</h1>
          </div>
          <button onClick={handleReset} className="text-xs text-slate-400 hover:text-red-500 font-medium">Reset Data</button>
        </div>

        {/* Editor Content Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24 md:pb-6">
          <PersonalForm 
            data={resumeData.personal} 
            fullData={resumeData}
            onChange={(field, value) => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }))}
          />
          <ExperienceForm 
            data={resumeData.experience} 
            onChange={(newData) => setResumeData(prev => ({ ...prev, experience: newData }))}
          />
          <EducationForm 
            data={resumeData.education} 
            onChange={(newData) => setResumeData(prev => ({ ...prev, education: newData }))}
          />
          <SkillsForm 
            data={resumeData.skills} 
            onChange={(newData) => setResumeData(prev => ({ ...prev, skills: newData }))}
          />
        </div>
      </div>

      {/* Main Preview Area */}
      <div className={`
        flex-1 h-full flex flex-col relative bg-slate-100 transition-transform duration-300
        absolute md:relative w-full
        ${activeTab === 'preview' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {/* Toolbar */}
        <div className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-10 print:hidden sticky top-0">
          <div className="flex items-center gap-2">
             <span className="text-sm font-medium text-slate-500 mr-2 hidden sm:inline">Template:</span>
             <div className="flex bg-slate-100 p-1 rounded-lg">
               {(['modern', 'classic', 'creative'] as TemplateType[]).map((t) => (
                 <button
                  key={t}
                  onClick={() => setActiveTemplate(t)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                    activeTemplate === t 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                 >
                   {t}
                 </button>
               ))}
             </div>
          </div>
          <button 
            onClick={handlePrint}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <Icons.Download size={16} />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>

        {/* Preview Component */}
        <ResumePreview data={resumeData} template={activeTemplate} />
      </div>
    </div>
  );
};

export default App;