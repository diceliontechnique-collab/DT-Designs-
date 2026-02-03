
import React from 'react';
import { motion } from 'framer-motion';

interface HighEndLoaderProps {
  theme: 'dark' | 'light';
  text: string;
}

const HighEndLoader: React.FC<HighEndLoaderProps> = ({ theme, text }) => {
  const isDark = theme === 'dark';

  // High-density "Intelligent Stars" (50+ stars)
  const stars = Array.from({ length: 55 });

  const brandName = "DT-DESIGNS";
  const prefixText = "جاري إنشاء الإعلان الاحترافي بلمسة";

  return (
    <div className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-visible transition-all duration-1000 bg-transparent select-none">
      
      {/* 1. Star Nebula & Atmosphere (No Rectangles) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {stars.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: (Math.random() - 0.5) * 400, 
              y: (Math.random() - 0.5) * 400,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.2, 1, 0.2],
              x: (Math.cos(i) * 350) + (Math.random() * 40),
              y: (Math.sin(i) * 350) + (Math.random() * 40),
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 8 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.1
            }}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-white shadow-[0_0_10px_#fff]' : 'bg-cyan-500 shadow-[0_0_8px_#3b82f6]'}`}
          />
        ))}

        {/* Floating Atmosphere (Transparent) */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className={`absolute inset-0 blur-[150px] rounded-full ${isDark ? 'bg-cyan-900/30' : 'bg-cyan-200/20'}`}
        />
      </div>

      {/* 2. Central Magic Nucleus (Wand & Hollow Ring) */}
      <div className="relative z-10 mb-12 flex items-center justify-center">
        {/* Hollow Glowing Ring (No Fill) */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [0.95, 1.05, 0.95],
            borderColor: isDark 
              ? ["rgba(253, 200, 48, 0.3)", "rgba(253, 200, 48, 0.8)", "rgba(253, 200, 48, 0.3)"]
              : ["rgba(14, 165, 233, 0.3)", "rgba(14, 165, 233, 0.7)", "rgba(14, 165, 233, 0.3)"]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            borderColor: { duration: 3, repeat: Infinity }
          }}
          className="w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center relative shadow-[0_0_40px_rgba(253,200,48,0.2)]"
        >
          {/* Magic Wand (Background Logic) */}
          <motion.i 
            animate={{ 
              rotate: [-20, 20, -20],
              y: [-5, 5, -5]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`fa-solid fa-wand-magic-sparkles text-3xl z-0 ${isDark ? 'text-yellow-400 drop-shadow-[0_0_15px_#facc15]' : 'text-blue-600'}`}
          />

          {/* Orbiting Tiny Sparks */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full"
            >
              <div className={`w-1 h-1 rounded-full absolute top-0 left-1/2 ${isDark ? 'bg-yellow-300' : 'bg-cyan-500'}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 3. The 3D Mastery Dashboard */}
      <div className="relative z-20 text-center flex flex-col items-center gap-4 overflow-visible max-w-full">
        
        {/* Strictly Scaled Prefix (Reduced for Structure) */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-lg md:text-2xl font-black italic tracking-wide transition-all duration-700 ${
            isDark ? 'text-white/80' : 'text-slate-900'
          }`}
        >
          {prefixText}
        </motion.span>

        {/* DT-DESIGNS Branding: 3D Metallic Core */}
        <div className="relative flex items-center justify-center overflow-visible px-14 py-6">
          <motion.h2 
            className="font-black italic tracking-tighter uppercase whitespace-nowrap overflow-visible leading-none"
            style={{ 
              fontSize: 'min(14vw, 5.5rem)',
              display: 'inline-block',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              // 3D Physical Depth Engineering
              textShadow: isDark 
                ? '1px 1px 0px #000, 3px 3px 0px #111, 5px 5px 25px rgba(0,0,0,0.8)'
                : '1px 1px 0px #fff, 2px 2px 0px rgba(0,0,0,0.05), 4px 4px 10px rgba(0,0,0,0.15)',
              // High-End Metallic Gradient
              backgroundImage: 'linear-gradient(90deg, #00D2FF, #9D50BB, #FDC830, #00D2FF)',
              backgroundSize: '200% auto',
              paddingRight: '3rem', // S Protection
              WebkitTextStroke: isDark ? '0px' : '0.4px rgba(0,0,0,0.7)',
            }}
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {brandName}
            
            {/* Thinking Breathing Points */}
            <span className="inline-flex gap-1.5 ml-3">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.3 }}
                  className={`inline-block text-4xl md:text-6xl ${isDark ? 'text-yellow-400' : 'text-slate-950'}`}
                >
                  .
                </motion.span>
              ))}
            </span>
          </motion.h2>

          {/* Internal Brilliance Scanner (No external box) */}
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-[2rem]">
             <motion.div
               animate={{ x: ['-150%', '150%'] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="w-40 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[50px] mix-blend-overlay"
             />
          </div>
        </div>

        {/* Reflection Horizon */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1], width: ["30%", "85%", "30%"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`mt-8 h-[1px] blur-[8px] mx-auto rounded-full ${isDark ? 'bg-cyan-400 shadow-[0_0_20px_#00D2FF]' : 'bg-slate-900/10'}`}
        />
      </div>

      {/* 4. Engineering Heritage Footer (Transparent Architecture) */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center opacity-30 pointer-events-none">
        <motion.div 
           animate={{ width: [30, 150, 30] }}
           transition={{ duration: 8, repeat: Infinity }}
           className={`h-[1px] mb-4 ${isDark ? 'bg-yellow-500/30' : 'bg-slate-950/30'}`}
        />
        <span className={`text-[10px] md:text-[12px] font-black tracking-[1em] uppercase text-center ${isDark ? 'text-yellow-500/80' : 'text-slate-950/80'}`}>
          DICELION ENGINEERING STANDARDS
        </span>
        <span className={`text-[9px] font-black mt-2 tracking-[0.4em] uppercase ${isDark ? 'text-white/20' : 'text-slate-950/30'}`}>
          PRO-STABLE STACK | © 2001 - 2026
        </span>
      </div>

      <style>{`
        /* Global CSS Enforcement: Zero-Box Artifact Purge */
        h2 {
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          white-space: nowrap !important;
          background-color: transparent !important;
          border: none !important;
        }
        .bg-transparent {
           background-color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default HighEndLoader;
