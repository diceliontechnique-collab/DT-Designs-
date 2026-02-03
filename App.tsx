
import React, { useState, useEffect, useMemo } from 'react';
import { Industry, GenerationResult, LanguageCode, DialectCode, EmojiLevel, CaptionVariation } from './types';
import { generateCaptions } from './services/geminiService';
import { i18nData, getTranslation, LANGUAGES_LIST } from './services/i18n';
import CaptionCard from './components/CaptionCard';
import SmartMarketingTicker from './components/SmartMarketingTicker';
import TitleBar from './components/TitleBar';
import HighEndLoader from './components/HighEndLoader';
import { motion, AnimatePresence } from 'framer-motion';

const NEW_100_TIPS = [
  "الثواني الثلاث الأولى هي \"عتبة الرزق\" في إعلانك؛ إما أن تفتح الباب أو تغلقه للأبد.",
  "فيديو الـ 30 ثانية هو \"الخاطف\"؛ يسرق انتباه الزبون وسط زحام المناشورات المملة.",
  "العقل البشري يعالج المشاهد أسرع بـ 60 ألف مرة من نصوص الإعلانات التقليدية.",
  "فيديو الـ 60 ثانية يبني جسر الثقة؛ هو المسافة بين \"مجرد مشاهد\" و\"زبون محتمل\".",
  "الـ 120 ثانية (دقيقتان) هي \"الهيبة\"؛ الشركات التي تحترم قيمتها تمنح وقتها للجمهور.",
  "الإعلان الناجح لا يبيع المنتج, بل يبيع \"النسخة الأفضل\" من حياة الزبون بعد الشراء.",
  "الغموض في أول 5 ثوانٍ يفرز الدوبامين؛ اجعلهم يتساءلون \"ماذا سيحدث بعد؟\".",
  "الحصرية هي العملة الصعبة؛ فيديو لم يره أحد من قبل يعطي لسلعتك قيمة الذهب.",
  "الـ 30 ثانية للانتشار، والـ 120 ثانية للإقناع؛ من يملك الاثنين يملك السوق.",
  "البراند الذي لا يتحرك في فيديو، هو براند \"جامد\" في ذاكرة المستهلك.",
  "دقيقتان من الإخراج السينمائي تلغي اعتراض الزبون على \"الثمن المرتفع\".",
  "ثقة الزبون تزيد بنسبة 80% عندما يرى تفاصيل السلعة تتحرك بجودة عالية.",
  "اللون الذهبي المتوهج في فيديوهاتنا ليس مجرد زينة، بل هو رسالة فخامة لعقل الزبون.",
  "الصورة الثابتة تخبر، لكن الفيديو الإشهاري \"يُقنع\" دون أن ينطق بكلمة بيع واحدة.",
  "فيديو الـ 60 ثانية هو \"الحل الوسط\" المثالي لشرح قصة نجاح منتجك.",
  "\"الهزة\" التسويقية الحقيقية هي حين يرى الزبون إعلاناً يشبه أفلام هوليوود لمنتج محلي.",
  "الفيديوهات الطويلة (120 ثانية) هي \"الفلتر\" الذي يجذب الزبائن الكبار (VIP) فقط.",
  "استثمر في \"العين\" قبل \"الجيب\"؛ من انبهر بصرياً، دفع مادياً بكل سرور.",
  "في 2026، من لا يملك فيديو احترافياً فهو ببساطة غير موجود في المنافسة.",
  "لا تكن \"نسخة\"؛ الإعلانات المكررة تقتل الرغبة، والفيديو الحصري يحييها.",
  "إعلان دقيقتين هو \"الاستثمار الذكي\" الذي يحول علامتك التجارية إلى \"إمبراطورية\".",
  "الموسيقى والمشاهد في الفيديو هي \"رائحة\" البراند التي تلتصق بذاكرة المشاهد.",
  "التسويق هو جعل \"النادر\" يبدو متاحاً فقط لمن يتحرك الآن؛ الفيديو يجسد هذا الاستعجال.",
  "اجعل إعلانك \"هدية بصرية\"؛ الناس يهربون من الباعة, لكنهم يركضون خلف الجمال.",
  "القاعدة الملكية: إذا كانت سلعتك فخمة، فالفيديو العادي \"إهانة\" لها.",
  "الصوت المحيطي في فيديو إعلاني يخلق حالة من \"التنويم\" تجعل الزبون ينسى المنافسين.",
  "دقيقة واحدة من الفيديو تعادل تأثير 1.8 مليون كلمة؛ اختر الطريق المختصر للربح.",
  "الزبون يثق في \"المعلم\"؛ والفيديو التوضيحي يظهرك كخبير أول في مجالك.",
  "لمسات النيون والذهب في الإخراج تجذب أصحاب القدرة الشرائية العالية.",
  "الـ 30 ثانية في \"الستوري\" هي أسرع طريق لفتح المحافظ الموصدة.",
  "الفيديو يخاطب الحواس؛ وعندما تعمل الحواس، يتوقف العقل عن التفكير في \"المفاصلة\".",
  "\"أرني ولا تخبرني\"؛ فيديو واحد يغنيك عن كتابة 100 منشور نصي ممل.",
  "القصص (Storytelling) تزيد المبيعات بـ 400%؛ والقصة تحتاج مساحة فيديو (60-120 ثانية).",
  "الفيديو الحصري يضعك في \"جزيرة\" وحدك، بعيداً عن صراعات الأسعار مع المنافسين.",
  "الفيديو هو المحتوى الأكثر \"مشاركة\"؛ اجعل إعلانك يسوق لنفسه بجماله.",
  "الوضوح البصري يقلل \"خوف الشراء\"؛ الزبون يشتري ما يراه بوضوح تام.",
  "فيديو الـ 120 ثانية يجعل الزبون يشعر بـ \"الألفة\"؛ وكأنك صديقه القديم.",
  "الألوان المشبعة في الإخراج تسرع نبضات القلب وتدفع لقرار الشراء العاطفي.",
  "الفيديو هو السفير الذي يبيع لك وأنت نائم، بدقة لا تعرف الخطأ.",
  "الإخراج السينمائي هو \"الواجهة\"؛ واجهة فخمة تعني منتجاً لا يُقدّر بثمن.",
  "الزبون يقدر \"التعب\"؛ فيديو مخدوم باحترافية يعني أنك تحترم زبائنك.",
  "استخدم الـ 30 ثانية لزرع الفضول، والـ 120 ثانية لحصاد الأرباح.",
  "\"الإيقاع\" هو سر الفيديو الناجح؛ اجعل إعلانك رقصة بصرية تجذب العيون.",
  "الإعلان الذي لا يُمل هو الذي يمزج الفن بالبيع؛ كأنه لوحة فنية متحركة.",
  "الفيديو يعطي لمنتجك \"هيبة\"؛ والهيبة هي ما تمنع الزبون من طلب الخصم.",
  "التسويق هو فن الاستحواذ على الأذهان؛ والفيديو هو أقوى أسلحتك.",
  "فيديو واحد \"خرافي\" خير من ألف منشور عادي يمر عليه الناس مرور الكرام.",
  "الانتقالات السلسة (Transitions) تعطي انطباعاً بأن شركتك منظمة ودقيقة جداً.",
  "الزبون الذكي يبحث عن \"الهمزة\"؛ والهمزة الحقيقية هي التميز بلمسة DT-DESIGNS.",
  "المنافسون يتكلمون، وأنت \"تُبهر\"؛ والابهار دائماً ما يربح في النهاية.",
  "كوكا كولا تبيع \"اللحظة\" في فيديو، وتترك السكر والماء للآخرين.",
  "آبل تبيع \"التمرد والذكاء\" في إعلان سينمائي، وتترك الأسلاك للمنافسين.",
  "فيسبوك ويوتيوب يروجان لأنفسهما بالفيديو؛ فهل أنت أكبر منهما؟.",
  "\"التوقف عن الإعلان لتوفير المال كالتوقف عن الساعة لتوفير الوقت\".",
  "ستوريات المشاهير ناجحة لأنها \"فيديو\"؛ اجعل ستوري مشروعك بنفس القوة.",
  "الرد السريع على التعليقات في فيديو إعلاني يرفع الثقة بنسبة 80%.",
  "الاستمرارية هي الوقود؛ فيديو واحد يومياً يبقيك حياً في ذاكرة السوق.",
  "جودة الفيديو هي \"المؤهل العلمي\" لشركتك في نظر الغرباء.",
  "عرض \"آخر قطعة\" في فيديو 30 ثانية يخلق حالة استنفار للشراء.",
  "الفيديو هو الشريان التاجي؛ إذا توقف، توقفت مبيعاتك تدريجياً.",
  "ذكاء المحتوى يتفوق على كثرة المحتوى؛ فيديو واحد ذكي يغني عن مئة منشور.",
  "الناس تصدق ما تراه يتحرك؛ الحركة هي الدليل القاطع على الجودة.",
  "الإقناع البصري يوفر عليك ساعات من الشرح الصوتي المجهد.",
  "الفيديو التعليمي هو \"فخ\" بيعي ذكي؛ تمنحهم معلومة وتأخذ منهم ولاءً.",
  "استهدف العاطفة في الـ 120 ثانية؛ العاطفة هي من تفتح المحافظ.",
  "لا تبيع \"الحديد\"، بع \"الأمان\"؛ والفيديو هو من يجسد الأمان.",
  "\"الترند\" هو موجة؛ اركبها بفيديو احترافي لتصل لقمة السوق بسرعة.",
  "التفرد هو القوة؛ فيديو مخصص من AI متطور يجعلك سابقاً لزمانك.",
  "التجديد يقتل الملل؛ غير زوايا تصوير فيديو منتجك كل أسبوع.",
  "الزبون يشتري بقلبه أولاً؛ والفيديو هو أقوى طريق للقلب.",
  "الإعلان المثالي هو الذي يرى فيه الزبون نفسه \"بطلاً\" للقصة.",
  "قوة العلامة تظهر في \"فخامة\" ظهورها البصري المستمر.",
  "الفيديو يحول مشروعك من \"محل في حي\" إلى \"براند عالمي\".",
  "دقيقتان من الإبداع تمر كأنها لمح بصر إذا كان الإخراج متقناً.",
  "هندسة الأوامر (Prompts) هي عقل الفيديو؛ استثمر في العقل لتجني المال.",
  "الإضاءة هي \"روح\" الفيديو؛ بدون روح، الإعلان ميت.",
  "الإيقاع الموسيقي يحدد سرعة قرار الشراء؛ اجعله حماسياً ومنظماً.",
  "النصوص التوضيحية داخل الفيديو هي \"صيد\" لمن يشاهد بصمت.",
  "الـ CTA الواضح في نهاية فيديو 30 ثانية هو \"الضربة القاضية\" للبيع.",
  "التوازن بين الضحكة والمعلومة يجعل إعلانك \"معدياً\" ينتشر بسرعة.",
  "اللهجة المحلية في الفيديو تكسر الجليد وتحسس الزبون أنك \"واحد منه\".",
  "الفيديو العمودي هو \"سلطان\" العصر؛ صمم خصيصاً للهواتف لتسود.",
  "شعارك في الفيديو يجب أن يظهر كـ \"توقيع فنان\" وليس كـ \"ختم ضريبة\".",
  "شهادات الزبائن بالفيديو هي \"المحامي\" الذي يربح لك كل قضايا الشك.",
  "السرعة في التنفيذ مع DT-DESIGNS AI هي ميزتك التنافسية الحصرية.",
  "الفيديو التفاعلي يحول الزبون من \"متفرج\" إلى \"شريك\" في البراند.",
  "البث المباشر هو \"الاختبار الحقيقي\" لشجاعة وقوة علامتك التجارية.",
  "الدقة العالية (HD) هي الحد الأدنى للاحترام؛ لا تقدم أقل من ذلك.",
  "الذكاء الاصطناعي في المونتاج هو \"السحر\" الذي يختصر لك العمر.",
  "\"قبل وبعد\" بالفيديو هو أقوى برهان على أن منتجك \"يستحق\".",
  "الإعلان الذي لا يلمس المشاعر هو مجرد ضجيج في الرأس.",
  "الصدق يظهر في العين؛ اجعل فيديوهاتك صادقة لتربح للأبد.",
  "الرموز التعبيرية (Emojis) في نصوص الفيديو تزيد من \"آدمية\" البراند.",
  "المقترحات الذكية من تطبيقنا هي \"بوصلتك\" نحو إعلان عالمي.",
  "التسويق هو فن الاستحواذ على الأذهان؛ والفيديو هو أقوى أسلحتك.",
  "كن \"مرجعاً\" في مجالك عبر فيديوهات قصيرة مفيدة ومبهرة.",
  "لمسة DT-DESIGNS الحصرية هي ما يفرق بين \"التاجر\" و\"المبدع\".",
  "الإعلان هو \"نبض القلب\"؛ إذا توقف النبض، ماتت التجارة."
];

