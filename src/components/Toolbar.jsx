import React from 'react';

export function Toolbar({ onRun, isCompiling, isInitialized }) {
  return (
    <div className="mb-4 flex gap-2 items-center">
      <button
        onClick={onRun}
        disabled={isCompiling || !isInitialized}
        className={`
          px-4 py-2 rounded-md font-semibold text-white
          ${!isInitialized
            ? 'bg-gray-600 cursor-not-allowed'
            : isCompiling
            ? 'bg-yellow-600 cursor-wait'
            : 'bg-green-600 hover:bg-green-700'}
        `}
      >
        {!isInitialized 
          ? 'Initializing...' 
          : isCompiling 
          ? 'Compiling...' 
          : 'Run'}
      </button>
      {!isInitialized && (
        <span className="text-yellow-500 text-sm">
          Setting up C++ compiler...
        </span>
      )}
    </div>
  );
}