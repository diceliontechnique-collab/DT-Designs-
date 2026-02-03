
import React from 'react';
import { motion } from 'framer-motion';

interface TitleBarProps {
  theme?: 'dark' | 'light';
  onExitRequest?: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ theme = 'dark', onExitRequest }) => {
  // Check if running in Electron environment or if it's forced for production UI consistency
  const isElectron = navigator.userAgent.toLowerCase().includes('electron') || (window as any).electronAPI;

  if (!isElectron) return null;

  const handleControl = (action: 'minimize' | 'maximize' | 'close') => {
    if (action === 'close' && onExitRequest) {
      onExitRequest();
      return;
    }
    if ((window as any).electronAPI) {
      (window as any).electronAPI.controlWindow(action);
    }
  };

  const buttonSpring = {
    type: "spring",
    stiffness: 500,
    damping: 15,
    mass: 0.8
  } as const;

  return (
    <div 
      className={`h-12 flex items-center justify-between px-6 sticky top-0 z-[200] select-none transition-all duration-500 glass-premium border-b-[1px] ${
        theme === 'dark' 
          ? 'bg-[#020617]/95 border-[#D4AF37]/40 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-white/95 border-[#D4AF37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
      } backdrop-blur-[60px]`}
      style={{ WebkitAppRegion: 'drag' } as any}
    >
      {/* Brand Section */}
      <div className="flex items-center gap-4" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <motion.div 
          animate={{ 
            boxShadow: ["0 0 5px #D4AF37", "0 0 25px #D4AF37", "0 0 5px #D4AF37"],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-[#D4AF37]"
        />
        <div className="flex flex-col">
          <span className={`text-[12px] font-black tracking-[0.3em] uppercase italic leading-none ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            DT-DESIGNS AI
          </span>
          <span className="text-[7px] font-black text-[#D4AF37] uppercase tracking-[0.5em] mt-1">
            Dicelion Engineering Standards
          </span>
        </div>
      </div>

      {/* Control Buttons Section */}
      <div className="flex items-center h-full gap-2" style={{ WebkitAppRegion: 'no-drag' } as any}>
        
        {/* Minimize Button */}
        <motion.button 
          whileHover={{ 
            backgroundColor: theme === 'dark' ? "rgba(14, 165, 233, 0.2)" : "rgba(14, 165, 233, 0.1)",
            boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
            color: "#0ea5e9",
            scale: 1.02
          }}
          whileTap={{ scale: 0.9 }}
          transition={buttonSpring}
          onClick={() => handleControl('minimize')}
          className={`w-12 h-9 flex items-center justify-center rounded-xl transition-all ${
            theme === 'dark' ? 'text-white/60' : 'text-slate-900/60'
          }`}
          title="Minimize"
        >
          <i className="fa-solid fa-minus text-[12px]"></i>
        </motion.button>

        {/* Maximize Button */}
        <motion.button 
          whileHover={{ 
            backgroundColor: theme === 'dark' ? "rgba(212, 175, 55, 0.2)" : "rgba(212, 175, 55, 0.1)",
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
            color: "#D4AF37",
            scale: 1.02
          }}
          whileTap={{ scale: 0.9 }}
          transition={buttonSpring}
          onClick={() => handleControl('maximize')}
          className={`w-12 h-9 flex items-center justify-center rounded-xl transition-all ${
            theme === 'dark' ? 'text-white/60' : 'text-slate-900/60'
          }`}
          title="Maximize"
        >
          <i className="fa-regular fa-square text-[11px]"></i>
        </motion.button>

        {/* Close Button */}
        <motion.button 
          whileHover={{ 
            backgroundColor: "rgba(239, 68, 68, 0.4)",
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)",
            color: "#ffffff",
            scale: 1.02
          }}
          whileTap={{ scale: 0.9 }}
          transition={buttonSpring}
          onClick={() => handleControl('close')}
          className={`w-12 h-9 flex items-center justify-center rounded-xl transition-all ${
            theme === 'dark' ? 'text-white/60' : 'text-slate-900/60'
          }`}
          title="Close"
        >
          <i className="fa-solid fa-xmark text-[14px]"></i>
        </motion.button>

      </div>
    </div>
  );
};

export default TitleBar;
