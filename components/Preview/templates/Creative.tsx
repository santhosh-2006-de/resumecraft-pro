import React from 'react';
import { ResumeData } from '../../../types';
import { Icons } from '../../ui/Icon';

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personal, experience, education, skills } = data;

  return (
    <div className="h-full w-full bg-slate-50 text-slate-800 relative overflow-hidden font-display">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60 z-0"></div>

      <div className="relative z-10 p-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-8 mb-10">
          {personal.avatarUrl && (
            <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-white flex-shrink-0">
              <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-1 leading-tight">
              <span className="text-violet-600">{personal.fullName.split(' ')[0]}</span> {personal.fullName.split(' ').slice(1).join(' ')}
            </h1>
            <p className="text-xl font-medium text-slate-500 mb-4">{personal.role}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
               {personal.email && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm text-violet-500"><Icons.Mail size={14} /></div>
                  <span>{personal.email}</span>
                </div>
              )}
               {personal.phone && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm text-violet-500"><Icons.Phone size={14} /></div>
                  <span>{personal.phone}</span>
                </div>
              )}
               {personal.website && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm text-violet-500"><Icons.Website size={14} /></div>
                  <span>{personal.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 flex-1">
          {/* Main Column */}
          <div className="col-span-8 flex flex-col gap-8">
            {/* Summary */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50">
               <h3 className="text-sm font-bold uppercase tracking-wider text-violet-600 mb-3 flex items-center gap-2">
                <Icons.Summary size={16} /> Profile
               </h3>
               <p className="text-slate-600 leading-relaxed text-sm">
                 {personal.summary}
               </p>
            </div>

             {/* Experience */}
             <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50 flex-1">
               <h3 className="text-sm font-bold uppercase tracking-wider text-violet-600 mb-6 flex items-center gap-2">
                <Icons.Briefcase size={16} /> Experience
               </h3>
               <div className="space-y-8">
                 {experience.map((exp, i) => (
                   <div key={exp.id} className="relative pl-6 border-l-2 border-violet-100 last:border-0">
                     <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-violet-400 ring-4 ring-violet-50"></div>
                     <div className="flex flex-col mb-2">
                       <h4 className="text-lg font-bold text-slate-800">{exp.role}</h4>
                       <div className="flex justify-between items-center w-full">
                         <span className="text-violet-600 font-semibold text-sm">{exp.company}</span>
                         <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                           {exp.startDate} - {exp.current ? 'Now' : exp.endDate}
                         </span>
                       </div>
                     </div>
                     <p className="text-slate-600 text-sm whitespace-pre-line mt-2">
                       {exp.responsibilities}
                     </p>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Skills */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-sm font-bold uppercase tracking-wider text-violet-400 mb-5 flex items-center gap-2">
                <Icons.Skills size={16} /> Skills
              </h3>
              <div className="space-y-4">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span>{skill.name}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 flex-1 rounded-full ${
                            (i + 1) * 20 <= skill.level ? 'bg-violet-500' : 'bg-slate-700'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50">
              <h3 className="text-sm font-bold uppercase tracking-wider text-violet-600 mb-5 flex items-center gap-2">
                <Icons.Education size={16} /> Education
              </h3>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id} className="pb-4 border-b border-dashed border-slate-200 last:border-0 last:pb-0">
                    <div className="font-bold text-slate-800">{edu.institution}</div>
                    <div className="text-violet-600 text-xs font-medium mt-0.5">{edu.degree}</div>
                    <div className="text-slate-400 text-xs mt-1">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};