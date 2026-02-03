import React, { useState, useEffect, useMemo } from 'react';
import { LanguageCode, DialectCode } from '../types';
import { TIPS_DICTIONARY } from '../App';

interface TickerProps {
  onClick: () => void;
  theme?: 'dark' | 'light';
  lang: LanguageCode;
  dialect: DialectCode;
}

const FIRST_VISIT_KEY = 'dt_designs_first_visit';
const MONETIZATION_THRESHOLD_DAYS = 15;

const SmartMarketingTicker: React.FC<TickerProps> = ({ onClick, theme = 'dark', lang, dialect }) => {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [daysActive, setDaysActive] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(FIRST_VISIT_KEY);
    const now = Date.now();
    let firstVisit: number;
    if (stored) { firstVisit = parseInt(stored); } else {
      firstVisit = now;
      localStorage.setItem(FIRST_VISIT_KEY, now.toString());
    }
    const diffTime = Math.abs(now - firstVisit);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysActive(diffDays);
  }, []);

  const isMonetizationPhase = daysActive >= MONETIZATION_THRESHOLD_DAYS;

  const localizedData = useMemo(() => {
    let salesPitch = "";
    let rawTips: string[] = [];

    const data = TIPS_DICTIONARY[lang] || TIPS_DICTIONARY.en;
    salesPitch = data.pitch;

    if (lang === 'ar') {
      const dKey = dialect || 'fusha';
      const dialectTips = data.dialects?.[dKey] || data.dialects?.['fusha'] || [];
      rawTips = dialectTips.map((t: any) => t.content);
    } else {
      rawTips = (data.tips || []).map((t: any) => t.content);
    }
    
    if (rawTips.length === 0 && lang !== 'en') {
      rawTips = TIPS_DICTIONARY.en.tips.map((t: any) => t.content);
    }

    return { salesPitch, rawTips };
  }, [lang, dialect]);

  const fullDisplayList = useMemo(() => {
    const { salesPitch, rawTips } = localizedData;
    let list: string[] = [salesPitch];
    if (isMonetizationPhase) {
      for (let i = 0; i < rawTips.length; i++) {
        list.push(rawTips[i]);
        if ((i + 1) % 5 === 0) list.push(salesPitch);
      }
    } else {
      list = [salesPitch, ...rawTips];
    }
    return list;
  }, [isMonetizationPhase, localizedData]);

  useEffect(() => {
    const intervalTime = (counter === 0 && !isMonetizationPhase) ? 5500 : 4000;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCounter((prev) => prev + 1);
        setIsVisible(true);
      }, 600); 
    }, intervalTime);
    return () => clearInterval(interval);
  }, [counter, isMonetizationPhase]);

  const currentIndex = counter % fullDisplayList.length;
  const currentText = fullDisplayList[currentIndex];
  const isPitch = currentText === localizedData.salesPitch;

  const openFacebookLink = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open("https://web.facebook.com/profile.php?id=61561721818324", "_blank", "noopener,noreferrer");
  };

  const renderFormattedText = (text: string) => {
    // Handling multiple variations of the name
    const regex = /(DT-Designs|DT-DESIGNS|DicelionTechnique)/gi;
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      const isBrand = regex.test(part);
      if (isBrand) {
        return (
          <span 
            key={i} 
            onClick={openFacebookLink}
            className="text-white hover:animate-pulse hover:brightness-150 transition-all duration-300 cursor-pointer underline decoration-yellow-400/30 underline-offset-4"
          >
            {part}
          </span>
        );
      }
      return (
        <span key={i} className={isPitch ? 'text-green-500' : ''}>
          {part}
        </span>
      );
    });
  };

  return (
    <div className="w-full animate-in fade-in duration-1000">
      <div 
        onClick={onClick}
        className={`cursor-pointer min-h-[70px] flex flex-col items-center justify-center px-4 py-3 rounded-2xl border transition-all duration-500 relative overflow-hidden group shadow-lg ${
          isPitch 
            ? 'bg-red-950/20 border-red-500/30' 
            : theme === 'dark' 
              ? 'bg-cyan-950/20 border-cyan-800/30 hover:border-cyan-400/50' 
              : 'bg-royal-blue/5 border-royal-blue/10 hover:border-royal-blue/30'
        }`}
      >
        {isPitch && <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>}
        
        <div className={`text-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${isPitch ? 'font-black' : theme === 'dark' ? 'text-white font-bold' : 'text-royal-blue font-bold'}`}>
          <span className={`text-xs md:text-sm flex items-center gap-3 justify-center leading-relaxed`}>
             {!isPitch && <i className={`fa-solid fa-lightbulb text-xs ${theme === 'dark' ? 'text-cyan-400' : 'text-royal-blue'}`}></i>}
             {renderFormattedText(currentText)}
          </span>
        </div>
        
        <div 
          key={counter} 
          className={`absolute bottom-0 left-0 h-[2px] transition-all ${isPitch ? 'bg-red-600' : theme === 'dark' ? 'bg-cyan-400' : 'bg-royal-blue'} ${isVisible ? 'w-full' : 'w-0'}`}
          style={{ 
            transition: isVisible 
              ? `width ${((counter === 0 && !isMonetizationPhase) ? 5500 : 4000)}ms linear` 
              : 'none' 
          }}
        ></div>
      </div>
    </div>
  );
};

export default SmartMarketingTicker;