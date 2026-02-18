import React from 'react';
import { Education } from '../../types';
import { EditorSection } from './EditorSection';
import { Icons } from '../ui/Icon';

interface Props {
  data: Education[];
  onChange: (newData: Education[]) => void;
}

export const EducationForm: React.FC<Props> = ({ data, onChange }) => {
  
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([newEdu, ...data]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <EditorSection title="Education" icon={Icons.Education}>
      <div className="space-y-6">
        {data.map((edu) => (
          <div key={edu.id} className="p-4 bg-slate-50 border border-slate-200 rounded-md relative group">
            <button 
              onClick={() => removeEducation(edu.id)}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Icons.Trash size={16} />
            </button>

            <div className="grid grid-cols-1 gap-3 mb-3">
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder="School / University"
                className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Degree / Field of Study"
                className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-500"
              />
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-500"
              />
            </div>

            <textarea
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
              placeholder="Description (Optional)"
              rows={2}
              className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
        ))}

        <button
          onClick={addEducation}
          className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md border border-dashed border-blue-200 transition-colors"
        >
          <Icons.Plus size={16} /> Add Education
        </button>
      </div>
    </EditorSection>
  );
};