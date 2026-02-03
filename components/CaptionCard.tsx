
import React, { useState, useEffect } from 'react';
import { CaptionVariation } from '../types';
import { boostEmojisWithAI } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface CaptionCardProps {
  variation: CaptionVariation;
  originalVariations?: CaptionVariation[];
  langTexts: { copy: string; copied: string };
  dir: string;
  fontClass: string;
  theme?: 'dark' | 'light';
  onReset?: () => void;
}

const CaptionCard: React.FC<CaptionCardProps> = ({ variation, originalVariations, langTexts, dir, fontClass, theme = 'dark', onReset }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<number, boolean>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [localVariations, setLocalVariations] = useState<CaptionVariation[]>(originalVariations || [variation]);

  useEffect(() => {
    if (originalVariations && originalVariations.length > 0) setLocalVariations(originalVariations);
    else setLocalVariations([variation]);
  }, [variation, originalVariations]);

  const isRTL = dir === 'rtl';
  const isDark = theme === 'dark';
  
  const labels = isRTL ? {
    all: "نسخ الجميع", reset: "ابدأ من جديد", edit: "تعديل", save: "حفظ", format: "تنسيق", boost: "إيموجي", strip: "مسح", suggestion: "المقتـرح رقم", boostingText: "جاري توزيع الرموز..."
  } : {
    all: "Copy All", reset: "Start Over", edit: "Edit", save: "Save", format: "Format", boost: "Emoji", strip: "Strip", suggestion: "Option", boostingText: "Distributing Emojis..."
  };

  const stars = Array.from({ length: 55 });
  const brandName = "DT-DESIGNS";

  const getFormattedText = (v: CaptionVariation) => `${v.headline}\n\n${v.body}\n\n${v.cta}\n\n${v.hashtags}`;

  const handleCopyAll = () => {
    const fullContent = localVariations.map((v, i) => `--- ${labels.suggestion} (${i + 1}) ---\n${getFormattedText(v)}`).join('\n\n');
    navigator.clipboard.writeText(fullContent);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (idx: number) => {
    navigator.clipboard.writeText(getFormattedText(localVariations[idx]));
    setCopiedStates(prev => ({ ...prev, [idx]: true }));
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [idx]: false })), 2000);
  };

  const handleUpdateField = (idx: number, field: keyof CaptionVariation, value: string) => {
    setLocalVariations(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const stripEmojis = () => {
    const regex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    setLocalVariations(prev => prev.map(v => ({
      ...v, headline: v.headline.replace(regex, ''), body: v.body.replace(regex, ''), cta: v.cta.replace(regex, '')
    })));
  };

  const boostEmojis = async () => {
    setIsBoosting(true);
    const boostedArray = await Promise.all(localVariations.map(v => boostEmojisWithAI(v, isRTL ? 'Arabic' : 'English')));
    setLocalVariations(boostedArray);
    setIsBoosting(false);
  };

  return (
    <div className="neon-revolving-wrapper">
      <div className={`neon-inner-surface glass-premium rounded-[3rem] p-8 md:p-12 flex flex-col h-full shadow-2xl relative overflow-hidden text-${isRTL ? 'right' : 'left'} ${fontClass}`}>
        
        {/* Prestige High-End Loader Overlay for Boosting */}
        <AnimatePresence>
          {isBoosting && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl overflow-hidden"
            >
              {/* Star Nebula Background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                {stars.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400, opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.2, 1, 0.2],
                      x: (Math.cos(i) * 350) + (Math.random() * 40),
                      y: (Math.sin(i) * 350) + (Math.random() * 40),
                    }}
                    transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                    className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_10px_#fff]"
                  />
                ))}
              </div>

              {/* Central Nucleus Architecture */}
              <div className="relative z-10 mb-8 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [0.95, 1.05, 0.95],
                    borderColor: ["rgba(253, 200, 48, 0.3)", "rgba(253, 200, 48, 0.8)", "rgba(253, 200, 48, 0.3)"]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    borderColor: { duration: 3, repeat: Infinity }
                  }}
                  className="w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center relative shadow-[0_0_40px_rgba(253,200,48,0.2)]"
                >
                  <motion.i 
                    animate={{ rotate: [-20, 20, -20], y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="fa-solid fa-wand-magic-sparkles text-3xl text-yellow-400 drop-shadow-[0_0_15px_#facc15]"
                  />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full">
                      <div className="w-1 h-1 rounded-full absolute top-0 left-1/2 bg-yellow-300" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* 3D Mastery Dashboard Text */}
              <div className="relative z-20 text-center flex flex-col items-center gap-4">
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xl md:text-2xl font-black italic tracking-wide text-white/90">
                  {labels.boostingText}
                </motion.span>

                <div className="relative flex items-center justify-center overflow-visible px-10 py-4">
                  <motion.h2 
                    className="font-black italic tracking-tighter uppercase whitespace-nowrap leading-none"
                    style={{ 
                      fontSize: 'min(10vw, 4rem)',
                      display: 'inline-block',
                      WebkitTextFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      textShadow: '1px 1px 0px #000, 3px 3px 0px #111, 5px 5px 25px rgba(0,0,0,0.8)',
                      backgroundImage: 'linear-gradient(90deg, #00D2FF, #9D50BB, #FDC830, #00D2FF)',
                      backgroundSize: '200% auto',
                    }}
                    animate={{ backgroundPosition: ['0% center', '200% center'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    {brandName}
                    <span className="inline-flex gap-1.5 ml-3">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.3 }}
                          className="inline-block text-3xl md:text-5xl text-yellow-400"
                        >
                          .
                        </motion.span>
                      ))}
                    </span>
                  </motion.h2>

                  {/* Brilliance Scanner Effect */}
                  <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-full">
                    <motion.div
                      animate={{ x: ['-150%', '150%'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-40 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[50px] mix-blend-overlay"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-row flex-nowrap items-center gap-2 w-full justify-start overflow-x-auto no-scrollbar mb-10 pb-4">
          <button onClick={() => setIsEditing(!isEditing)} className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2.5 h-10 rounded-xl text-[10px] font-black transition-all ${isEditing ? 'bg-yellow-500 text-slate-900' : 'bg-cyan-900/20 text-cyan-400 border border-cyan-800/30 hover:bg-cyan-900/40'}`}>
            <i className={`fa-solid ${isEditing ? 'fa-check' : 'fa-pen-to-square'}`}></i><span>{isEditing ? labels.save : labels.edit}</span>
          </button>
          <button onClick={boostEmojis} className="whitespace-nowrap flex items-center gap-1.5 px-4 py-2.5 h-10 rounded-xl text-[10px] font-black bg-cyan-900/20 text-cyan-400 border border-cyan-800/30 hover:bg-cyan-900/40 transition-all">
            <i className="fa-solid fa-wand-magic-sparkles"></i><span>{labels.boost}</span>
          </button>
          <button onClick={stripEmojis} className="whitespace-nowrap flex items-center gap-1.5 px-4 py-2.5 h-10 rounded-xl text-[10px] font-black bg-cyan-900/20 text-cyan-400 border border-cyan-800/30 hover:bg-cyan-900/40 transition-all">
            <i className="fa-solid fa-face-meh-blank"></i><span>{labels.strip}</span>
          </button>
          <div className="h-6 w-[2px] bg-white/10 mx-1 shrink-0"></div>
          <button onClick={handleCopyAll} className={`whitespace-nowrap text-[10px] px-5 py-2.5 h-10 rounded-xl font-black flex items-center gap-2 transition-all ${copiedAll ? 'bg-green-600 shadow-inner' : 'bg-cyan-900/50 border-2 border-cyan-400 text-white shadow-lg'}`}>
            <i className="fa-solid fa-layer-group"></i><span>{labels.all}</span>
          </button>
          <button onClick={onReset} className="whitespace-nowrap text-[10px] px-5 py-2.5 h-10 rounded-xl font-black flex items-center gap-2 bg-slate-800/40 text-white border-2 border-white/10 shrink-0 hover:bg-slate-700 transition-all">
            <i className="fa-solid fa-rotate-right"></i><span>{labels.reset}</span>
          </button>
        </div>

        <div className="space-y-16 flex-grow pb-8">
          {localVariations.map((v, idx) => (
            <div key={idx} className="relative group">
              <div className="flex justify-between items-center mb-6">
                <motion.h4 
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-xl md:text-2xl font-black text-white italic"
                >
                  {labels.suggestion} ({idx + 1})
                </motion.h4>
                {!isEditing && (
                  <button onClick={() => handleCopySingle(idx)} className={`text-[10px] px-4 py-2 rounded-xl font-black transition-all ${copiedStates[idx] ? 'bg-green-600' : 'bg-white/10'} text-white`}>
                    {copiedStates[idx] ? langTexts.copied : langTexts.copy}
                  </button>
                )}
              </div>
              
              <div className="h-[2px] w-full gold-gradient shadow-[0_0_12px_rgba(212,175,55,0.7)] rounded-full mb-8" />
              
              <div className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <input 
                      className="w-full bg-cyan-900/10 border border-cyan-400/30 rounded-lg p-2 text-xl md:text-2xl font-black text-cyan-400 outline-none focus:border-cyan-400 transition-all"
                      value={v.headline}
                      onChange={(e) => handleUpdateField(idx, 'headline', e.target.value)}
                    />
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm md:text-base font-bold opacity-90 leading-relaxed outline-none focus:border-cyan-400 transition-all min-h-[120px] resize-none"
                      value={v.body}
                      onChange={(e) => handleUpdateField(idx, 'body', e.target.value)}
                    />
                    <div className="flex flex-col gap-2">
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 font-black text-base gold-text outline-none focus:border-gold-premium transition-all"
                        value={v.cta}
                        onChange={(e) => handleUpdateField(idx, 'cta', e.target.value)}
                      />
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-[10px] font-bold opacity-50 outline-none focus:border-cyan-400 transition-all"
                        value={v.hashtags}
                        onChange={(e) => handleUpdateField(idx, 'hashtags', e.target.value)}
                        placeholder="#hashtags"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-xl md:text-2xl font-black text-cyan-400 leading-tight">{v.headline}</div>
                    <div className="text-sm md:text-base font-bold opacity-90 leading-relaxed whitespace-pre-wrap">{v.body}</div>
                    <div className="flex flex-col gap-4 items-start">
                      <div className="font-black text-base gold-text p-4 bg-white/5 rounded-xl border border-white/10 inline-block shadow-lg">{v.cta}</div>
                      <div className="text-[10px] font-bold opacity-40 tracking-wider">{v.hashtags}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        h2 {
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default CaptionCard;
