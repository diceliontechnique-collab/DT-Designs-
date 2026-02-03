
import { LanguageCode, DialectCode } from '../types';

export interface TranslationSchema {
  dir: 'rtl' | 'ltr';
  header: string;
  fieldLabel: string;
  productLabel: string;
  detailsLabel: string;
  emojiLabel: string;
  button: string;
  resultTitle: string;
  loadingText: string;
  emptyTitle: string;
  emptyState: string;
  copy: string;
  copied: string;
  aboutApp: string;
  aboutDev: string;
  marketingTips: string;
  appearance: string;
  productPlaceholder: string;
  detailsPlaceholder: string;
  followClick: string;
  aboutAppContent: {
    title: string;
    intro: string;
    whyAdTitle: string;
    whyAdIntro: string;
    brands: Array<{ name: string; desc: string }>;
    featuresTitle: string;
    features: Array<{ title: string; desc: string }>;
    summaryTitle: string;
    summaryText: string;
  };
  aboutDevContent: {
    title: string;
    heritage: string;
    narrative: string;
    quote: string;
    mission: string;
    valuesTitle: string;
    values: Array<{ title: string; desc: string }>;
    expertiseTitle: string;
    expertise: Array<{ title: string; desc: string }>;
    montageTitle: string;
    montageText: string;
    footer: string;
    contacts: {
      fbDt: string;
      fbDev: string;
      phone1: string;
      phone2: string;
      email: string;
    };
  };
  exitSequence: {
    brand: string;
    prayer: string;
  };
}

const EN_BASE: TranslationSchema = {
  dir: 'ltr',
  header: "Smart Assistant for Sales Posts",
  fieldLabel: "👑 Industry",
  productLabel: "💎 Product",
  detailsLabel: "🎯 Details",
  emojiLabel: "⚡ Emojis",
  button: "✍️ Generate",
  resultTitle: "✨ Results",
  loadingText: "Engineering creativity with a touch of DT-Designs...",
  emptyTitle: "Waiting for Input",
  emptyState: "Enter product details to begin.",
  copy: "Copy",
  copied: "Copied",
  aboutApp: "About App",
  aboutDev: "Developer",
  marketingTips: "Marketing Tips",
  appearance: "Theme",
  productPlaceholder: "e.g. iPhone 16 Pro Max",
  detailsPlaceholder: "e.g. Pristine condition, 1 year warranty...",
  followClick: "Click Here",
  aboutAppContent: {
    title: "About DT-DESIGNS AI: Your Smart Growth Engine",
    intro: "In a world of information overload, having a good product isn't enough; the real challenge is being seen. DT-DESIGNS AI is the culmination of 25 years of engineering expertise, designed to be your smart assistant that transforms business ideas into professional posts in seconds.",
    whyAdTitle: "Why is Advertising the Lifeblood of Business?",
    whyAdIntro: "Advertising isn't just text; it's the pulse pumping customers into your project. Even global giants invest billions in marketing:",
    brands: [
      { name: "Coca-Cola", desc: "Spends billions annually to stay top-of-mind before you even feel thirsty." },
      { name: "Facebook/YouTube", desc: "Constantly promote themselves to attract more users and advertisers." },
      { name: "Apple", desc: "Doesn't just sell phones; it sells an identity that the world anticipates." }
    ],
    featuresTitle: "DT-DESIGNS AI Advantages",
    features: [
      { title: "Story Mastery", desc: "Design eye-catching ads for Instagram, TikTok, and Facebook that boost engagement by up to 80%." },
      { title: "Content Intelligence", desc: "Crafting copy based on 'Sales Psychology' that triggers immediate action." },
      { title: "Speed & Exclusivity", desc: "Get unique posts for your project with one touch, saving time and effort." },
      { title: "Cultural Localization", desc: "Choose your dialect so your ad resonates perfectly with your target audience." }
    ],
    summaryTitle: "Bottom Line:",
    summaryText: "If commerce is the body, advertising is the coronary artery. With DT-DESIGNS AI, you build a bridge of trust based on the latest AI and DicelionTechnique's solid expertise."
  },
  aboutDevContent: {
    title: "About the Developer | Dicelion: A Quarter Century of Digital Leadership",
    heritage: "By DT-DESIGNS AI | DicelionTechnique © 2001 2026",
    narrative: "نحن في DicelionTechnique نعمل بهدوء واجتهاد وتواضع طلابنا هم أساتذتي، ونسأل الله في كل خطوة أن يبارك في عملنا وأن يجعل ما نقدّمه نافعًا للناس. لا نرى أنفسنا أفضل من غيرنا، بل نسعى أن نكون سببًا في تسهيل حياة من يثق بنا، مؤمنين بأن التقنية أمانة، وأن كل سطر برمجي نكتبه مسؤولية نحاسب عليها قبل أن تكون إنجازًا نفاخر به. نجتهد في تطوير حلول رقمية حديثة، نقصد بها الصدق في العمل، والإتقان في التنفيذ، وتقديم ما ينفع الإنسان بروح الضمير المهني، سائلين الله أن يوفقنا لما فيه الخير، وأن يكون عملنا خالصًا لوجهه الكريم قبل كل شيء.",
    quote: "Technology is a trust, and every line of code is a responsibility.",
    mission: "To serve humanity through ethical digital solutions.",
    valuesTitle: "Technical & Ethical Principles",
    values: [
      { title: "Responsibility", desc: "We are accountable for every digital solution we deploy." },
      { title: "Honesty", desc: "Pure sincerity in every interaction and project." },
      { title: "Perfection", desc: "Mastery in execution is our minimum standard." }
    ],
    expertiseTitle: "Certified Expertise",
    expertise: [
      { title: "Google Certified Developer", desc: "Mastery in global cloud and software standards." },
      { title: "Master Trainer", desc: "Certified educator in professional technical institutes." },
      { title: "Mobile & Computer Expert", desc: "Expert in smartphones, hardware systems, and software solutions." },
      { title: "Prompt Engineering Specialist", desc: "Expert in AI-human interaction design." },
      { title: "Positive Psychology Systems", desc: "Developing digital systems based on the principles of positive psychology." },
      { title: "Modern Multi-platform Dev", desc: "Developing apps for PC and Mobile using the latest technologies." }
    ],
    montageTitle: "Visual Department",
    montageText: "Under the artistic direction of Kanza, we merge commerce with cinematic vision.",
    footer: "DicelionTechnique © 2001 - 2026 All Rights Reserved",
    contacts: {
      fbDt: "https://web.facebook.com/profile.php?id=61561721818324",
      fbDev: "https://web.facebook.com/profile.php?id=61561721818324",
      phone1: "+212717118180",
      phone2: "+212521177000",
      email: "diceliontechnique@gmail.com"
    }
  },
  exitSequence: {
    brand: "DT-DESIGNS AI",
    prayer: "May God grant you abundant and blessed success."
  }
};

