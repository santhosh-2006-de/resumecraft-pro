import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { EditorSection } from './EditorSection';
import { Icons } from '../ui/Icon';
import { generateResumeSummary } from '../../services/geminiService';

interface Props {
  data: ResumeData['personal'];
  fullData: ResumeData;
  onChange: (field: keyof ResumeData['personal'], value: string) => void;
}

export const PersonalForm: React.FC<Props> = ({ data, fullData, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateResumeSummary(fullData);
      if (summary) {
        onChange('summary', summary);
      }
    } catch (e) {
      alert("Could not generate summary. Please check your API key or internet connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('avatarUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <EditorSection title="Personal Details" icon={Icons.User} isOpen={true}>
      <div className="grid grid-cols-1 gap-4">
        {/* Photo Upload */}
        <div className="flex items-center gap-4 mb-2">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
             {data.avatarUrl ? (
               <img src={data.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
             ) : (
               <div className="h-full w-full flex items-center justify-center text-slate-300">
                 <Icons.User size={32} />
               </div>
             )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Full Name</label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Job Title</label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => onChange('role', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Software Engineer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Phone</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Address</label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => onChange('address', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Website</label>
            <input
              type="text"
              value={data.website}
              onChange={(e) => onChange('website', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="www.portfolio.com"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Professional Summary</label>
            <button
              onClick={handleAiGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-2 py-1 rounded transition-colors disabled:opacity-50"
            >
              {isGenerating ? <Icons.Loader className="animate-spin" size={12}/> : <Icons.Magic size={12}/>}
              AI Generate
            </button>
          </div>
          <textarea
            value={data.summary}
            onChange={(e) => onChange('summary', e.target.value)}
            rows={4}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm leading-relaxed"
            placeholder="Write a brief summary of your professional background..."
          />
        </div>
      </div>
    </EditorSection>
  );
};