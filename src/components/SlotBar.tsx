import React from 'react';

interface SlotBarProps {
  slot: string[];
}

const SlotBar: React.FC<SlotBarProps> = ({ slot }) => {
  const maxSlots = 7;
  
  return (
    <div className="flex gap-2 justify-center items-center">
      {Array.from({ length: maxSlots }).map((_, index) => (
        <div
          key={index}
          className={`
          w-14 h-14 rounded-xl border-2 border-dashed flex items-center justify-center text-3xl
          ${slot[index] 
            ? 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-400 border-solid' 
            : 'bg-gray-100 border-gray-300'
          }
          transition-all duration-300
        `}
        >
          {slot[index] || ''}
        </div>
      ))}
    </div>
  );
};

export default SlotBar;