const AR_BASE: TranslationSchema = {
  dir: 'rtl',
  header: "مساعدك الذكي في منشورات البيع والتجارة اليومية",
  fieldLabel: "👑 المجال",
  productLabel: "💎 السلعة",
  detailsLabel: "🎯 التفاصيل",
  emojiLabel: "⚡ إيموجي",
  button: "✍️ كتب ليا شي حاجة",
  resultTitle: "الكلام الموزون بلمسة DT-Designs",
  loadingText: "جاري هندسة الإبداع بلمسة DT-Designs...",
  emptyTitle: "في انتظار إبداعك",
  emptyState: "أدخل تفاصيل الهمزة وخلينا نبدع.",
  copy: "نسخ",
  copied: "تم النسخ",
  aboutApp: "عن التطبيق",
  aboutDev: "عن المطور",
  marketingTips: "إرشادات التسويق",
  appearance: "المظهر",
  productPlaceholder: "مثال: ايفون 15 برو ماكس",
  detailsPlaceholder: "مثال: الحالة ممتازة، الضمان 6 أشهر...",
  followClick: "بالضغط هنا",
  aboutAppContent: {
    title: "عن تطبيق DT-DESIGNS AI: محركك الذكي للنمو التجاري",
    intro: "في عصر تتدفق فيه المعلومات بسرعة البرق، لم يعد امتلاك منتج جيد كافياً؛ بل أصبح التحدي الحقيقي هو كيف تجعل العالم يراه. تطبيق DT-DESIGNS AI هو ثمرة خبرة برمجية وهندسية تمتد لربع قرن، صُمم خصيصاً ليكون مساعدك الذكي الذي يحول أفكارك التجارية إلى منشورات إعلانية احترافية في ثوانٍ معدودة.",
    whyAdTitle: "لماذا الإعلان هو شريان الحياة؟",
    whyAdIntro: "الإعلان ليس مجرد صورة أو نص، بل هو النبض الذي يضخ العملاء إلى مشروعك. حتى أضخم الإمبراطوريات العالمية، لا تزال تخصص ميزانيات فلكية للتسويق:",
    brands: [
      { name: "كوكا كولا (Coca-Cola)", desc: "تنفق المليارات سنوياً لتبقى حاضرة في ذهنك قبل أن تشعر بالعطش." },
      { name: "فيسبوك ويوتيوب", desc: "لا يتوقفان عن عرض إعلاناتهما الخاصة لجذب المزيد من المستخدمين والمعلنين." },
      { name: "آبل (Apple)", desc: "لا تبيع هواتف فحسب، بل تبيع 'هوية' تجعل العالم ينتظر منتجها الجديد بشغف." }
    ],
    featuresTitle: "مزايا DT-DESIGNS AI",
    features: [
      { title: "احترافية الستوريات (Stories)", desc: "صمم إعلانات خاطفة للأنظار لمنصات (Instagram, Facebook, TikTok) تزيد من معدل التفاعل بنسبة تصل إلى 80%." },
      { title: "ذكاء المحتوى", desc: "صياغة نصوص إعلانية مبنية على 'سيكولوجية البيع' تلمس حاجة العميل وتدفعه للشراء فوراً." },
      { title: "السرعة والحصرية", desc: "احصل على منشورات حصرية لمشروعك بلمسة واحدة، مما يوفر عليك الوقت والجهد." },
      { title: "التوطين الثقافي", desc: "إمكانية اختيار اللهجة ليكون إعلانك قريباً من قلب ولسان جمهورك المستهدف." }
    ],
    summaryTitle: "خلاصة القول:",
    summaryText: "إذا كانت التجارة جسداً، فإن الإعلان هو شريانها التاجي. ومع DT-DESIGNS AI، أنت تبني جسراً من الثقة مستنداً إلى أحدث تقنيات الذكاء الاصطناعي وخبرة DicelionTechnique الرصينة."
  },
  aboutDevContent: {
    title: "عن المطور | تقنية Dicelion: ربع قرن من الريادة الرقمية",
    heritage: "By DT-DESIGNS AI | DicelionTechnique © 2001 2026",
    narrative: "نحن في DicelionTechnique نعمل بهدوء واجتهاد وتواضع طلابنا هم أساتذتي، ونسأل الله في كل خطوة أن يبارك في عملنا وأن يجعل ما نقدّمه نافعًا للناس. لا نرى أنفسنا أفضل من غيرنا، بل نسعى أن نكون سببًا في تسهيل حياة من يثق بنا، مؤمنين بأن التقنية أمانة، وأن كل سطر برمجي نكتبه مسؤولية نحاسب عليها قبل أن تكون إنجازًا نفاخر به. نجتهد في تطوير حلول رقمية حديثة، نقصد بها الصدق في العمل، والإتقان في التنفيذ، وتقديم ما ينفع الإنسان بروح الضمير المهني، سائلين الله أن يوفقنا لما فيه الخير، وأن يكون عملنا خالصًا لوجهه الكريم قبل كل شيء.",
    quote: "التقنية أمانة، وكل سطر برمجي هو مسؤولية.",
    mission: "خدمة الإنسان عبر حلول رقمية أخلاقية وذكية.",
    valuesTitle: "مبادئنا وقيمنا التقنية",
    values: [
      { title: "الأمانة والمسؤولية", desc: "نؤمن بأن كل سطر برمجي هو أمانة نسأل عنها يوم القيامة." },
      { title: "التواضع والصدق", desc: "طلابنا هم أساتذتنا، والصدق هو أساس كل تعاون ناجح." },
      { title: "الإتقان في التنفيذ", desc: "نسعى للإتقان والصدق في التنفيذ بروح الضمير الحي." }
    ],
    expertiseTitle: "الخبرة والتخصص العلمي",
    expertise: [
      { title: "Google Certified Developer", desc: "مطور معتمد من جوجل العالمية في أحدث التقنيات السحابية." },
      { title: "أستاذ ومدرّب معتمد", desc: "لدى معاهد مهنية خاصة بخبرة ميدانية تتجاوز العقدين." },
      { title: "خبير برمجيات وتطبيقات", desc: "في الهواتف الذكية وأنظمة الحواسيب وبرامجها." },
      { title: "Prompt Engineering Specialist", desc: "خبير في هندسة أوامر الذكاء الاصطناعي." },
      { title: "مطور أنظمة رقمية", desc: "تقوم على مبادئ السيكولوجيا الإيجابية والذكاء الشامل." },
      { title: "مطور تطبيقات شامل", desc: "الحواسيب والهواتف الذكية باستخدام أحدث التقنيات." }
    ],
    montageTitle: "قسم المونتاج",
    montageText: "بإشراف فني متميز من المبدعة كنزى، نحول رؤيتكم التجارية إلى أفلام إعلانية تلامس القمة.",
    footer: "DicelionTechnique © 2001 - 2026 جميع الحقوق محفوظة",
    contacts: {
      fbDt: "https://web.facebook.com/profile.php?id=61561721818324",
      fbDev: "https://web.facebook.com/profile.php?id=61561721818324",
      phone1: "+212717118180",
      phone2: "+212521177000",
      email: "diceliontechnique@gmail.com"
    }
  },
  exitSequence: {
    brand: "DT-DESIGNS AI",
    prayer: "نَسْأَلُ اللهَ أَنْ يَرْزُقَكُمْ رِزْقًا وَاسِعًا حَلَالًا طَيِّبًا"
  }
};

