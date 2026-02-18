import React, { useState } from 'react';
import { Icons } from '../ui/Icon';

interface EditorSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isOpen?: boolean;
}

export const EditorSection: React.FC<EditorSectionProps> = ({ title, icon: Icon, children, isOpen: defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
            <Icon size={18} />
          </div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
        {isOpen ? <Icons.Up size={16} className="text-slate-400" /> : <Icons.Down size={16} className="text-slate-400" />}
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 border-t border-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
};