import React from 'react';
import { ResumeData } from '../../../types';

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, experience, education, skills } = data;

  return (
    <div className="h-full w-full bg-white text-slate-900 p-12 font-serif">
      {/* Header */}
      <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-3 text-slate-900 font-sans">{personal.fullName}</h1>
        <p className="text-xl italic text-slate-600 mb-4 font-serif">{personal.role}</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 font-sans">
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.address && <span>•</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.address && personal.website && <span>•</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 font-sans text-slate-700">Summary</h2>
          <p className="text-sm leading-7 text-justify text-slate-800">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4 font-sans text-slate-700">Experience</h2>
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg font-sans">{exp.company}</h3>
                <span className="text-sm font-medium italic text-slate-600">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="text-slate-700 font-medium mb-2 italic">{exp.role}</div>
              <p className="text-sm leading-6 text-slate-800 whitespace-pre-line">
                {exp.responsibilities}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout for Education and Skills */}
      <div className="grid grid-cols-2 gap-12">
        {/* Education */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4 font-sans text-slate-700">Education</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="font-bold font-sans">{edu.institution}</div>
                <div className="text-slate-700 italic text-sm">{edu.degree}</div>
                <div className="text-slate-500 text-xs mt-1">
                  {edu.startDate} – {edu.endDate || 'Present'}
                </div>
                {edu.description && <p className="text-xs mt-1 text-slate-600">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-4 font-sans text-slate-700">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="bg-slate-100 px-3 py-1 rounded text-xs font-sans font-medium text-slate-700">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};