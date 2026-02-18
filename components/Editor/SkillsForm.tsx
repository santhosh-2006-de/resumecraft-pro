import React from 'react';
import { Skill } from '../../types';
import { EditorSection } from './EditorSection';
import { Icons } from '../ui/Icon';

interface Props {
  data: Skill[];
  onChange: (newData: Skill[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ data, onChange }) => {

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 50
    };
    onChange([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <EditorSection title="Skills" icon={Icons.Skills}>
      <div className="space-y-3">
        {data.map((skill) => (
          <div key={skill.id} className="flex items-center gap-3 group">
            <div className="flex-1">
               <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                placeholder="Skill Name (e.g. React)"
                className="w-full p-2 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
            <div className="w-24 flex items-center gap-2">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={skill.level} 
                  onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>
             <button 
              onClick={() => removeSkill(skill.id)}
              className="p-2 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Icons.Trash size={16} />
            </button>
          </div>
        ))}

        <button
          onClick={addSkill}
          className="w-full py-2 mt-2 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md border border-dashed border-blue-200 transition-colors"
        >
          <Icons.Plus size={16} /> Add Skill
        </button>
      </div>
    </EditorSection>
  );
};