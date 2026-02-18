import React from 'react';
import { ResumeData } from '../../../types';
import { Icons } from '../../ui/Icon';

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, experience, education, skills } = data;

  return (
    <div className="h-full w-full bg-white text-slate-800 grid grid-cols-[300px_1fr]">
      {/* Sidebar / Left Column */}
      <div className="bg-slate-900 text-white p-8 flex flex-col gap-6">
        <div className="text-center mb-6">
          {personal.avatarUrl && (
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-slate-700 mb-4 shadow-xl">
              <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight mb-2">{personal.fullName}</h1>
          <p className="text-blue-400 font-medium uppercase text-sm tracking-wider">{personal.role}</p>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          {personal.email && (
            <div className="flex items-center gap-3">
              <Icons.Mail size={16} className="text-blue-400" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
             <div className="flex items-center gap-3">
              <Icons.Phone size={16} className="text-blue-400" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.address && (
             <div className="flex items-center gap-3">
              <Icons.Location size={16} className="text-blue-400" />
              <span>{personal.address}</span>
            </div>
          )}
           {personal.website && (
             <div className="flex items-center gap-3">
              <Icons.Website size={16} className="text-blue-400" />
              <span>{personal.website}</span>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Skills</h3>
          <div className="space-y-3">
            {skills.map(skill => (
              <div key={skill.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{skill.name}</span>
                  <span className="text-slate-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Education</h3>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="font-bold text-white">{edu.institution}</div>
                <div className="text-blue-400 text-xs">{edu.degree}</div>
                <div className="text-slate-500 text-xs mt-1">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content / Right Column */}
      <div className="p-8 bg-white">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-100 pb-3 mb-4 uppercase tracking-wide">
            Professional Profile
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            {personal.summary}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-100 pb-3 mb-6 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map(exp => (
              <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-blue-500"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-xs font-medium text-white bg-slate-800 px-2 py-0.5 rounded-full">
                     {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-blue-600 font-medium mb-3">{exp.company}</div>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {exp.responsibilities}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};