const MARKETING_GUIDELINES_EN = [
  "The first 3 seconds of your ad decide if the customer stays or scrolls away.",
  "Video content captures attention 5x more than static images on social media.",
  "Consistency in posting builds trust and keeps your brand top-of-mind.",
  "A clear and compelling Call-To-Action (CTA) is essential for every post.",
  "Use high-quality visuals to reflect the premium nature of your products.",
  "Tell a story rather than just listing features; emotions drive purchases.",
  "Respond to comments quickly to boost engagement and show you care.",
  "Use local dialects or culture-specific references to connect with your audience.",
  "Test different types of content (stills, videos, carousels) to see what works best.",
  "Keep your message simple and focused on solving a specific customer problem.",
  "Exclusivity and urgency ('limited time offer') trigger faster buying decisions.",
  "User-generated content and testimonials are powerful trust-building tools.",
  "Focus on the benefits (how it helps) rather than just technical specifications.",
  "Optimize your captions for mobile reading; use short paragraphs and emojis.",
  "Strong headlines should hook the reader's interest in under 2 seconds.",
  "Visual hierarchy: make sure the most important information stands out first.",
  "Authenticity wins; showing the 'behind the scenes' makes your brand human.",
  "Data doesn't lie; check your social media analytics weekly to refine your strategy.",
  "Partnering with micro-influencers can be more effective than big celebrities.",
  "Your brand identity (colors, tone, logo) should be consistent across all platforms."
];

