import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Sparkles, FileText, Bot } from 'lucide-react';

const SlashCommandList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = index => {
    const item = props.items[index];

    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  if (!props.items.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden w-64">
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
        AI Commands
      </div>
      <div className="py-1">
        {props.items.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors ${
                isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              key={index}
              onClick={() => selectItem(index)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className={`p-1.5 rounded-md ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{item.title}</span>
                {item.description && (
                  <span className="text-xs text-gray-500 line-clamp-1">{item.description}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

SlashCommandList.displayName = 'SlashCommandList';

export default SlashCommandList;
