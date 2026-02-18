import React from 'react';
import { Experience } from '../../types';
import { EditorSection } from './EditorSection';
import { Icons } from '../ui/Icon';

interface Props {
  data: Experience[];
  onChange: (newData: Experience[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ data, onChange }) => {
  
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: ''
    };
    onChange([newExp, ...data]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <EditorSection title="Experience" icon={Icons.Briefcase}>
      <div className="space-y-6">
        {data.map((exp) => (
          <div key={exp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-md relative group">
            <button 
              onClick={() => removeExperience(exp.id)}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Icons.Trash size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                placeholder="Job Title"
                className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Company Name"
                className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-500"
              />
              <div className="flex items-center gap-2">
                 <input
                  type="month"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className={`w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-500 ${exp.current ? 'opacity-50 bg-slate-100' : ''}`}
                />
              </div>
            </div>
            
            <div className="flex items-center mb-3">
              <input 
                type="checkbox" 
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-slate-600">
                I currently work here
              </label>
            </div>

            <textarea
              value={exp.responsibilities}
              onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
              placeholder="Key responsibilities and achievements..."
              rows={3}
              className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
        ))}

        <button
          onClick={addExperience}
          className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md border border-dashed border-blue-200 transition-colors"
        >
          <Icons.Plus size={16} /> Add Position
        </button>
      </div>
    </EditorSection>
  );
};