export const TIPS_DICTIONARY: any = {
  ar: {
    pitch: "ارفع مبيعاتك مع DT-Designs - اتصل بنا الآن لطلب تصميمات احترافية!",
    dialects: {
      moroccan: NEW_100_TIPS.map(t => ({ content: t })),
      palestinian: NEW_100_TIPS.map(t => ({ content: t })),
      egyptian: NEW_100_TIPS.map(t => ({ content: t })),
      gulf: NEW_100_TIPS.map(t => ({ content: t })),
      algerian: NEW_100_TIPS.map(t => ({ content: t })),
      tunisian: NEW_100_TIPS.map(t => ({ content: t })),
      libyan: NEW_100_TIPS.map(t => ({ content: t })),
      yemeni: NEW_100_TIPS.map(t => ({ content: t })),
      iraqi: NEW_100_TIPS.map(t => ({ content: t })),
      levantine: NEW_100_TIPS.map(t => ({ content: t })),
      fusha: NEW_100_TIPS.map(t => ({ content: t }))
    }
  },
  en: {
    pitch: "Boost your sales with DT-Designs - Professional designs!",
    tips: MARKETING_GUIDELINES_EN.map(t => ({ content: t }))
  }
};

const domainTranslations: Record<string, any> = {
  ar: {
    ma: [
      { group: "🔘 خيارات عامة", items: ["عام / تجاري (لكل المشاريع)"] },
      { group: "📱 Tech & Mobile (Priority)", items: ["بيع وإصلاح الهواتف", "إصلاح الهواتف (Hardware/Software)", "بيع الهواتف واكسيسواراتها", "بيع معدات الصيانة", "خدمات السيرفر", "بيع الحواسيب والجيمنج"] },
      { group: "💈 خدمات الرجال والحلاقة", items: ["حلاقة الرجال", "خياطة عصرية وتقليدية", "مواد التجميل والمكياج", "تنكافت ومستلزمات الأعراس", "طبخ منزلي وحلويات", "ملابس النساء", "إكسيسوارات ومجوهرات", "ديكور منزلي وتأثيث"] },
      { group: "🛍️ Retail & Trade", items: ["تجارة الجملة", "البيع بالتقسيط", "بيع السلع المستعملة", "تصفية السلع", "الملابس الرجالية", "الأحذية والحقائب", "مواد التنظيف"] },
      { group: "🛠️ Trades & Crafts", items: ["ميكانيك السيارات", "بناء وتشطيبات", "حدادة وتلحيم", "نجارة وألومنيوم", "سباكة وترصيص", "كهرباء منزلية", "صباغة وتزيين", "إصلاح الأجهزة المنزلية"] },
      { group: "🚜 Agriculture & Food", items: ["فلاحة ومواشي", "خضار وفواكه", "جزارة ولحوم", "مخبزة وباتيسري", "مطعم وسناك"] },
      { group: "⚖️ Professional Services", items: ["محاماة", "عيادات طبية", "ترويض طبي", "محاسبة", "عقارات", "تعليم ودعم", "نقل بوجاج", "كراء السيارات", "سياحة", "طباعة وإشهار", "تصوير فوتوغرافي", "غسل السيارات", "تنظيم الحفلات", "وكالات تأمين", "مكاتب الدراسات"] }
    ]
  },
  en: {
    ma: [
      { group: "🔘 General Options", items: ["General / Commercial (All Projects)"] },
      { group: "📱 Tech & Mobile", items: ["Mobile Sales & Repair", "Hardware/Software Repair", "Accessories", "Maintenance Tools", "Server Services", "Laptops & Gaming"] },
      { group: "💈 Personal Services", items: ["Barber Shop", "Modern Tailoring", "Cosmetics", "Wedding Supplies", "Home Cooking", "Women's Clothing", "Jewelry", "Home Decor"] }
    ]
  }
};

