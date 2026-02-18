import React, { useEffect, useRef, useState } from 'react';
import { ResumeData, TemplateType } from '../../types';
import { ModernTemplate } from './templates/Modern';
import { ClassicTemplate } from './templates/Classic';
import { CreativeTemplate } from './templates/Creative';

interface Props {
  data: ResumeData;
  template: TemplateType;
}

export const ResumePreview: React.FC<Props> = ({ data, template }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Auto-scale to fit container
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const A4_WIDTH_PX = 794; // 210mm at 96dpi
      
      // Calculate scale but cap at 1 to prevent pixelation on large screens
      // Add padding calculation
      const newScale = Math.min((containerWidth - 48) / A4_WIDTH_PX, 1);
      setScale(Math.max(newScale, 0.4)); // Min scale 0.4
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderTemplate = () => {
    switch (template) {
      case 'modern': return <ModernTemplate data={data} />;
      case 'classic': return <ClassicTemplate data={data} />;
      case 'creative': return <CreativeTemplate data={data} />;
      default: return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
      {/* Scrollable Area */}
      <div 
        ref={containerRef} 
        className="w-full h-full overflow-y-auto overflow-x-hidden py-8 px-4 flex justify-center print:p-0 print:overflow-visible"
      >
        <div 
          className="print-container bg-white shadow-2xl transition-transform origin-top duration-200 ease-out print:transform-none print:shadow-none"
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: `scale(${scale})`,
            marginBottom: `${-(1 - scale) * 1123}px` // Compensate for scale margin
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};