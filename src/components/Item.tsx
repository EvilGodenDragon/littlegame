import React from 'react';
import { Item as ItemType } from '@/types/game';

interface ItemProps {
  item: ItemType;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  if (item.isCollected) return null;

  return (
    <div
      className="absolute animate-bounce"
      style={{
        left: item.x - 15,
        top: item.y - 15,
        zIndex: 50,
      }}
    >
      <div className="w-8 h-8 flex items-center justify-center text-2xl bg-white/80 rounded-full shadow-md animate-pulse">
        {item.emoji}
      </div>
    </div>
  );
};

export default Item;