const DIALECT_ADJUSTMENTS: Partial<Record<DialectCode, Partial<TranslationSchema>>> = {
  moroccan: {
    header: "مساعدك الذكي فمنشورات البيع والشرا ديال كل نهار",
    button: "✍️ كتب ليا شي همزة",
    loadingText: "جاري هندسة الإبداع بلمسة DT-Designs الحصرية...",
    emptyState: "دخل تفاصيل الهمزة وخلينا نبدعو ليك."
  }
};

export const i18nData: Record<LanguageCode, TranslationSchema> = {
  ar: AR_BASE,
  en: EN_BASE,
  fr: { ...EN_BASE, dir: 'ltr', header: "Assistant Intelligent pour vos Ventes", aboutApp: "À Propos", aboutDev: "Développeur", marketingTips: "Conseils Marketing", button: "✍️ Générer", copy: "Copier", copied: "Copié" },
  fa: { ...AR_BASE, dir: 'rtl', header: "دستیار هوشمند برای پست‌های فروش", aboutApp: "درباره برنامه", aboutDev: "درباره توسعه دهنده", marketingTips: "نکات بازاريابی", button: "✍️ تولید محتوا", copy: "کپی", copied: "کپی شد" },
  nl: { ...EN_BASE, dir: 'ltr', header: "Slimme Assistent voor Verkoopberichten", aboutApp: "Over de App", aboutDev: "Ontwikkelaar", marketingTips: "Marketingtips", button: "✍️ Genereren", copy: "Kopiëren", copied: "Gekopieerd" },
  es: { ...EN_BASE, dir: 'ltr', header: "Asistente Inteligente para Ventas", aboutApp: "Acerca de", aboutDev: "Desarrollador", marketingTips: "Consejos de Marketing", button: "✍️ Generar", copy: "Copiar", copied: "Copiado" },
  de: { ...EN_BASE, dir: 'ltr', header: "Intelligenter Assistent für Verkaufs-Posts", aboutApp: "Über die App", aboutDev: "Entwickler", marketingTips: "Marketing-Tipps", button: "✍️ Generieren", copy: "Kopieren", copied: "Kopiert" },
  tr: { ...EN_BASE, dir: 'ltr', header: "Satış Gönderileri İçin Akıllı Asistan", aboutApp: "Uygulama Hakkında", aboutDev: "Geliştirici", marketingTips: "Pazarlama İpuçları", button: "✍️ Oluştur", copy: "Kopyala", copied: "Kopyalandı" },
  ru: { ...EN_BASE, dir: 'ltr', header: "Умный помощник для рекламных постов", aboutApp: "О приложении", aboutDev: "Разработчик", marketingTips: "Советы по маркетингу", button: "✍️ Создать", copy: "Копировать", copied: "Скопировано" },
  it: { ...EN_BASE, dir: 'ltr', header: "Assistente Inteligente per i Post di Vendita", aboutApp: "Informazioni", aboutDev: "Sviluppatore", marketingTips: "Consigli di Marketing", button: "✍️ Genera", copy: "Copia", copied: "Copiato" },
  pt: { ...EN_BASE, dir: 'ltr', header: "Assistente Inteligente para Postagens de Vendas", button: "✍️ Gerar", copy: "Copiar", copied: "Copiado" },
  zh: { ...EN_BASE, dir: 'ltr', header: "销售帖子智能助手", button: "✍️ 生成", copy: "复制", copied: "已复制" },
  ku: { ...AR_BASE, dir: 'rtl', header: "یاریدەدەرێکی زیرەک بۆ پۆستەکانی فرۆشتن", button: "✍️ دروستکردن", copy: "کۆپیکردن", copied: "کۆپیکرا" },
  hi: { ...EN_BASE, dir: 'ltr', header: "बिक्री पोस्ट के लिए स्मार्ट सहायक", button: "✍️ जेनरेट करें", copy: "कॉपी करें", copied: "कॉपी हो गया" },
  ja: { ...EN_BASE, dir: 'ltr', header: "販売投稿用スマートアシスタント", button: "✍️ 生成する", copy: "コピー", copied: "コピーされました" },
  ko: { ...EN_BASE, dir: 'ltr', header: "판매 게시물용 스마트 어시스턴트", button: "✍️ 생성하기", copy: "복사", copied: "복사됨" }
};

export const getTranslation = (lang: LanguageCode, dialect?: DialectCode): TranslationSchema => {
  const base = i18nData[lang] || EN_BASE;
  if (lang === 'ar' && dialect && DIALECT_ADJUSTMENTS[dialect]) {
    return { ...base, ...DIALECT_ADJUSTMENTS[dialect] };
  }
  return base;
};

export const LANGUAGES_LIST = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'fa', name: 'فارسی' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ru', name: 'Русский' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'zh', name: '中文' },
  { code: 'ku', name: 'Kurdî' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' }
];
