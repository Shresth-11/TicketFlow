import React, { useState, useEffect } from 'react';
import { LifeBuoy } from 'lucide-react';

export const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setFadeOut(true), 200);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#fbf7ee] flex items-center justify-center p-4 transition-opacity duration-500 selection:bg-red-500 selection:text-white ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Macintosh Shell Boot Monitor Box matching heyparker.ai */}
      <div className="w-full max-w-sm bg-[#eae3d2] border-3 border-black rounded-3xl p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center space-y-5">
        
        {/* Screen Display */}
        <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-inner space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white mx-auto shadow-sm animate-pulse">
            <LifeBuoy className="w-7 h-7 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-red-600 tracking-tight">
              ResolvIT
            </h2>
            <p className="text-[11px] font-mono font-bold text-slate-700 mt-1 uppercase tracking-widest">
              Service Desk OS v2.6
            </p>
          </div>

          {/* Retro Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="w-full bg-[#f1ebd9] border-2 border-black rounded-full h-3.5 p-0.5 overflow-hidden">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-800">
              <span>INITIALIZING...</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>

        {/* Disk Drive Slot */}
        <div className="w-32 h-3 bg-[#dcd4c0] border-2 border-black rounded-sm mx-auto flex items-center justify-center shadow-inner">
          <div className="w-8 h-1 bg-black rounded-full" />
        </div>

      </div>
    </div>
  );
};