const dialects: Record<DialectCode, string> = { 
  moroccan: "🇲🇦 المغربية", 
  palestinian: "🇵🇸 الفلسطينية",
  egyptian: "🇪🇬 المصرية", 
  gulf: "🇸🇦 الخليجية", 
  algerian: "🇩🇿 الجزائرية",
  tunisian: "🇹🇳 التونسية",
  libyan: "🇱🇾 الليبية",
  yemeni: "🇾🇪 اليمنية",
  iraqi: "🇮🇶 العراقية", 
  levantine: "🇱🇧 الشامية", 
  fusha: "🏳️ العربية الفصحى" 
};

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  theme: 'dark' | 'light';
  isLarge?: boolean;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, children, theme, isLarge = false }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-300">
      <div className={`relative w-full ${isLarge ? 'max-w-5xl max-h-[92vh]' : 'max-w-xl'} glass-premium rounded-[3rem] p-6 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)] border flex flex-col ${theme === 'dark' ? 'border-yellow-500/30 text-white' : 'border-slate-300 text-slate-900'}`}>
        <div className="flex justify-between items-center mb-8 shrink-0">
          <h2 className="text-2xl md:text-3xl font-black gold-text-strong italic uppercase tracking-tighter text-shadow-3d heavy-glow-gold">{title}</h2>
          <button onClick={onClose} className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <div className="space-y-10 font-bold leading-relaxed opacity-95 overflow-y-auto pr-6 custom-scrollbar flex-grow text-start text-base md:text-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

