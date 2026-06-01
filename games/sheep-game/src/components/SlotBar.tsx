import React, { useEffect, useState } from 'react';

interface SlotBarProps {
  slot: string[];
}

const SlotBar: React.FC<SlotBarProps> = ({ slot }) => {
  const maxSlots = 7;
  const [prevLength, setPrevLength] = useState(0);
  const [newItemIndex, setNewItemIndex] = useState<number | null>(null);
  
  useEffect(() => {
    if (slot.length > prevLength) {
      setNewItemIndex(slot.length - 1);
      setTimeout(() => setNewItemIndex(null), 500);
    }
    setPrevLength(slot.length);
  }, [slot.length, prevLength]);
  
  return (
    <div className="flex gap-3 justify-center items-center p-4 bg-white/40 rounded-2xl backdrop-blur-sm">
      {Array.from({ length: maxSlots }).map((_, index) => (
        <div
          key={index}
          className={`
          w-14 h-14 rounded-2xl border-3 flex items-center justify-center text-3xl
          relative overflow-hidden
          ${slot[index] 
            ? 'bg-gradient-to-br from-pink-200 via-orange-100 to-yellow-200 border-pink-400 border-solid shadow-lg' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 border-dashed'
          }
          ${newItemIndex === index ? 'animate-pudding' : ''}
          transition-all duration-300
        `}
        >
          {/* 槽位光泽效果 */}
          {slot[index] && (
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl"></div>
          )}
          
          {/* 内容 */}
          <span className={`
            relative z-10
            ${newItemIndex === index ? 'scale-125' : ''}
            transition-transform duration-200
          `}>
            {slot[index] || ''}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SlotBar;