const ExitSequenceOverlay: React.FC<{ theme: 'dark' | 'light'; text: {brand: string; prayer: string} }> = ({ theme, text }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if ((window as any).electronAPI) (window as any).electronAPI.controlWindow('close');
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence>
        <motion.div key="brand" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: [0, 1, 0], scale: [0.9, 1.1, 1] }} transition={{ duration: 1.5 }} className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-black italic gold-text-strong neon-text-pulsing">{text.brand}</h1>
        </motion.div>
        <motion.div key="prayer" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 2.5 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
          <p className="font-amiri text-3xl md:text-5xl gold-text-strong leading-relaxed drop-shadow-xl">{text.prayer}</p>
          <div className="w-32 h-[1px] gold-gradient mt-8" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<LanguageCode>('ar');
  const [dialect, setDialect] = useState<DialectCode>('moroccan');
  const [productName, setProductName] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('عام / تجاري (لكل المشاريع)');
  const [emojiLevel, setEmojiLevel] = useState<EmojiLevel>('balanced');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [showExitSequence, setShowExitSequence] = useState(false);
  const [showAboutApp, setShowAboutApp] = useState(false);
  const [showAboutDev, setShowAboutDev] = useState(false);
  const [showMarketingTips, setShowMarketingTips] = useState(false);

  // Dynamic Translation Hook
  const t = useMemo(() => getTranslation(lang, dialect), [lang, dialect]);
  const prestigeFontClass = t.dir === 'rtl' ? 'font-prestige-ar' : 'font-prestige-latin';

  const currentMarketingGuide = useMemo(() => {
    if (lang === 'ar') return NEW_100_TIPS;
    return MARKETING_GUIDELINES_EN;
  }, [lang]);

  const openFacebookLink = (url: string = "https://web.facebook.com/profile.php?id=61561721818324") => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.body.className = theme;
  }, [lang, theme, t.dir]);

  const handleGenerate = async () => {
    if (!productName.trim()) return;
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const data = await generateCaptions(productName, extraInfo, selectedIndustry, lang, lang, emojiLevel, dialect, dialects[dialect]);
    setResult(data);
    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setProductName('');
    setExtraInfo('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-700 ${prestigeFontClass} overflow-x-hidden`}>
      <AnimatePresence>{showExitSequence && <ExitSequenceOverlay theme={theme} text={t.exitSequence} />}</AnimatePresence>
      <TitleBar theme={theme} onExitRequest={() => setShowExitSequence(true)} />
      
      <header className={`py-6 px-6 border-b sticky top-8 z-50 glass-premium transition-all duration-500 ${theme === 'dark' ? 'border-cyan-900/40' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 onClick={() => openFacebookLink()} className="text-3xl font-black italic tracking-tighter cursor-pointer hover:scale-105 active:scale-95 transition-transform uppercase text-shadow-3d">
              <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>DT-DESIGNS</span> <span className="text-yellow-400">AI</span>
            </h1>
            <p className="font-bold text-[10px] md:text-xs mt-1 animate-blink-fade tracking-wide uppercase opacity-80">{t.header}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 p-1 glass-premium border-2 border-cyan-500/10 rounded-2xl overflow-hidden">
                <div className="flex items-center px-2 py-1 gap-1.5">
                  <i className="fa-solid fa-earth-americas text-[10px] text-cyan-400"></i>
                  <select value={lang} onChange={(e) => setLang(e.target.value as LanguageCode)} className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer">
                    {LANGUAGES_LIST.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                  </select>
                </div>
                {lang === 'ar' && (
                    <>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <div className="flex items-center px-2 py-1 gap-1.5">
                      <i className="fa-solid fa-flag text-[10px] text-yellow-400"></i>
                      <select value={dialect} onChange={(e) => setDialect(e.target.value as DialectCode)} className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer">
                          {Object.entries(dialects).map(([code, name]) => <option key={code} value={code as DialectCode}>{name}</option>)}
                      </select>
                    </div>
                    </>
                )}
            </div>
            <button onClick={() => setShowMarketingTips(true)} className="px-4 py-2 rounded-2xl glass-premium border-2 neon-input-premium text-[10px] font-black uppercase hover:border-yellow-400 transition-colors">{t.marketingTips}</button>
            <button onClick={() => setShowAboutApp(true)} className="px-4 py-2 rounded-2xl glass-premium border-2 neon-input-premium text-[10px] font-black uppercase hover:border-cyan-400 transition-colors">{t.aboutApp}</button>
            <button onClick={() => setShowAboutDev(true)} className="px-4 py-2 rounded-2xl glass-premium border-2 neon-input-premium text-[10px] font-black uppercase hover:border-yellow-400 transition-colors">{t.aboutDev}</button>
            <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} className="w-10 h-10 rounded-2xl glass-premium border-2 neon-input-premium flex items-center justify-center text-[14px]">
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* About App Modal */}
      <InfoModal isOpen={showAboutApp} onClose={() => setShowAboutApp(false)} title={t.aboutAppContent.title} theme={theme} isLarge={true}>
        <div className="space-y-12 text-start relative overflow-hidden">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 rounded-[4rem] glass-premium bg-gradient-to-br from-yellow-500/10 to-transparent border-2 border-yellow-500/20 shadow-2xl relative z-10">
            <p className="text-xl md:text-2xl leading-relaxed font-black">{t.aboutAppContent.intro}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="space-y-6">
              <h4 className="text-2xl md:text-3xl font-black gold-text-strong border-r-8 border-yellow-400 pr-5 italic heavy-glow-gold">{t.aboutAppContent.whyAdTitle}</h4>
              <p className="text-base opacity-95 leading-relaxed font-bold">{t.aboutAppContent.whyAdIntro}</p>
              <div className="space-y-4">
                {t.aboutAppContent.brands.map((brand, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 prestige-card-hover">
                    <span className="text-yellow-400 font-black block mb-2">{brand.name}:</span>
                    <p className="text-sm opacity-80 leading-relaxed">{brand.desc}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-6">
              <h4 className="text-2xl md:text-3xl font-black gold-text-strong border-r-8 border-cyan-400 pr-5 italic heavy-glow-cyan">{t.aboutAppContent.featuresTitle}</h4>
              <div className="grid grid-cols-1 gap-6">
                {t.aboutAppContent.features.map((item, i) => (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 prestige-card-hover">
                    <h5 className="font-black text-cyan-400 mb-2 text-lg">{item.title}</h5>
                    <p className="text-sm opacity-90 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
          <div className="p-8 rounded-[3rem] bg-gradient-to-r from-yellow-500/20 to-cyan-500/20 text-center border-2 border-white/10">
            <h4 className="text-2xl font-black gold-text-strong italic mb-4">{t.aboutAppContent.summaryTitle}</h4>
            <p className="text-base md:text-xl font-black opacity-95 leading-relaxed italic">{t.aboutAppContent.summaryText}</p>
          </div>
        </div>
      </InfoModal>

      {/* Enhanced About Developer Modal - Verbatim & Hexagon Grid */}
      <InfoModal isOpen={showAboutDev} onClose={() => setShowAboutDev(false)} title={t.aboutDevContent.title} theme={theme} isLarge={true}>
        <div className="space-y-12 text-start relative overflow-hidden">
          {/* Subtle Hexagon Backdrop Layers */}
          <div className="absolute top-0 left-0 opacity-[0.05] select-none pointer-events-none transform -rotate-12 -translate-x-20 -translate-y-20 z-0">
             <div className="hexagon-frame w-96 h-96 bg-cyan-400"></div>
          </div>
          <div className="absolute bottom-0 right-0 opacity-[0.05] select-none pointer-events-none transform rotate-12 translate-x-20 translate-y-20 z-0">
             <div className="hexagon-frame w-96 h-96 bg-yellow-400"></div>
          </div>

          {/* Heritage Banner */}
          <div className="flex flex-col items-center justify-center text-center pb-12 border-b-2 border-white/10 relative z-10">
             <motion.div 
               animate={{ rotateY: [0, 180, 360], scale: [1, 1.1, 1] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="hexagon-frame w-48 h-48 gold-gradient flex items-center justify-center text-7xl shadow-[0_0_60px_rgba(212,175,55,0.4)] border-4 border-white/30 mb-8"
             >
               <i className="fa-solid fa-code text-slate-900 heavy-glow-gold"></i>
             </motion.div>
             <h4 className="text-5xl md:text-7xl font-black italic gold-text-strong tracking-tighter uppercase text-shadow-3d heavy-glow-gold mb-2">DicelionTechnique</h4>
             <p className="text-xl md:text-2xl font-black opacity-80 tracking-[0.3em] uppercase">{t.aboutDevContent.heritage}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            {/* Core Narrative - Verbatim Arabic */}
            <div className="lg:col-span-7 space-y-10">
              <section className="space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="p-8 md:p-12 rounded-[4rem] glass-premium bg-gradient-to-br from-midnight-blue/40 to-royal-blue/20 border-r-8 border-yellow-500 shadow-3xl">
                  <p className="text-xl md:text-2xl leading-relaxed font-bold opacity-95 text-justify whitespace-pre-wrap">{t.aboutDevContent.narrative}</p>
                </motion.div>
              </section>

              {/* Ethical Values */}
              <section className="space-y-8 pt-10 border-t-2 border-white/5">
                <h5 className="text-3xl font-black gold-text-strong italic heavy-glow-gold">{t.aboutDevContent.valuesTitle}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {t.aboutDevContent.values.map((principle, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-8 rounded-[3rem] bg-white/5 border border-white/10 prestige-card-hover group">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-4 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                        <i className="fa-solid fa-check-double"></i>
                      </div>
                      <h6 className="text-2xl font-black text-white mb-2">{principle.title}</h6>
                      <p className="text-sm md:text-base opacity-80 leading-relaxed font-bold">{principle.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Expertise Hexagon Grid */}
            <div className="lg:col-span-5 space-y-12">
              <section className="space-y-8">
                <h5 className="text-3xl font-black gold-text-strong italic heavy-glow-gold">{t.aboutDevContent.expertiseTitle}</h5>
                <div className="grid grid-cols-1 gap-6">
                  {t.aboutDevContent.expertise.map((stat, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      transition={{ delay: i * 0.1 }} 
                      key={i} 
                      className={`flex gap-6 items-center p-6 rounded-[2.5rem] bg-white/5 border border-white/10 prestige-card-hover ${stat.title.includes('Google') ? 'expertise-glow-google border-blue-400/30' : ''}`}
                    >
                      <div className="hexagon-frame w-16 h-16 shrink-0 bg-gradient-to-br from-cyan-400 to-royal-blue flex items-center justify-center text-2xl text-black shadow-lg">
                        <i className={`fa-solid ${stat.title.includes('Google') ? 'fa-google' : 'fa-award'}`}></i>
                      </div>
                      <div>
                        <h6 className="text-lg md:text-xl font-black text-white mb-1 leading-tight">{stat.title}</h6>
                        <p className="text-xs md:text-sm opacity-70 leading-relaxed font-bold">{stat.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Cinematic Montage Notice */}
              <section className="p-8 rounded-[3rem] bg-gradient-to-r from-royal-blue/40 to-midnight-blue/40 border border-white/10">
                <h6 className="text-2xl font-black gold-text-strong italic mb-4">{t.aboutDevContent.montageTitle}</h6>
                <p className="text-lg opacity-90 leading-relaxed italic">{t.aboutDevContent.montageText}</p>
              </section>
            </div>
          </div>
          
          {/* Contact Hub Footer - Direct Identity Data */}
          <section className="pt-12 mt-12 border-t-2 border-white/10 relative z-10">
            <h5 className="text-3xl font-black gold-text-strong italic mb-10 text-center heavy-glow-gold">CONTACT IDENTITY</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div onClick={() => openFacebookLink(t.aboutDevContent.contacts.fbDt)} className="p-6 rounded-3xl bg-blue-900/10 border border-blue-500/20 flex items-center gap-5 cursor-pointer hover:bg-blue-600 hover:text-white transition-all group">
                <i className="fa-brands fa-facebook text-3xl text-blue-500 group-hover:text-white"></i>
                <div>
                  <p className="text-[10px] font-black opacity-50 uppercase">Official Business</p>
                  <p className="font-black text-sm">DT-Designs Page</p>
                </div>
              </div>
              <div onClick={() => openFacebookLink(t.aboutDevContent.contacts.fbDev)} className="p-6 rounded-3xl bg-blue-900/10 border border-blue-500/20 flex items-center gap-5 cursor-pointer hover:bg-blue-600 hover:text-white transition-all group">
                <i className="fa-brands fa-facebook-messenger text-3xl text-blue-500 group-hover:text-white"></i>
                <div>
                  <p className="text-[10px] font-black opacity-50 uppercase">Developer Direct</p>
                  <p className="font-black text-sm">Electro El Wafa</p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-green-900/10 border border-green-500/20 flex items-center gap-5 group">
                <i className="fa-solid fa-phone-volume text-3xl text-green-500"></i>
                <div>
                  <p className="text-[10px] font-black opacity-50 uppercase">Primary Phone</p>
                  <p className="font-black text-sm" dir="ltr">{t.aboutDevContent.contacts.phone1}</p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-green-900/10 border border-green-500/20 flex items-center gap-5 group">
                <i className="fa-solid fa-phone text-3xl text-green-500"></i>
                <div>
                  <p className="text-[10px] font-black opacity-50 uppercase">Secondary Phone</p>
                  <p className="font-black text-sm" dir="ltr">{t.aboutDevContent.contacts.phone2}</p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-yellow-900/10 border border-yellow-500/20 flex items-center gap-5 lg:col-span-2">
                <i className="fa-solid fa-envelope-open-text text-3xl text-yellow-500"></i>
                <div>
                  <p className="text-[10px] font-black opacity-50 uppercase">Engineering Email</p>
                  <p className="font-black text-sm">{t.aboutDevContent.contacts.email}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-12 text-center border-t-2 border-white/5 opacity-40 text-xs font-black tracking-[0.5em] uppercase">
            {t.aboutDevContent.footer}
          </div>
        </div>
      </InfoModal>

      <InfoModal isOpen={showMarketingTips} onClose={() => setShowMarketingTips(false)} title={t.marketingTips} theme={theme} isLarge={true}>
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 mb-6 font-black text-center text-sm italic shadow-inner">
             {t.followClick} <a href="#" onClick={() => openFacebookLink()} className="underline text-yellow-400 decoration-yellow-400/30 underline-offset-4">Facebook</a>
          </div>
          {currentMarketingGuide.map((tip, i) => (
            <div key={i} className={`flex gap-5 p-6 rounded-[2rem] border ${theme === 'dark' ? 'bg-slate-900/50 border-cyan-500/10' : 'bg-slate-50 border-slate-200'} transition-all hover:scale-[1.01] hover:border-cyan-400/30 group`}>
              <div className="shrink-0 w-10 h-10 rounded-xl gold-gradient flex items-center justify-center font-black text-slate-900 text-sm shadow-xl group-hover:rotate-12 transition-transform">{i + 1}</div>
              <p className="text-sm md:text-base leading-relaxed font-bold self-center">{tip}</p>
            </div>
          ))}
        </div>
      </InfoModal>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-10">
            <SmartMarketingTicker onClick={() => openFacebookLink()} theme={theme} lang={lang} dialect={dialect} />
            <div className="neon-revolving-wrapper shadow-2xl">
              <div className="neon-inner-surface glass-premium p-8 md:p-10 space-y-8">
                <div className="space-y-2">
                  <label className="block text-[11px] font-black gold-text-strong uppercase tracking-wider mb-2">{t.fieldLabel}</label>
                  <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="w-full rounded-2xl px-5 py-4 outline-none font-bold border-2 neon-input-premium appearance-none cursor-pointer">
                    {(domainTranslations[lang] || domainTranslations.en).ma.map((group: any, idx: number) => (
                      <optgroup key={idx} label={group.group}>
                        {group.items.map((item: string, i: number) => <option key={i} value={item}>{item}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] font-black gold-text-strong uppercase tracking-wider mb-2">{t.productLabel}</label>
                  <input type="text" value={productName} placeholder={t.productPlaceholder} onChange={(e) => setProductName(e.target.value)} className="w-full rounded-2xl px-5 py-4 outline-none font-bold border-2 neon-input-premium focus:border-cyan-400 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] font-black gold-text-strong uppercase tracking-wider mb-2">{t.detailsLabel}</label>
                  <textarea value={extraInfo} placeholder={t.detailsPlaceholder} onChange={(e) => setExtraInfo(e.target.value)} className="w-full h-36 rounded-2xl px-5 py-4 outline-none font-bold border-2 neon-input-premium resize-none focus:border-cyan-400 transition-all" />
                </div>
                <button onClick={handleGenerate} disabled={loading} className="w-full py-5 rounded-2xl font-black text-slate-900 gold-gradient shadow-2xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50">
                  {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : t.button}
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            {loading ? (
              <div className="animate-in fade-in zoom-in duration-500 bg-transparent">
                <HighEndLoader theme={theme} text={t.loadingText} />
              </div>
            ) : result ? (
              <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-700">
                <CaptionCard variation={{title: "Result", headline: "", body: "", cta: "", hashtags: ""}} originalVariations={result.variations} langTexts={{ copy: t.copy, copied: t.copied }} dir={t.dir} fontClass={prestigeFontClass} theme={theme} onReset={handleReset} />
              </div>
            ) : (
              <div className={`h-[60vh] border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center p-12 text-center transition-all ${theme === 'dark' ? 'border-cyan-500/20 opacity-30' : 'border-slate-300 opacity-50'}`}>
                <h3 className="text-2xl font-black mb-4">{t.emptyTitle}</h3>
                <p className="font-bold">{t.emptyState}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className={`w-full py-12 text-center text-[10px] uppercase font-black transition-all duration-700 ${theme === 'dark' ? 'text-white/40' : 'text-slate-800/40'} tracking-[0.3em]`}>
        By DT-DESIGNS AI | <span className="cursor-pointer hover:text-[#D4AF37] transition-colors" onClick={() => openFacebookLink()}>DicelionTechnique © 2001 - 2026</span>
      </footer>
    </div>
  );
};

export default App;
